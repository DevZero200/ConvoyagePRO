import { useState } from 'react';
import { Search, Package, MapPin, Calendar, Clock, Truck } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

export function Tracking() {
  const [trackingCode, setTrackingCode] = useState('');
  const [trackingStatus, setTrackingStatus] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleTracking = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    try {
      // Simuler un appel API avec les données de test
      setTimeout(() => {
        setError('Transport non trouvé. Veuillez vérifier le code de suivi.');
        setLoading(false);
      }, 500);
    } catch (error) {
      setError('Une erreur est survenue lors de la recherche.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <section className="relative py-24 bg-gradient-to-r from-primary to-primary-orange">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Suivi de transport
          </h1>
          <p className="text-xl text-white/80">
            Suivez en temps réel l'état de votre transport
          </p>
        </div>
      </section>

      <section className="flex-grow bg-accent py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex justify-center mb-8">
                <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center">
                  <Truck className="w-8 h-8 text-white" />
                </div>
              </div>

              <form onSubmit={handleTracking} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-secondary mb-1">
                    Code de suivi
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-2.5 h-5 w-5 text-text" />
                    <Input
                      value={trackingCode}
                      onChange={(e) => setTrackingCode(e.target.value)}
                      placeholder="Entrez votre code de suivi"
                      className="pl-10 h-12"
                      required
                      disabled={loading}
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
                  disabled={loading}
                >
                  {loading ? (
                    'Recherche...'
                  ) : (
                    <>
                      <Search className="mr-2 h-5 w-5" />
                      Suivre mon transport
                    </>
                  )}
                </Button>
              </form>

              {trackingStatus && (
                <div className="mt-8 p-6 bg-accent rounded-lg">
                  <div className="flex items-center justify-center mb-6">
                    <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center">
                      <Package className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-4 rounded-lg">
                      <div className="flex items-center space-x-3 text-secondary mb-2">
                        <MapPin className="h-5 w-5 text-primary" />
                        <span className="font-medium">Départ</span>
                      </div>
                      <p className="text-gray-600">{trackingStatus.departure}</p>
                    </div>

                    <div className="bg-white p-4 rounded-lg">
                      <div className="flex items-center space-x-3 text-secondary mb-2">
                        <MapPin className="h-5 w-5 text-primary" />
                        <span className="font-medium">Destination</span>
                      </div>
                      <p className="text-gray-600">{trackingStatus.arrival}</p>
                    </div>

                    <div className="bg-white p-4 rounded-lg">
                      <div className="flex items-center space-x-3 text-secondary mb-2">
                        <Package className="h-5 w-5 text-primary" />
                        <span className="font-medium">Statut</span>
                      </div>
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        trackingStatus.status === 'en-cours'
                          ? 'bg-yellow-100 text-yellow-800'
                          : trackingStatus.status === 'livré'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {trackingStatus.status === 'en-cours' ? 'En cours' 
                         : trackingStatus.status === 'livré' ? 'Livré' 
                         : 'Annulé'}
                      </span>
                    </div>

                    <div className="bg-white p-4 rounded-lg">
                      <div className="flex items-center space-x-3 text-secondary mb-2">
                        <MapPin className="h-5 w-5 text-primary" />
                        <span className="font-medium">Position actuelle</span>
                      </div>
                      <p className="text-gray-600">{trackingStatus.location}</p>
                    </div>

                    <div className="bg-white p-4 rounded-lg">
                      <div className="flex items-center space-x-3 text-secondary mb-2">
                        <Calendar className="h-5 w-5 text-primary" />
                        <span className="font-medium">Date prévue</span>
                      </div>
                      <p className="text-gray-600">
                        {new Date(trackingStatus.date).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg">
                      <div className="flex items-center space-x-3 text-secondary mb-2">
                        <Clock className="h-5 w-5 text-primary" />
                        <span className="font-medium">Dernière mise à jour</span>
                      </div>
                      <p className="text-gray-600">
                        {new Date(trackingStatus.lastUpdate).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}