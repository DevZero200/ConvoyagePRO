import { Home, Package, FileText, Search, PlusCircle } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface DashboardSidebarProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
}

export function DashboardSidebar({ isMobileMenuOpen, setIsMobileMenuOpen }: DashboardSidebarProps) {
  const { user } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/dashboard' && location.pathname === '/dashboard') {
      return true;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Overlay mobile */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden ${
          isMobileMenuOpen ? 'block' : 'hidden'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
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
    </>
  );
}