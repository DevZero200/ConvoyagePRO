import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Radio } from '../components/ui/radio-group';
import { PlacesAutocomplete } from '../components/ui/places-autocomplete';
import { Calculator, Truck } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export function Quote() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [departure, setDeparture] = useState('');
  const [departureDetails, setDepartureDetails] = useState('');
  const [arrival, setArrival] = useState('');
  const [arrivalDetails, setArrivalDetails] = useState('');
  const [departureLatLng, setDepartureLatLng] = useState<google.maps.LatLngLiteral | null>(null);
  const [arrivalLatLng, setArrivalLatLng] = useState<google.maps.LatLngLiteral | null>(null);
  const [transportType, setTransportType] = useState<'road' | 'carrier'>('road');
  const [distance, setDistance] = useState<number | null>(null);
  const [price, setPrice] = useState<number | null>(null);

  const calculateDistance = async () => {
    if (!departureLatLng || !arrivalLatLng) return;

    const service = new google.maps.DistanceMatrixService();
    const result = await service.getDistanceMatrix({
      origins: [departureLatLng],
      destinations: [arrivalLatLng],
      travelMode: google.maps.TravelMode.DRIVING,
    });

    if (result.rows[0]?.elements[0]?.distance) {
      const distanceInKm = Math.ceil(result.rows[0].elements[0].distance.value / 1000);
      setDistance(distanceInKm);
      setPrice(transportType === 'road' ? distanceInKm : distanceInKm * 11);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await calculateDistance();
    } catch (err) {
      setError('Erreur lors du calcul de la distance');
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    if (!price || !distance) {
      setError('Veuillez d\'abord calculer le prix');
      return;
    }

    // Si l'utilisateur n'est pas connecté, on le redirige vers la page de connexion
    if (!user) {
      // Sauvegarder les données du devis dans le localStorage
      const quoteData = {
        departure,
        departureDetails,
        arrival,
        arrivalDetails,
        distance,
        price,
        transportType
      };
      localStorage.setItem('pendingQuote', JSON.stringify(quoteData));
      
      // Rediriger vers la page de connexion
      navigate('/login', { 
        state: { 
          from: '/quote',
          message: 'Veuillez vous connecter pour continuer votre commande.'
        }
      });
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const transportData = {
        departure: `${departure}\n${departureDetails}`,
        arrival: `${arrival}\n${arrivalDetails}`,
        distance,
        price,
        transportType
      };

      const response = await axios.post('http://localhost:3001/api/payment/create-checkout-session', {
        amount: Math.round(price * 100),
        transportData
      });

      if (response.data?.url) {
        window.location.replace(response.data.url);
      } else {
        throw new Error('URL de paiement non reçue du serveur');
      }
    } catch (err: any) {
      console.error('Erreur lors de la création de la session de paiement:', err);
      setError(err.response?.data?.message || 'Une erreur est survenue lors de la création de la session de paiement');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-r from-primary to-primary-orange">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Obtenir un devis
          </h1>
          <p className="text-xl text-white/80">
            Calculez instantanément le coût de votre transport
          </p>
        </div>
      </section>

      {/* Formulaire de devis */}
      <section className="flex-grow bg-accent py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex justify-center mb-8">
                <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center">
                  <Truck className="w-8 h-8 text-white" />
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
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

                {error && (
                  <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}

                <Button 
                  type="submit" 
                  className="w-full h-12 text-lg"
                  disabled={loading || !departure || !arrival}
                >
                  {loading ? (
                    'Calcul en cours...'
                  ) : (
                    <>
                      <Calculator className="mr-2 h-5 w-5" />
                      Calculer le prix
                    </>
                  )}
                </Button>

                {price !== null && distance !== null && (
                  <div className="mt-6 space-y-6">
                    <div className="p-6 bg-accent rounded-lg">
                      <div className="text-center">
                        <p className="text-sm text-gray-600 mb-2">Prix estimé :</p>
                        <p className="text-4xl font-bold text-primary">{price}€</p>
                        <p className="text-sm text-gray-500 mt-2">
                          Distance : {distance} km
                        </p>
                      </div>
                    </div>

                    <Button
                      type="button"
                      size="lg"
                      className="w-full"
                      onClick={handlePayment}
                      disabled={loading}
                    >
                      {loading ? 'Traitement...' : user ? 'Payer maintenant' : 'Se connecter pour payer'}
                    </Button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}