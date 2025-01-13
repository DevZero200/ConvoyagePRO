import { ArrowRight, Truck, Package, MapPin, Star, Users, Shield, Clock, ChevronRight, Award, Heart, Target, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/button';

export function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section avec overlay sombre */}
      <section className="relative min-h-screen flex items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80")'
          }}
        >
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8">
              Transport de véhicules professionnel
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-12">
              Service de convoyage fiable et sécurisé pour particuliers et professionnels
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                href="/quote" 
                className="bg-primary-orange hover:bg-primary-orange/90 text-white h-14 px-8 text-lg"
              >
                <span>Obtenir un devis</span>
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                href="/tracking" 
                variant="outline" 
                className="border-white text-white hover:bg-white/10 h-14 px-8 text-lg"
              >
                <span>Suivre un transport</span>
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* À propos */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-secondary mb-6">
                Leader du transport de véhicules en France
              </h2>
              <p className="text-text text-lg mb-8 leading-relaxed">
                Depuis plus de 20 ans, nous assurons le transport de véhicules pour les particuliers 
                et les professionnels dans toute la France. Notre expertise et notre engagement 
                nous permettent de garantir un service de qualité et une satisfaction client optimale.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-primary-orange flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-secondary">Service 24/7</h3>
                    <p className="text-text">Support client disponible à tout moment</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-primary-orange flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-secondary">Prix compétitifs</h3>
                    <p className="text-text">Tarifs adaptés à tous les budgets</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1616432043562-3671ea2e5242?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80" 
                alt="Transport de véhicule" 
                className="rounded-2xl shadow-xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-primary-orange rounded-xl flex items-center justify-center">
                    <Star className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-secondary">98%</div>
                    <div className="text-text">Clients satisfaits</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistiques */}
      <section className="py-20 bg-accent">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-2xl text-center shadow-lg">
              <div className="w-16 h-16 bg-primary-orange/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-primary-orange" />
              </div>
              <div className="text-4xl font-bold text-secondary mb-2">20+</div>
              <div className="text-text">Années d'expérience</div>
            </div>
            
            <div className="bg-white p-8 rounded-2xl text-center shadow-lg">
              <div className="w-16 h-16 bg-primary-orange/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary-orange" />
              </div>
              <div className="text-4xl font-bold text-secondary mb-2">15K+</div>
              <div className="text-text">Clients satisfaits</div>
            </div>
            
            <div className="bg-white p-8 rounded-2xl text-center shadow-lg">
              <div className="w-16 h-16 bg-primary-orange/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-primary-orange" />
              </div>
              <div className="text-4xl font-bold text-secondary mb-2">50K+</div>
              <div className="text-text">Véhicules transportés</div>
            </div>
            
            <div className="bg-white p-8 rounded-2xl text-center shadow-lg">
              <div className="w-16 h-16 bg-primary-orange/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-primary-orange" />
              </div>
              <div className="text-4xl font-bold text-secondary mb-2">150+</div>
              <div className="text-text">Villes desservies</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-secondary mb-4">
              Nos services de transport
            </h2>
            <p className="text-text text-lg max-w-2xl mx-auto">
              Des solutions adaptées à tous vos besoins de transport de véhicules
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-accent p-8 rounded-2xl">
              <div className="w-16 h-16 bg-primary-orange rounded-xl flex items-center justify-center mb-6">
                <Truck className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-secondary mb-4">
                Transport sur route
              </h3>
              <p className="text-text mb-6">
                Transport de véhicules par la route avec chauffeur professionnel.
                Service porte-à-porte disponible.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center text-text">
                  <CheckCircle className="w-5 h-5 text-primary-orange mr-2" />
                  <span>Livraison rapide</span>
                </li>
                <li className="flex items-center text-text">
                  <CheckCircle className="w-5 h-5 text-primary-orange mr-2" />
                  <span>Suivi en temps réel</span>
                </li>
                <li className="flex items-center text-text">
                  <CheckCircle className="w-5 h-5 text-primary-orange mr-2" />
                  <span>Assurance incluse</span>
                </li>
              </ul>
            </div>

            <div className="bg-accent p-8 rounded-2xl">
              <div className="w-16 h-16 bg-primary-orange rounded-xl flex items-center justify-center mb-6">
                <Package className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-secondary mb-4">
                Transport sur machine
              </h3>
              <p className="text-text mb-6">
                Transport sécurisé sur camion porte-voiture pour plusieurs véhicules.
                Idéal pour les professionnels.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center text-text">
                  <CheckCircle className="w-5 h-5 text-primary-orange mr-2" />
                  <span>Transport multiple</span>
                </li>
                <li className="flex items-center text-text">
                  <CheckCircle className="w-5 h-5 text-primary-orange mr-2" />
                  <span>Économique</span>
                </li>
                <li className="flex items-center text-text">
                  <CheckCircle className="w-5 h-5 text-primary-orange mr-2" />
                  <span>Protection optimale</span>
                </li>
              </ul>
            </div>

            <div className="bg-accent p-8 rounded-2xl">
              <div className="w-16 h-16 bg-primary-orange rounded-xl flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-secondary mb-4">
                Services premium
              </h3>
              <p className="text-text mb-6">
                Services personnalisés pour les véhicules de luxe et de collection.
                Traitement VIP garanti.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center text-text">
                  <CheckCircle className="w-5 h-5 text-primary-orange mr-2" />
                  <span>Transport dédié</span>
                </li>
                <li className="flex items-center text-text">
                  <CheckCircle className="w-5 h-5 text-primary-orange mr-2" />
                  <span>Chauffeur expert</span>
                </li>
                <li className="flex items-center text-text">
                  <CheckCircle className="w-5 h-5 text-primary-orange mr-2" />
                  <span>Service conciergerie</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Notre efficacité */}
      <section className="py-20 bg-accent">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-secondary mb-4">
              Notre efficacité
            </h2>
            <p className="text-text text-lg max-w-2xl mx-auto">
              Un processus simple et efficace pour assurer la meilleure expérience possible
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="relative">
                <div className="w-20 h-20 bg-primary-orange rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <div className="absolute top-1/2 left-full w-full h-0.5 bg-primary-orange hidden md:block"></div>
              </div>
              <h3 className="text-xl font-bold text-secondary mb-2">Demande</h3>
              <p className="text-text">Demandez votre devis en ligne en quelques clics</p>
            </div>

            <div className="text-center">
              <div className="relative">
                <div className="w-20 h-20 bg-primary-orange rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-10 h-10 text-white" />
                </div>
                <div className="absolute top-1/2 left-full w-full h-0.5 bg-primary-orange hidden md:block"></div>
              </div>
              <h3 className="text-xl font-bold text-secondary mb-2">Validation</h3>
              <p className="text-text">Nous validons votre demande sous 2h</p>
            </div>

            <div className="text-center">
              <div className="relative">
                <div className="w-20 h-20 bg-primary-orange rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Truck className="w-10 h-10 text-white" />
                </div>
                <div className="absolute top-1/2 left-full w-full h-0.5 bg-primary-orange hidden md:block"></div>
              </div>
              <h3 className="text-xl font-bold text-secondary mb-2">Transport</h3>
              <p className="text-text">Transport sécurisé de votre véhicule</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-primary-orange rounded-2xl flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-secondary mb-2">Livraison</h3>
              <p className="text-text">Livraison dans les délais convenus</p>
            </div>
          </div>
        </div>
      </section>

      {/* Nos valeurs */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-secondary mb-4">
              Nos valeurs
            </h2>
            <p className="text-text text-lg max-w-2xl mx-auto">
              Des valeurs fortes qui guident chacune de nos actions
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-20 h-20 bg-primary-orange rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Award className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-secondary mb-4">Excellence</h3>
              <p className="text-text">
                Nous nous engageons à fournir un service de la plus haute qualité, 
                en respectant les normes les plus strictes du secteur.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-primary-orange rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Heart className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-secondary mb-4">Confiance</h3>
              <p className="text-text">
                La confiance de nos clients est notre priorité. Nous traitons chaque 
                véhicule comme s'il était le nôtre.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-primary-orange rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Target className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-secondary mb-4">Engagement</h3>
              <p className="text-text">
                Nous nous engageons à respecter nos délais et à assurer une 
                communication transparente tout au long du transport.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Témoignages défilants */}
      <section className="py-20 bg-accent overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-secondary mb-4">
              Ce que disent nos clients
            </h2>
            <p className="text-text text-lg max-w-2xl mx-auto">
              Découvrez les retours d'expérience de nos clients satisfaits
            </p>
          </div>
        </div>

        <div className="relative">
          <div className="flex animate-slide">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex flex-nowrap">
                <div className="w-[400px] flex-shrink-0 mx-4">
                  <div className="bg-white p-6 rounded-xl shadow-lg">
                    <div className="flex text-primary-orange mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-current" />
                      ))}
                    </div>
                    <p className="text-secondary mb-4">
                      "Service impeccable et professionnel. Mon véhicule a été livré dans les temps et en parfait état."
                    </p>
                    <div className="flex items-center">
                      <img
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=100&h=100&q=80"
                        alt="Client"
                        className="w-12 h-12 rounded-full mr-4"
                      />
                      <div>
                        <div className="font-semibold text-secondary">Jean Dupont</div>
                        <div className="text-text text-sm">Paris</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-[400px] flex-shrink-0 mx-4">
                  <div className="bg-white p-6 rounded-xl shadow-lg">
                    <div className="flex text-primary-orange mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-current" />
                      ))}
                    </div>
                    <p className="text-secondary mb-4">
                      "Très satisfait du service. Le suivi en temps réel est vraiment pratique et rassurant."
                    </p>
                    <div className="flex items-center">
                      <img
                        src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=100&h=100&q=80"
                        alt="Client"
                        className="w-12 h-12 rounded-full mr-4"
                      />
                      <div>
                        <div className="font-semibold text-secondary">Marie Martin</div>
                        <div className="text-text text-sm">Lyon</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-[400px] flex-shrink-0 mx-4">
                  <div className="bg-white p-6 rounded-xl shadow-lg">
                    <div className="flex text-primary-orange mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-current" />
                      ))}
                    </div>
                    <p className="text-secondary mb-4">
                      "Équipe réactive et professionnelle. Je recommande vivement leurs services."
                    </p>
                    <div className="flex items-center">
                      <img
                        src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=100&h=100&q=80"
                        alt="Client"
                        className="w-12 h-12 rounded-full mr-4"
                      />
                      <div>
                        <div className="font-semibold text-secondary">Pierre Dubois</div>
                        <div className="text-text text-sm">Marseille</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Prêt à transporter votre véhicule ?
          </h2>
          <p className="text-white/90 text-xl mb-8 max-w-2xl mx-auto">
            Obtenez un devis instantané et profitez de nos services professionnels
          </p>
          <Button 
            size="lg" 
            href="/quote" 
            className="bg-primary-orange hover:bg-primary-orange/90 text-white h-14 px-8 text-lg"
          >
            Demander un devis
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  );
}