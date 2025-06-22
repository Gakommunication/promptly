import React, { useState, useEffect } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { X, Mail, Lock, User, Briefcase, Sparkles, Eye, EyeOff, CheckCircle } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface OnboardingData {
  name: string;
  email: string;
  profession: string;
}

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'signin' | 'signup';
  onModeChange: (mode: 'signin' | 'signup') => void;
  onboardingData?: OnboardingData | null;
}

export function AuthModal({ isOpen, onClose, mode, onModeChange, onboardingData }: AuthModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [profession, setProfession] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { signIn, signUp } = useAuth();

  const professions = [
    'Responsable RH',
    'Avocat',
    'Responsable Marketing',
    'Coach professionnel',
    'Consultant métier',
    'Commercial',
    'Manager',
    'Entrepreneur',
    'Autre'
  ];

  useEffect(() => {
    if (isOpen && mode === 'signup' && onboardingData) {
      console.log('Pre-filling form with onboarding data:', onboardingData);
      setName(onboardingData.name);
      setEmail(onboardingData.email);
      setProfession(onboardingData.profession);
    } else if (mode === 'signin') {
      setName('');
      setProfession('');
      if (!onboardingData) {
        setEmail('');
      }
    }
  }, [isOpen, mode, onboardingData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (mode === 'signin') {
        console.log('Attempting to sign in...');
        const { error } = await signIn(email, password);
        if (error) {
          console.error('Sign in error:', error);
          setError('Email ou mot de passe incorrect');
        } else {
          console.log('Sign in successful');
          setSuccess('Connexion réussie ! Redirection...');
          setTimeout(() => {
            onClose();
          }, 1000);
        }
      } else {
        if (!name || !profession) {
          setError('Veuillez remplir tous les champs');
          return;
        }

        if (password !== confirmPassword) {
          setError('Les mots de passe ne correspondent pas');
          return;
        }

        if (password.length < 6) {
          setError('Le mot de passe doit contenir au moins 6 caractères');
          return;
        }

        console.log('Attempting to sign up...');
        const { error } = await signUp(email, password, { name, profession });
        if (error) {
          console.error('Sign up error:', error);
          setError('Erreur lors de la création du compte');
        } else {
          console.log('Sign up successful');
          setSuccess('Compte créé avec succès ! Redirection...');
          setTimeout(() => {
            onClose();
          }, 1000);
        }
      }
    } catch (err) {
      console.error('Auth error:', err);
      setError('Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setName('');
    setProfession('');
    setError(null);
    setSuccess(null);
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const handleModeChange = (newMode: 'signin' | 'signup') => {
    resetForm();
    onModeChange(newMode);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-sm md:max-w-md bg-white rounded-2xl md:rounded-3xl shadow-2xl border-0 overflow-hidden">
        <CardHeader className="p-6 md:p-8 pb-4 md:pb-6 text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 md:top-6 right-4 md:right-6 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-xl flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>
          
          <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 md:mb-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg">
            <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-white" />
          </div>
          
          <h2 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight mb-2">
            {mode === 'signin' ? 'Connexion' : 'Créer un compte'}
          </h2>
          <p className="text-sm md:text-base text-gray-600">
            {mode === 'signin' 
              ? 'Accédez à votre assistant IA personnel' 
              : 'Rejoignez Promptly et automatisez vos tâches'
            }
          </p>
        </CardHeader>

        <CardContent className="p-6 md:p-8 pt-0">
          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            {error && (
              <div className="p-3 md:p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                {error}
              </div>
            )}

            {success && (
              <div className="p-3 md:p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm flex items-center space-x-2">
                <CheckCircle className="w-4 h-4" />
                <span>{success}</span>
              </div>
            )}

            {mode === 'signup' && (
              <>
                <Input
                  label="Nom complet"
                  type="text"
                  value={name}
                  onChange={setName}
                  placeholder="Jean Dupont"
                  icon={User}
                  required
                />

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Profession <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 md:w-5 md:h-5" />
                    <select
                      value={profession}
                      onChange={(e) => setProfession(e.target.value)}
                      className="w-full pl-10 md:pl-12 pr-3 md:pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white text-sm md:text-base appearance-none"
                      required
                    >
                      <option value="">Sélectionnez votre métier</option>
                      {professions.map(prof => (
                        <option key={prof} value={prof}>{prof}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </>
            )}

            <Input
              label="Email"
              type="email"
              value={email}
              onChange={setEmail}
              placeholder="jean@exemple.com"
              icon={Mail}
              required
            />

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Mot de passe <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 md:w-5 md:h-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 md:pl-12 pr-12 md:pr-14 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white text-sm md:text-base"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 md:right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4 md:w-5 md:h-5" /> : <Eye className="w-4 h-4 md:w-5 md:h-5" />}
                </button>
              </div>
              {mode === 'signup' && (
                <p className="text-xs text-gray-500">Minimum 6 caractères</p>
              )}
            </div>

            {mode === 'signup' && (
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Confirmer le mot de passe <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 md:w-5 md:h-5" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 md:pl-12 pr-12 md:pr-14 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white text-sm md:text-base"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 md:right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4 md:w-5 md:h-5" /> : <Eye className="w-4 h-4 md:w-5 md:h-5" />}
                  </button>
                </div>
              </div>
            )}

            <Button
              type="submit"
              loading={loading}
              disabled={success !== null}
              className="w-full rounded-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 py-3 md:py-4 text-base md:text-lg"
            >
              {loading ? 'Chargement...' : mode === 'signin' ? 'Se connecter' : 'Créer mon compte'}
            </Button>
          </form>

          {!success && (
            <div className="mt-6 md:mt-8 text-center">
              <p className="text-gray-600 text-sm md:text-base">
                {mode === 'signin' ? 'Pas encore de compte ?' : 'Déjà un compte ?'}
              </p>
              <button
                onClick={() => handleModeChange(mode === 'signin' ? 'signup' : 'signin')}
                className="text-blue-600 hover:text-blue-700 font-semibold transition-colors text-sm md:text-base"
              >
                {mode === 'signin' ? 'Créer un compte' : 'Se connecter'}
              </button>
            </div>
          )}

          {mode === 'signin' && !success && (
            <div className="mt-4 text-center">
              <p className="text-xs text-gray-500">
                Mode démo : Utilisez n'importe quel email et mot de passe
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}