import { useState } from 'react';
import { Calculator, CreditCard } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Radio } from '../../components/ui/radio-group';
import { PlacesAutocomplete } from '../../components/ui/places-autocomplete';
import { useNavigate } from 'react-router-dom';

export function NewOrder() {
  const navigate = useNavigate();
  const [transportType, setTransportType] = useState<'road' | 'carrier'>('road');
  const [departure, setDeparture] = useState('');
  const [arrival, setArrival] = useState('');
  const [departureDetails, setDepartureDetails] = useState('');
  const [arrivalDetails, setArrivalDetails] = useState('');
  const [departureLatLng, setDepartureLatLng] = useState<google.maps.LatLngLiteral | null>(null);
  const [arrivalLatLng, setArrivalLatLng] = useState<google.maps.LatLngLiteral | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [price, setPrice] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const calculatePrice = async () => {
    if (!departureLatLng || !arrivalLatLng) {
      setError('Veuillez sélectionner une adresse de départ et d\'arrivée');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const service = new google.maps.DistanceMatrixService();
      const response = await new Promise<google.maps.DistanceMatrixResponse>((resolve, reject) => {
        service.getDistanceMatrix({
          origins: [departureLatLng],
          destinations: [arrivalLatLng],
          travelMode: google.maps.TravelMode.DRIVING,
          unitSystem: google.maps.UnitSystem.METRIC
        }, (response, status) => {
          if (status === 'OK') resolve(response);
          else reject(new Error('Erreur de calcul de distance'));
        });
      });

      if (response.rows[0]?.elements[0]?.distance) {
        const distanceInKm = Math.ceil(response.rows[0].elements[0].distance.value / 1000);
        setDistance(distanceInKm);
        const pricePerKm = transportType === 'road' ? 1 : 11;
        setPrice(Math.ceil(distanceInKm * pricePerKm));
      }
    } catch (error) {
      setError('Erreur lors du calcul du prix');
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = () => {
    if (!price) return;
    navigate('/payment', { state: { amount: price } });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-xl font-semibold text-secondary mb-6">
          Nouvelle commande de transport
        </h2>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        <div className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-secondary mb-1">
                Adresse de départ
              </label>
              <div className="space-y-2">
                <PlacesAutocomplete
                  onSelect={(address, latLng) => {
                    setDeparture(address);
                    setDepartureLatLng(latLng);
                  }}
                  placeholder="Saisissez l'adresse de départ"
                />
                <textarea
                  value={departureDetails}
                  onChange={(e) => setDepartureDetails(e.target.value)}
                  placeholder="Détails supplémentaires (étage, code d'accès, etc.)"
                  className="w-full px-3 py-2 border border-text/20 rounded-md"
                  rows={2}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary mb-1">
                Adresse d'arrivée
              </label>
              <div className="space-y-2">
                <PlacesAutocomplete
                  onSelect={(address, latLng) => {
                    setArrival(address);
                    setArrivalLatLng(latLng);
                  }}
                  placeholder="Saisissez l'adresse d'arrivée"
                />
                <textarea
                  value={arrivalDetails}
                  onChange={(e) => setArrivalDetails(e.target.value)}
                  placeholder="Détails supplémentaires (étage, code d'accès, etc.)"
                  className="w-full px-3 py-2 border border-text/20 rounded-md"
                  rows={2}
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary mb-3">
              Mode de transport
            </label>
            <div className="space-y-2">
              <Radio
                name="transport-type"
                value="road"
                checked={transportType === 'road'}
                onChange={() => {
                  setTransportType('road');
                  if (distance) {
                    setPrice(distance);
                  }
                }}
                label="Par voie (1€/km)"
              />
              <Radio
                name="transport-type"
                value="carrier"
                checked={transportType === 'carrier'}
                onChange={() => {
                  setTransportType('carrier');
                  if (distance) {
                    setPrice(distance * 11);
                  }
                }}
                label="Sur machine (11€/km)"
              />
            </div>
          </div>

          <Button 
            onClick={calculatePrice}
            className="w-full"
            disabled={loading || !departure || !arrival}
          >
            <Calculator className="mr-2 h-4 w-4" />
            {loading ? 'Calcul en cours...' : 'Calculer le prix'}
          </Button>

          {price !== null && distance !== null && (
            <div className="mt-6 space-y-6">
              <div className="p-4 bg-accent rounded-md">
                <p className="text-center text-secondary">
                  <span className="block text-sm mb-1">Prix estimé :</span>
                  <span className="text-2xl font-bold">{price}€</span>
                  <span className="block text-sm mt-1">Distance : {distance} km</span>
                </p>
              </div>

              <Button
                onClick={handlePayment}
                size="lg"
                className="w-full flex items-center justify-center"
                disabled={loading}
              >
                <CreditCard className="mr-2 h-5 w-5" />
                {loading ? 'Traitement...' : 'Payer avec Stripe'}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}