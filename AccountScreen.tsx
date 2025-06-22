import React, { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardHeader, CardContent, CardFooter } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { ArrowLeft, User, Crown, Zap, CreditCard, Check, Settings, BarChart3, Sparkles, Shield, Clock, TrendingUp, Award, Target, Rocket, Star, CheckCircle, AlertCircle, Calendar, Mail, Briefcase, Edit3, Save, X } from 'lucide-react';
import { User as UserType } from '../src/types';

interface AccountScreenProps {
  user: UserType;
  onNavigate: (screen: string) => void;
  onUpgrade: () => void;
}

export function AccountScreen({ user, onNavigate, onUpgrade }: AccountScreenProps) {
  const [activeTab, setActiveTab] = useState<'profile' | 'subscription' | 'usage'>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    profession: user.profession
  });

  const handleSave = () => {
    // Simulate save
    setIsEditing(false);
    alert('Profil mis à jour avec succès !');
  };

  const pricingPlans = [
    {
      name: 'Gratuit',
      price: '0€',
      period: '/mois',
      current: !user.isPro,
      features: [
        '10 prompts par mois',
        'Bibliothèque de base',
        'Prompts personnels',
        'Support par email'
      ],
      limitations: [
        'Pas d\'accès à la communauté',
        'Pas de prompts premium',
        'Export limité'
      ]
    },
    {
      name: 'PRO',
      price: '29€',
      period: '/mois',
      current: user.isPro,
      popular: true,
      features: [
        'Prompts illimités',
        'Accès communauté complète',
        'Prompts premium',
        'Export avancé (PDF, Google Docs)',
        'Variables avancées',
        'Support prioritaire',
        'Intégration API',
        'Analytics détaillées'
      ]
    }
  ];

  const usageStats = [
    { 
      label: 'Prompts utilisés ce mois', 
      value: user.promptsUsed, 
      max: user.promptsLimit,
      icon: Zap,
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50/80 to-cyan-50/80'
    },
    { 
      label: 'Prompts créés', 
      value: 12, 
      max: null,
      icon: Sparkles,
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-50/80 to-pink-50/80'
    },
    { 
      label: 'Temps économisé', 
      value: '24h 15min', 
      max: null,
      icon: Clock,
      gradient: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-50/80 to-emerald-50/80'
    },
    { 
      label: 'Taux de satisfaction', 
      value: '98%', 
      max: null,
      icon: TrendingUp,
      gradient: 'from-orange-500 to-red-500',
      bgGradient: 'from-orange-50/80 to-red-50/80'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50/50">
      {/* Header épuré */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-gray-100/50 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <Button
                variant="ghost"
                onClick={() => onNavigate('home')}
                icon={ArrowLeft}
                className="rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              >
                Retour
              </Button>
              <div className="space-y-1">
                <h1 className="text-3xl font-black text-gray-900 tracking-tight">
                  Mon Compte
                </h1>
                <p className="text-gray-600">
                  Gérez votre profil et votre abonnement
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant={user.isPro ? 'primary' : 'default'} size="md" className="px-4 py-2 rounded-xl font-bold">
                {user.isPro ? (
                  <>
                    <Crown className="w-4 h-4 mr-2" />
                    PRO
                  </>
                ) : (
                  'GRATUIT'
                )}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 py-12">
        {/* Tabs épurés */}
        <div className="flex space-x-2 bg-gray-100 p-1 rounded-2xl mb-12 w-fit">
          {[
            { key: 'profile', label: 'Profil', icon: User },
            { key: 'subscription', label: 'Abonnement', icon: CreditCard },
            { key: 'usage', label: 'Utilisation', icon: BarChart3 }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex items-center space-x-3 px-6 py-3 rounded-xl text-sm font-semibold transition-all ${
                activeTab === tab.key
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <Card className="border-0 shadow-sm bg-white/60 backdrop-blur-sm rounded-3xl">
            <CardHeader className="p-8 pb-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                    Informations personnelles
                  </h2>
                  <p className="text-gray-600">
                    Gérez vos informations de profil
                  </p>
                </div>
                <Button
                  onClick={isEditing ? handleSave : () => setIsEditing(true)}
                  icon={isEditing ? Save : Edit3}
                  variant={isEditing ? 'primary' : 'outline'}
                  size="sm"
                  className="rounded-xl font-semibold"
                >
                  {isEditing ? 'Sauvegarder' : 'Modifier'}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-8 pt-0 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Nom complet
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  ) : (
                    <div className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 font-medium">
                      {formData.name}
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Email
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  ) : (
                    <div className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 font-medium">
                      {formData.email}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Profession
                </label>
                {isEditing ? (
                  <select
                    value={formData.profession}
                    onChange={(e) => setFormData(prev => ({ ...prev, profession: e.target.value }))}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="Responsable RH">Responsable RH</option>
                    <option value="Avocat">Avocat</option>
                    <option value="Responsable Marketing">Responsable Marketing</option>
                    <option value="Coach professionnel">Coach professionnel</option>
                    <option value="Consultant métier">Consultant métier</option>
                    <option value="Commercial">Commercial</option>
                  </select>
                ) : (
                  <div className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 font-medium">
                    {formData.profession}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Subscription Tab */}
        {activeTab === 'subscription' && (
          <div className="space-y-8">
            <Card className="border-0 shadow-sm bg-white/60 backdrop-blur-sm rounded-3xl">
              <CardHeader className="p-8 pb-6">
                <div className="space-y-1">
                  <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                    Abonnement actuel
                  </h2>
                  <p className="text-gray-600">
                    Gérez votre plan d'abonnement
                  </p>
                </div>
              </CardHeader>
              <CardContent className="p-8 pt-0">
                <div className="flex items-center justify-between p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl">
                  <div className="space-y-2">
                    <div className="text-xl font-bold text-gray-900">
                      {user.isPro ? 'Plan PRO' : 'Plan Gratuit'}
                    </div>
                    <div className="text-gray-600">
                      {user.isPro ? '29€/mois - Renouvelé le 15 de chaque mois' : 'Fonctionnalités de base'}
                    </div>
                  </div>
                  <Badge variant={user.isPro ? 'primary' : 'default'} size="md" className="px-4 py-2 rounded-xl font-bold">
                    {user.isPro ? 'ACTIF' : 'GRATUIT'}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {pricingPlans.map((plan) => (
                <Card key={plan.name} className={`border-0 shadow-sm bg-white/60 backdrop-blur-sm rounded-3xl ${plan.popular ? 'ring-2 ring-blue-500 relative' : ''} ${plan.current ? 'bg-blue-50/80' : ''}`}>
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge variant="secondary" size="md" className="px-4 py-2 rounded-xl font-bold">
                        <Rocket className="w-4 h-4 mr-2" />
                        Le plus populaire
                      </Badge>
                    </div>
                  )}
                  
                  <CardHeader className="p-8 text-center">
                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold text-gray-900">
                        {plan.name}
                      </h3>
                      <div>
                        <span className="text-4xl font-black text-gray-900">
                          {plan.price}
                        </span>
                        <span className="text-gray-600 text-lg">{plan.period}</span>
                      </div>
                      {plan.current && (
                        <Badge variant="primary" size="sm" className="rounded-xl font-bold">
                          Plan actuel
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  
                  <CardContent className="p-8 pt-0">
                    <ul className="space-y-3">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center space-x-3 text-sm">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span className="text-gray-700 font-medium">{feature}</span>
                        </li>
                      ))}
                      {plan.limitations?.map((limitation, index) => (
                        <li key={index} className="flex items-center space-x-3 text-sm text-gray-500">
                          <X className="w-5 h-5 text-gray-300 flex-shrink-0" />
                          <span>{limitation}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  
                  <CardFooter className="p-8 pt-0">
                    {!plan.current && (
                      <Button
                        onClick={plan.name === 'PRO' ? onUpgrade : undefined}
                        className="w-full rounded-xl font-semibold"
                        variant={plan.popular ? 'primary' : 'outline'}
                      >
                        {plan.name === 'PRO' ? 'Passer à PRO' : 'Rétrograder'}
                      </Button>
                    )}
                    {plan.current && plan.name === 'PRO' && (
                      <Button
                        variant="outline"
                        className="w-full rounded-xl font-semibold"
                      >
                        Gérer l'abonnement
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Usage Tab */}
        {activeTab === 'usage' && (
          <div className="space-y-8">
            <Card className="border-0 shadow-sm bg-white/60 backdrop-blur-sm rounded-3xl">
              <CardHeader className="p-8 pb-6">
                <div className="space-y-1">
                  <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                    Statistiques d'utilisation
                  </h2>
                  <p className="text-gray-600">
                    Aperçu de votre activité sur Promptly
                  </p>
                </div>
              </CardHeader>
              <CardContent className="p-8 pt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {usageStats.map((stat, index) => (
                    <div key={index} className={`p-6 rounded-2xl bg-gradient-to-br ${stat.bgGradient} space-y-4`}>
                      <div className="flex items-center justify-between">
                        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${stat.gradient} flex items-center justify-center shadow-lg`}>
                          <stat.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-black text-gray-900">
                            {stat.value}
                          </div>
                          {stat.max && (
                            <div className="text-sm text-gray-500">
                              sur {stat.max}
                            </div>
                          )}
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-700 font-semibold mb-2">
                          {stat.label}
                        </div>
                        {stat.max && (
                          <div className="w-full bg-white/50 rounded-full h-2">
                            <div
                              className={`bg-gradient-to-r ${stat.gradient} h-2 rounded-full transition-all duration-500`}
                              style={{
                                width: `${Math.min((stat.value / stat.max) * 100, 100)}%`
                              }}
                            ></div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upgrade prompt pour les utilisateurs gratuits */}
            {!user.isPro && user.promptsUsed >= user.promptsLimit * 0.8 && (
              <Card className="border-0 shadow-sm bg-gradient-to-br from-orange-50/80 to-yellow-50/80 backdrop-blur-sm rounded-3xl">
                <CardContent className="p-8">
                  <div className="flex items-center space-x-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                      <Crown className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <h3 className="text-xl font-bold text-gray-900">
                        Vous approchez de votre limite
                      </h3>
                      <p className="text-gray-700">
                        Passez à PRO pour des prompts illimités et débloquez toutes les fonctionnalités avancées.
                      </p>
                    </div>
                    <Button
                      onClick={onUpgrade}
                      variant="secondary"
                      className="rounded-xl font-semibold bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white border-0"
                    >
                      Passer à PRO
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
}