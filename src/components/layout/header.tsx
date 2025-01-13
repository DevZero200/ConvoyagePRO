import { useState, useEffect } from 'react';
import { Truck, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '../ui/button';
import { useAuth } from '../../context/AuthContext';

export function Header() {
  const { isAuthenticated, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-secondary shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-2 text-white">
            <div className={`w-12 h-12 ${isScrolled ? 'bg-primary' : 'bg-white/10'} rounded-xl flex items-center justify-center transition-colors duration-300`}>
              <Truck size={24} className={isScrolled ? 'text-white' : 'text-white'} />
            </div>
            <span className="text-xl font-bold">TransportPro</span>
          </Link>
          
          {/* Navigation desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/quote" className="text-white/90 hover:text-white transition-colors">
              Obtenir un devis
            </Link>
            <Link to="/tracking" className="text-white/90 hover:text-white transition-colors">
              Suivi
            </Link>
            {isAuthenticated && (
              <Link to="/dashboard" className="text-white/90 hover:text-white transition-colors">
                Dashboard
              </Link>
            )}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <Button 
                variant="outline" 
                onClick={logout}
                className="border-white text-white hover:bg-white/10"
              >
                Déconnexion
              </Button>
            ) : (
              <>
                <Link to="/login">
                  <Button 
                    variant="outline"
                    className="border-white text-white hover:bg-white/10"
                  >
                    Connexion
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-white text-primary hover:bg-white/90">
                    Inscription
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Bouton menu mobile */}
          <button
            className="md:hidden p-2 rounded-lg text-white hover:bg-white/10"
            onClick={toggleMenu}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      <div className={`md:hidden fixed inset-0 bg-secondary transform transition-transform duration-300 z-40 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full p-4">
          <div className="flex justify-end">
            <button
              className="p-2 rounded-lg text-white hover:bg-white/10"
              onClick={toggleMenu}
            >
              <X size={24} />
            </button>
          </div>
          <nav className="flex flex-col space-y-4 mt-8">
            <Link 
              to="/quote" 
              className="text-white text-lg py-2 px-4 rounded-lg hover:bg-white/10"
              onClick={() => setIsOpen(false)}
            >
              Obtenir un devis
            </Link>
            <Link 
              to="/tracking" 
              className="text-white text-lg py-2 px-4 rounded-lg hover:bg-white/10"
              onClick={() => setIsOpen(false)}
            >
              Suivi
            </Link>
            {isAuthenticated && (
              <Link 
                to="/dashboard" 
                className="text-white text-lg py-2 px-4 rounded-lg hover:bg-white/10"
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>
            )}
            {isAuthenticated ? (
              <Button 
                variant="outline" 
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="w-full border-white text-white hover:bg-white/10"
              >
                Déconnexion
              </Button>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="w-full"
                  onClick={() => setIsOpen(false)}
                >
                  <Button 
                    variant="outline"
                    className="w-full border-white text-white hover:bg-white/10"
                  >
                    Connexion
                  </Button>
                </Link>
                <Link 
                  to="/register" 
                  className="w-full"
                  onClick={() => setIsOpen(false)}
                >
                  <Button className="w-full bg-white text-primary hover:bg-white/90">
                    Inscription
                  </Button>
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}