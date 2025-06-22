import React, { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { ArrowRight, Users, Shield, Rocket, Target, BarChart3, TrendingUp, Plus, Sparkles, ChevronRight, User, Mail, Briefcase } from 'lucide-react';

interface OnboardingData {
  name: string;
  email: string;
  profession: string;
}

interface OnboardingScreenProps {
  onContinue: (data: OnboardingData) => void;
  onSignIn: () => void;
  onSignUp: (data: OnboardingData) => void;
}

interface ProfessionCard {
  id: string;
  title: string;
  description: string;
  icon: any;
  gradient: string;
  bgGradient: string;
}

export function OnboardingScreen({ onContinue, onSignIn, onSignUp }: OnboardingScreenProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedProfession, setSelectedProfession] = useState<string>('');
  const [customProfession, setCustomProfession] = useState<string>('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const professions: ProfessionCard[] = [
    {
      id: 'Responsable RH',
      title: 'Responsable RH',
      description: 'Gestion des talents et ressources humaines',
      icon: Users,
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50/80 to-cyan-50/80'
    },
    {
      id: 'Avocat',
      title: 'Avocat',
      description: 'Conseil juridique et représentation',
      icon: Shield,
      gradient: 'from-purple-500 to-indigo-500',
      bgGradient: 'from-purple-50/80 to-indigo-50/80'
    },
    {
      id: 'Responsable Marketing',
      title: 'Responsable Marketing',
      description: 'Stratégie et communication marketing',
      icon: Rocket,
      gradient: 'from-pink-500 to-rose-500',
      bgGradient: 'from-pink-50/80 to-rose-50/80'
    },
    {
      id: 'Coach professionnel',
      title: 'Coach professionnel',
      description: 'Accompagnement et développement',
      icon: Target,
      gradient: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-50/80 to-emerald-50/80'
    },
    {
      id: 'Consultant métier',
      title: 'Consultant métier',
      description: 'Conseil en organisation et stratégie',
      icon: BarChart3,
      gradient: 'from-orange-500 to-red-500',
      bgGradient: 'from-orange-50/80 to-red-50/80'
    },
    {
      id: 'Commercial',
      title: 'Commercial',
      description: 'Vente et relation client',
      icon: TrendingUp,
      gradient: 'from-yellow-500 to-orange-500',
      bgGradient: 'from-yellow-50/80 to-orange-50/80'
    },
    {
      id: 'Autre',
      title: 'Autre métier',
      description: 'Spécifiez votre profession unique',
      icon: Plus,
      gradient: 'from-gray-500 to-gray-600',
      bgGradient: 'from-gray-50/80 to-gray-100/80'
    }
  ];

  const handleProfessionSelect = (professionId: string) => {
    setSelectedProfession(professionId);
    if (professionId !== 'Autre') {
      setCustomProfession('');
    }
  };

  const handleNext = () => {
    if (currentStep === 1 && name && email) {
      setCurrentStep(2);
    } else if (currentStep === 2 && selectedProfession && (selectedProfession !== 'Autre' || customProfession.trim())) {
      setCurrentStep(3);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleContinue = () => {
    const finalProfession = selectedProfession === 'Autre' ? customProfession : selectedProfession;
    const onboardingData: OnboardingData = {
      name,
      email,
      profession: finalProfession
    };
    onContinue(onboardingData);
  };

  const getFinalProfession = () => {
    return selectedProfession === 'Autre' ? customProfession : selectedProfession;
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="text-center space-y-6 md:space-y-8">
            <div className="w-16 h-16 md:w-20 md:h-20 mx-auto bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl md:rounded-3xl flex items-center justify-center shadow-lg">
              <User className="w-8 h-8 md:w-10 md:h-10 text-white" />
            </div>
            <div className="space-y-3 md:space-y-4 px-4">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-gray-900 tracking-tight">
                Faisons connaissance
              </h2>
              <p className="text-base md:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Quelques informations pour personnaliser votre expérience et créer votre profil professionnel
              </p>
            </div>
            <div className="max-w-sm md:max-w-md mx-auto space-y-4 md:space-y-6 px-4">
              <div className="space-y-2">
                <label className="block text-left text-sm font-semibold text-gray-700">
                  Prénom et nom <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 md:w-5 md:h-5" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Votre nom complet"
                    className="w-full pl-10 md:pl-12 pr-3 md:pr-4 py-3 md:py-4 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-base md:text-lg"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-left text-sm font-semibold text-gray-700">
                  Email professionnel <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 md:w-5 md:h-5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="votre.email@entreprise.com"
                    className="w-full pl-10 md:pl-12 pr-3 md:pr-4 py-3 md:py-4 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-base md:text-lg"
                    required
                  />
                </div>
              </div>
            </div>
            {name && email && (
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 md:p-6 max-w-sm md:max-w-md mx-auto">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-base md:text-lg">
                    {name.charAt(0).toUpperCase()}
                  </div>
                  <div className="text-left min-w-0 flex-1">
                    <div className="font-semibold text-gray-900 text-sm md:text-base truncate">{name}</div>
                    <div className="text-xs md:text-sm text-gray-600 truncate">{email}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 2:
        return (
          <div className="text-center space-y-6 md:space-y-8">
            <div className="w-16 h-16 md:w-20 md:h-20 mx-auto bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl md:rounded-3xl flex items-center justify-center shadow-lg">
              <Sparkles className="w-8 h-8 md:w-10 md:h-10 text-white" />
            </div>
            <div className="space-y-3 md:space-y-4 px-4">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-gray-900 tracking-tight">
                Quel est votre métier ?
              </h2>
              <p className="text-base md:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Sélectionnez votre profession pour que nous puissions personnaliser Promptly selon vos besoins spécifiques
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto px-4">
              {professions.map((profession) => {
                const IconComponent = profession.icon;
                const isSelected = selectedProfession === profession.id;
                
                return (
                  <Card
                    key={profession.id}
                    className={`border-0 shadow-sm bg-white/60 backdrop-blur-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer rounded-2xl md:rounded-3xl overflow-hidden group ${
                      isSelected ? 'ring-2 ring-blue-500 bg-blue-50/80 shadow-lg' : ''
                    }`}
                    onClick={() => handleProfessionSelect(profession.id)}
                  >
                    <CardContent className="p-4 md:p-6 lg:p-8 text-center space-y-4 md:space-y-6">
                      <div className={`w-12 h-12 md:w-16 md:h-16 mx-auto rounded-xl md:rounded-2xl bg-gradient-to-r ${profession.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="w-6 h-6 md:w-8 md:h-8 text-white" />
                      </div>
                      <div className="space-y-2 md:space-y-3">
                        <h3 className="font-bold text-gray-900 text-base md:text-lg lg:text-xl group-hover:text-blue-600 transition-colors tracking-tight">
                          {profession.title}
                        </h3>
                        <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                          {profession.description}
                        </p>
                      </div>
                      {profession.id !== 'Autre' && (
                        <div className="text-xs md:text-sm text-gray-500 font-medium">
                          Personnalisé
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            
            {/* Champ personnalisé pour "Autre métier" */}
            {selectedProfession === 'Autre' && (
              <div className="max-w-sm md:max-w-md mx-auto mt-6 md:mt-8 px-4">
                <div className="space-y-2">
                  <label className="block text-left text-sm font-semibold text-gray-700">
                    Spécifiez votre métier <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 md:w-5 md:h-5" />
                    <input
                      type="text"
                      value={customProfession}
                      onChange={(e) => setCustomProfession(e.target.value)}
                      placeholder="Ex: Architecte, Designer, Ingénieur..."
                      className="w-full pl-10 md:pl-12 pr-3 md:pr-4 py-3 md:py-4 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-base md:text-lg"
                      required
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div className="text-center space-y-6 md:space-y-8">
            <div className="w-16 h-16 md:w-20 md:h-20 mx-auto bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl md:rounded-3xl flex items-center justify-center shadow-lg">
              <Target className="w-8 h-8 md:w-10 md:h-10 text-white" />
            </div>
            <div className="space-y-3 md:space-y-4 px-4">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-gray-900 tracking-tight">
                Parfait ! Vous êtes prêt
              </h2>
              <p className="text-base md:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Promptly est maintenant configuré pour votre métier de <span className="font-semibold text-gray-900">{getFinalProfession()}</span>. 
                Découvrez vos premiers assistants IA personnalisés.
              </p>
            </div>
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl md:rounded-3xl p-6 md:p-8 max-w-2xl mx-auto">
              <div className="space-y-4 md:space-y-6">
                <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900">Ce qui vous attend :</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 text-left">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 md:w-8 md:h-8 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-3 h-3 md:w-5 md:h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 text-sm md:text-base">Prompts spécialisés</div>
                      <div className="text-xs md:text-sm text-gray-600">Adaptés à votre métier</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 md:w-8 md:h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Target className="w-3 h-3 md:w-5 md:h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 text-sm md:text-base">IA personnalisée</div>
                      <div className="text-xs md:text-sm text-gray-600">Comprend votre contexte</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 md:w-8 md:h-8 bg-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Rocket className="w-3 h-3 md:w-5 md:h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 text-sm md:text-base">Gain de temps</div>
                      <div className="text-xs md:text-sm text-gray-600">Automatisation intelligente</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 md:w-8 md:h-8 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Users className="w-3 h-3 md:w-5 md:h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 text-sm md:text-base">Communauté</div>
                      <div className="text-xs md:text-sm text-gray-600">Partagez et découvrez</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col gap-4 justify-center max-w-sm md:max-w-md mx-auto px-4">
              <Button
                onClick={handleContinue}
                size="lg"
                className="w-full rounded-xl md:rounded-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 py-3 md:py-4 text-base md:text-lg"
                icon={ArrowRight}
              >
                Commencer à explorer
              </Button>
              <p className="text-xs md:text-sm text-gray-500 text-center">
                Vous pourrez créer votre compte plus tard pour sauvegarder vos données
              </p>
            </div>
            
            <div className="text-center px-4">
              <p className="text-gray-600 text-sm md:text-base">Déjà un compte ?</p>
              <button
                onClick={onSignIn}
                className="text-blue-600 hover:text-blue-700 font-semibold transition-colors text-sm md:text-base"
              >
                Se connecter
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50/50 flex items-center justify-center p-4">
      <div className="w-full max-w-7xl mx-auto">
        {/* Progress indicator */}
        <div className="flex items-center justify-center mb-8 md:mb-12">
          <div className="flex items-center space-x-2 md:space-x-4">
            {[1, 2, 3].map((step) => (
              <React.Fragment key={step}>
                <div className={`w-8 h-8 md:w-12 md:h-12 rounded-full flex items-center justify-center font-bold text-sm md:text-lg transition-all ${
                  step === currentStep 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                    : step < currentStep 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-200 text-gray-500'
                }`}>
                  {step < currentStep ? '✓' : step}
                </div>
                {step < 3 && (
                  <div className={`w-8 md:w-16 h-1 rounded-full transition-all ${
                    step < currentStep ? 'bg-green-500' : 'bg-gray-200'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="text-center mb-6 md:mb-8">
          <p className="text-gray-500 font-medium text-sm md:text-base">Étape {currentStep} sur 3</p>
        </div>

        {/* Main content */}
        <div className="mb-8 md:mb-12">
          {renderStep()}
        </div>

        {/* Navigation */}
        {currentStep < 3 && (
          <div className="flex justify-between items-center max-w-2xl mx-auto px-4">
            <Button
              onClick={handlePrevious}
              variant="outline"
              size="lg"
              disabled={currentStep === 1}
              className="rounded-xl md:rounded-2xl font-semibold px-4 md:px-8 py-2 md:py-3 text-sm md:text-base"
            >
              Précédent
            </Button>

            <div className="flex space-x-1 md:space-x-2">
              {[1, 2, 3].map((step) => (
                <div
                  key={step}
                  className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all ${
                    step === currentStep ? 'bg-blue-600' : step < currentStep ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>

            <Button
              onClick={handleNext}
              size="lg"
              disabled={
                (currentStep === 1 && (!name || !email)) ||
                (currentStep === 2 && (!selectedProfession || (selectedProfession === 'Autre' && !customProfession.trim())))
              }
              className="rounded-xl md:rounded-2xl font-semibold px-4 md:px-8 py-2 md:py-3 text-sm md:text-base bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              icon={ChevronRight}
            >
              Suivant
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}