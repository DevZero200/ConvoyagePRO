import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Mail, Lock, User, Phone, Building2, FileText, Truck } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Radio } from '../components/ui/radio-group';
import { useAuth } from '../context/AuthContext';

export function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    country: 'FR',
    accountType: 'particulier' as 'particulier' | 'professionnel',
    companyName: '',
    siret: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { register, isAuthenticated } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'radio') {
      setFormData(prev => ({
        ...prev,
        accountType: value as 'particulier' | 'professionnel'
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (!formData.name || !formData.email || !formData.password || !formData.phone) {
        throw new Error('Veuillez remplir tous les champs obligatoires');
      }

      if (formData.accountType === 'professionnel' && (!formData.companyName || !formData.siret)) {
        throw new Error('Le nom de l\'entreprise et le SIRET sont requis pour un compte professionnel');
      }

      await register(formData);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-r from-primary to-primary-orange">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Créer votre compte
          </h1>
          <p className="text-xl text-white/80">
            Rejoignez-nous pour profiter de nos services de transport
          </p>
        </div>
      </section>

      {/* Formulaire */}
      <section className="flex-grow bg-accent py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex justify-center mb-8">
                <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center">
                  <Truck className="w-8 h-8 text-white" />
                </div>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-50 rounded-lg border border-red-200">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-secondary mb-3">
                    Type de compte
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Radio
                      name="accountType"
                      value="particulier"
                      checked={formData.accountType === 'particulier'}
                      onChange={handleChange}
                      label="Particulier"
                    />
                    <Radio
                      name="accountType"
                      value="professionnel"
                      checked={formData.accountType === 'professionnel'}
                      onChange={handleChange}
                      label="Professionnel"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-secondary mb-1">
                      Nom complet
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-2.5 h-5 w-5 text-text" />
                      <Input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="pl-10 h-12"
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary mb-1">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 h-5 w-5 text-text" />
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="votre@email.com"
                        className="pl-10 h-12"
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary mb-1">
                      Téléphone
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-2.5 h-5 w-5 text-text" />
                      <Input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+33 1 23 45 67 89"
                        className="pl-10 h-12"
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary mb-1">
                      Mot de passe
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-2.5 h-5 w-5 text-text" />
                      <Input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="••••••••"
                        className="pl-10 h-12"
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>

                  {formData.accountType === 'professionnel' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-secondary mb-1">
                          Nom de l'entreprise
                        </label>
                        <div className="relative">
                          <Building2 className="absolute left-3 top-2.5 h-5 w-5 text-text" />
                          <Input
                            type="text"
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleChange}
                            placeholder="Transport Pro SARL"
                            className="pl-10 h-12"
                            required
                            disabled={loading}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-secondary mb-1">
                          Numéro SIRET
                        </label>
                        <div className="relative">
                          <FileText className="absolute left-3 top-2.5 h-5 w-5 text-text" />
                          <Input
                            type="text"
                            name="siret"
                            value={formData.siret}
                            onChange={handleChange}
                            placeholder="12345678901234"
                            className="pl-10 h-12"
                            required
                            disabled={loading}
                          />
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <Button type="submit" className="w-full h-12 text-lg" disabled={loading}>
                  {loading ? 'Inscription en cours...' : 'S\'inscrire'}
                </Button>

                <p className="text-center text-sm text-secondary">
                  Déjà inscrit ?{' '}
                  <Link to="/login" className="text-primary hover:text-primary/80 font-medium">
                    Se connecter
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}