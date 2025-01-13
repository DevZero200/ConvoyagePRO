import { useState, useEffect } from 'react';
import { TrendingUp, Truck, Package, Euro, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { TEST_TRANSPORTS } from '../../lib/test-data';

interface Stats {
  transportsEnCours: number;
  totalTransports: number;
  revenuTotal: number;
}

export function DashboardHome() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recentTransports, setRecentTransports] = useState(TEST_TRANSPORTS.slice(0, 5));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Calculer les statistiques à partir des données de test
    const transportsEnCours = TEST_TRANSPORTS.filter(t => t.status === 'en-cours').length;
    const revenuTotal = TEST_TRANSPORTS.reduce((sum, t) => sum + t.price, 0);
    
    setStats({
      transportsEnCours,
      totalTransports: TEST_TRANSPORTS.length,
      revenuTotal
    });
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-full">Chargement...</div>;
  }

  return (
    <div className="space-y-8">
      {/* Statistiques */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Transports en cours</p>
                <p className="text-2xl font-bold text-primary mt-1">{stats.transportsEnCours}</p>
              </div>
              <div className="p-3 bg-primary/10 rounded-full">
                <Truck className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="mt-4">
              <TrendingUp className="h-4 w-4 text-green-500 inline-block mr-1" />
              <span className="text-sm text-gray-500">
                {stats.transportsEnCours} en livraison
              </span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total des transports</p>
                <p className="text-2xl font-bold text-primary mt-1">{stats.totalTransports}</p>
              </div>
              <div className="p-3 bg-primary/10 rounded-full">
                <Package className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="mt-4">
              <TrendingUp className="h-4 w-4 text-green-500 inline-block mr-1" />
              <span className="text-sm text-gray-500">
                Depuis le début
              </span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Revenu total</p>
                <p className="text-2xl font-bold text-primary mt-1">{stats.revenuTotal}€</p>
              </div>
              <div className="p-3 bg-primary/10 rounded-full">
                <Euro className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="mt-4">
              <TrendingUp className="h-4 w-4 text-green-500 inline-block mr-1" />
              <span className="text-sm text-gray-500">
                Chiffre d'affaires global
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Tableau des commandes récentes */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Commandes récentes</h2>
            <p className="mt-1 text-sm text-gray-500">
              Aperçu de vos dernières commandes de transport
            </p>
          </div>
          <Link to="/dashboard/transports">
            <Button variant="outline" size="sm" className="flex items-center space-x-2">
              <span>Voir tout</span>
              <ArrowRight size={16} />
            </Button>
          </Link>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Départ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Arrivée
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Prix
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentTransports.map((transport) => (
                <tr key={transport.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    #{transport.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                    {transport.type === 'road' ? 'Route' : 'Transporteur'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {transport.departure}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {transport.arrival}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {transport.price}€
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      transport.status === 'en-cours'
                        ? 'bg-yellow-100 text-yellow-800'
                        : transport.status === 'livré'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {transport.status === 'en-cours' ? 'En cours' : 'Livré'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(transport.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}