import { useState } from 'react';
import { Search, Package, MapPin, Calendar, Clock } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';

interface TrackingResult {
  id: number;
  status: 'en-cours' | 'livré';
  departure: string;
  arrival: string;
  currentLocation: string;
  lastUpdate: string;
  estimatedDelivery: string;
}

const MOCK_TRACKING: TrackingResult = {
  id: 123,
  status: 'en-cours',
  departure: 'Paris',
  arrival: 'Lyon',
  currentLocation: 'Dijon',
  lastUpdate: '2024-03-15T10:30:00',
  estimatedDelivery: '2024-03-15T18:00:00'
};

export function DashboardTracking() {
  const [trackingCode, setTrackingCode] = useState('');
  const [result, setResult] = useState<TrackingResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Simuler une recherche
    setTimeout(() => {
      if (trackingCode === '123') {
        setResult(MOCK_TRACKING);
      } else {
        setError('Aucun transport trouvé avec ce code');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Suivi de transport
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Code de suivi
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                type="text"
                value={trackingCode}
                onChange={(e) => setTrackingCode(e.target.value)}
                className="pl-10"
                placeholder="Entrez le code de suivi"
                disabled={loading}
              />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Recherche...' : 'Suivre le transport'}
          </Button>

          {error && (
            <div className="p-4 bg-red-50 rounded-md">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}
        </form>

        {result && (
          <div className="mt-8 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Transport #{result.id}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Statut: {result.status === 'en-cours' ? 'En cours' : 'Livré'}
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                result.status === 'en-cours'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-green-100 text-green-800'
              }`}>
                {result.status === 'en-cours' ? 'En cours' : 'Livré'}
              </span>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <dt className="text-sm font-medium text-gray-500 flex items-center">
                    <MapPin className="h-5 w-5 mr-2 text-gray-400" />
                    Départ
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">{result.departure}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500 flex items-center">
                    <MapPin className="h-5 w-5 mr-2 text-gray-400" />
                    Arrivée
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">{result.arrival}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500 flex items-center">
                    <Package className="h-5 w-5 mr-2 text-gray-400" />
                    Position actuelle
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">{result.currentLocation}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500 flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-gray-400" />
                    Dernière mise à jour
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {new Date(result.lastUpdate).toLocaleString()}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500 flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-gray-400" />
                    Livraison estimée
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {new Date(result.estimatedDelivery).toLocaleString()}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}