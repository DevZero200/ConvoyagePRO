import { Truck, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-secondary">
      <div className="container mx-auto px-4">
        {/* Section principale */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 py-16">
          {/* Logo et description */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                <Truck size={24} className="text-white" />
              </div>
              <span className="text-xl font-bold text-white">TransportPro</span>
            </div>
            <p className="text-white/70 leading-relaxed">
              Votre partenaire de confiance pour le transport de véhicules partout en France.
              Service professionnel, sécurisé et fiable.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors">
                <Facebook size={20} className="text-white" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors">
                <Twitter size={20} className="text-white" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors">
                <Instagram size={20} className="text-white" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors">
                <Linkedin size={20} className="text-white" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Services</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/quote" className="text-white/70 hover:text-white transition-colors">
                  Obtenir un devis
                </Link>
              </li>
              <li>
                <Link to="/tracking" className="text-white/70 hover:text-white transition-colors">
                  Suivi de transport
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-white/70 hover:text-white transition-colors">
                  Espace client
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3 text-white/70">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                  <Phone size={20} className="text-white" />
                </div>
                <span>01 23 45 67 89</span>
              </li>
              <li className="flex items-center space-x-3 text-white/70">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                  <Mail size={20} className="text-white" />
                </div>
                <span>contact@transportpro.fr</span>
              </li>
              <li className="flex items-center space-x-3 text-white/70">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                  <MapPin size={20} className="text-white" />
                </div>
                <span>123 Rue du Transport, Paris</span>
              </li>
            </ul>
          </div>

          {/* Horaires */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Horaires</h3>
            <ul className="space-y-4 text-white/70">
              <li className="flex justify-between">
                <span>Lundi - Vendredi</span>
                <span>8h - 19h</span>
              </li>
              <li className="flex justify-between">
                <span>Samedi</span>
                <span>9h - 17h</span>
              </li>
              <li className="flex justify-between">
                <span>Dimanche</span>
                <span>Fermé</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Barre de séparation */}
        <div className="border-t border-white/10"></div>

        {/* Copyright */}
        <div className="py-8 text-center text-white/50">
          <p>&copy; {new Date().getFullYear()} TransportPro. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}