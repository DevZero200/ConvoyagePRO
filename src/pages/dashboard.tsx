import { Package, Calendar, Clock, Home, FileText, LogOut, Menu, Search, PlusCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Link, Routes, Route, useLocation } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { useState } from 'react';
import { NewOrder } from './dashboard/NewOrder';
import { DashboardHome } from './dashboard/DashboardHome';
import { TransportsList } from './dashboard/TransportsList';
import { QuotesList } from './dashboard/QuotesList';
import { DashboardTracking } from './dashboard/DashboardTracking';

export function Dashboard() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/dashboard' && location.pathname === '/dashboard') {
      return true;
    }
    return location.pathname.startsWith(path);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="flex h-screen bg-accent">
      {/* Sidebar - version mobile */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden ${
          isMobileMenuOpen ? 'block' : 'hidden'
        }`}
        onClick={toggleMobileMenu}
      />

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-primary transform transition-transform duration-200 ease-in-out lg:relative lg:translate-x-0 z-30 ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6">
          <div className="text-center mb-6">
            <div className="h-16 w-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-2">
              <span className="text-2xl font-bold text-white">
                {user?.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <h2 className="text-lg font-semibold text-white">{user?.name}</h2>
            <p className="text-sm text-white/70">{user?.email}</p>
          </div>

          <nav className="space-y-1">
            <Link 
              to="/dashboard"
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive('/dashboard') && location.pathname === '/dashboard'
                  ? 'bg-white text-primary'
                  : 'text-white hover:bg-white/10'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Home size={20} />
              <span>Tableau de bord</span>
            </Link>
            <Link 
              to="/dashboard/new-order"
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive('/dashboard/new-order')
                  ? 'bg-white text-primary'
                  : 'text-white hover:bg-white/10'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <PlusCircle size={20} />
              <span>Nouvelle commande</span>
            </Link>
            <Link 
              to="/dashboard/transports"
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive('/dashboard/transports')
                  ? 'bg-white text-primary'
                  : 'text-white hover:bg-white/10'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Package size={20} />
              <span>Mes transports</span>
            </Link>
            <Link 
              to="/dashboard/quotes"
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive('/dashboard/quotes')
                  ? 'bg-white text-primary'
                  : 'text-white hover:bg-white/10'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <FileText size={20} />
              <span>Mes devis</span>
            </Link>
            <Link 
              to="/dashboard/tracking"
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive('/dashboard/tracking')
                  ? 'bg-white text-primary'
                  : 'text-white hover:bg-white/10'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Search size={20} />
              <span>Suivi</span>
            </Link>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                className="lg:hidden text-secondary p-2 rounded-md hover:bg-gray-100"
                onClick={toggleMobileMenu}
              >
                <Menu size={24} />
              </button>
              <h1 className="text-xl font-semibold text-secondary">
                {location.pathname === '/dashboard' && 'Tableau de bord'}
                {location.pathname === '/dashboard/new-order' && 'Nouvelle commande'}
                {location.pathname === '/dashboard/transports' && 'Mes transports'}
                {location.pathname === '/dashboard/quotes' && 'Mes devis'}
                {location.pathname === '/dashboard/tracking' && 'Suivi de transport'}
              </h1>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={logout}
              className="flex items-center space-x-2 text-red-500 border-red-500 hover:bg-red-50"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Déconnexion</span>
            </Button>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Routes>
            <Route index element={<DashboardHome />} />
            <Route path="new-order" element={<NewOrder />} />
            <Route path="transports" element={<TransportsList />} />
            <Route path="quotes" element={<QuotesList />} />
            <Route path="tracking" element={<DashboardTracking />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}