import { Menu, LogOut } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { useAuth } from '../../context/AuthContext';

interface DashboardHeaderProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
}

export function DashboardHeader({ isMobileMenuOpen, setIsMobileMenuOpen }: DashboardHeaderProps) {
  const location = useLocation();
  const { logout } = useAuth();

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/dashboard':
        return 'Tableau de bord';
      case '/dashboard/new-order':
        return 'Nouvelle commande';
      case '/dashboard/transports':
        return 'Mes transports';
      case '/dashboard/quotes':
        return 'Mes devis';
      case '/dashboard/tracking':
        return 'Suivi de transport';
      default:
        return 'Tableau de bord';
    }
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            className="lg:hidden text-secondary p-2 rounded-md hover:bg-gray-100"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu size={24} />
          </button>
          <h1 className="text-xl font-semibold text-secondary">
            {getPageTitle()}
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
  );
}