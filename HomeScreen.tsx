import React from 'react';
import { Button } from '../components/ui/Button';
import { Card, CardHeader, CardContent, CardFooter } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Plus, Library, Mail, FileText, Users, Zap, TrendingUp, Clock, Sparkles, ArrowRight, Star, Play, Crown, BarChart3, Target, Layers, Bot, Wand2, Database, ChevronRight, Activity, Award, Briefcase, Settings, Bell, Search, Filter, Grid3X3, List, Eye, Heart, Bookmark, Share2, Download, Copy, Edit3, Trash2, MoreHorizontal, Calendar, User, MessageCircle, Globe, Shield, Rocket, Lightbulb, Cpu, Palette, Code, Headphones, Command, Mic, Maximize2, Minimize2, RotateCcw, Repeat, Workflow, Layers3, Boxes, Gauge, Compass, Flame, Gem, Hexagon, Infinity, Orbit, Radar, Sparkle, Waves, Wind } from 'lucide-react';
import { User as UserType, Prompt } from '../types';

interface HomeScreenProps {
  user: UserType;
  onNavigate: (screen: string) => void;
}

export function HomeScreen({ user, onNavigate }: HomeScreenProps) {
  const recommendedPrompts: Prompt[] = [
    {
      id: '1',
      title: 'Email de réponse candidature',
      content: 'Rédigez un email professionnel pour répondre à {{nom_candidat}} concernant sa candidature pour le poste de {{poste}}.',
      profession: user.profession,
      category: 'Communication',
      tone: 'Professionnel',
      variables: [],
      rating: 4.8,
      usageCount: 1250,
      createdAt: new Date()
    },
    {
      id: '2',
      title: 'Rapport de performance',
      content: 'Créez un rapport détaillé sur les performances de {{periode}} incluant {{metriques_cles}}.',
      profession: user.profession,
      category: 'Analyse',
      tone: 'Formel',
      variables: [],
      rating: 4.6,
      usageCount: 890,
      createdAt: new Date()
    },
    {
      id: '3',
      title: 'Plan de formation personnalisé',
      content: 'Élaborez un plan de formation sur {{duree}} pour {{nom_employe}} basé sur {{competences_a_developper}}.',
      profession: user.profession,
      category: 'Formation',
      tone: 'Bienveillant',
      variables: [],
      rating: 4.9,
      usageCount: 560,
      createdAt: new Date()
    }
  ];

  const stats = [
    { 
      label: 'Prompts utilisés', 
      value: user.promptsUsed, 
      icon: Zap, 
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50/80 to-cyan-50/80',
      trend: '+12%',
      description: 'vs mois dernier',
      metric: 'ce mois'
    },
    { 
      label: 'Temps économisé', 
      value: '12h 30min', 
      icon: Clock, 
      gradient: 'from-emerald-500 to-green-500',
      bgGradient: 'from-emerald-50/80 to-green-50/80',
      trend: '+2h 15min',
      description: 'cette semaine',
      metric: 'total'
    },
    { 
      label: 'Efficacité', 
      value: '98%', 
      icon: TrendingUp, 
      gradient: 'from-orange-500 to-red-500',
      bgGradient: 'from-orange-50/80 to-red-50/80',
      trend: '+3%',
      description: 'en amélioration',
      metric: 'satisfaction'
    }
  ];

  const recentActivity = [
    {
      type: 'prompt_used',
      title: 'Email de suivi client',
      time: 'Il y a 2h',
      icon: Mail,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      type: 'prompt_created',
      title: 'Rapport mensuel RH',
      time: 'Hier',
      icon: Plus,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      type: 'prompt_shared',
      title: 'Template présentation',
      time: 'Il y a 3 jours',
      icon: Share2,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50/50">
      {/* Header ultra-épuré et moderne */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-gray-100/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-5">
          <div className="flex items-center justify-between">
            {/* Logo et navigation minimaliste */}
            <div className="flex items-center space-x-8 md:space-x-12">
              <div className="flex items-center space-x-4">
                <div className="w-9 h-9 bg-gradient-to-r from-slate-900 to-gray-800 rounded-2xl flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900 tracking-tight">Promptly</span>
              </div>
              
              {/* Navigation ultra-épurée */}
              <nav className="hidden lg:flex items-center space-x-2">
                <button className="px-4 py-2 text-gray-900 bg-gray-100 rounded-xl font-medium text-sm transition-all hover:bg-gray-200">
                  Accueil
                </button>
                <button 
                  onClick={() => onNavigate('library')}
                  className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-xl font-medium text-sm transition-all"
                >
                  Bibliothèque
                </button>
                {user.isPro && (
                  <button 
                    onClick={() => onNavigate('chat')}
                    className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-xl font-medium text-sm transition-all flex items-center space-x-2"
                  >
                    <Bot className="w-4 h-4" />
                    <span>Chat IA</span>
                    <Badge variant="primary" size="sm" className="text-xs rounded-lg">
                      PRO
                    </Badge>
                  </button>
                )}
                <button 
                  onClick={() => onNavigate('community')}
                  className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-xl font-medium text-sm transition-all"
                >
                  Communauté
                </button>
                <button 
                  onClick={() => onNavigate('my-prompts')}
                  className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-xl font-medium text-sm transition-all"
                >
                  Mes Prompts
                </button>
              </nav>
            </div>

            {/* Actions utilisateur épurées */}
            <div className="flex items-center space-x-4">
              {/* Barre de recherche minimaliste */}
              <div className="hidden md:flex items-center space-x-3 bg-gray-50/80 backdrop-blur-sm rounded-2xl px-5 py-3 min-w-80 border border-gray-100">
                <Search className="w-4 h-4 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Rechercher un prompt..." 
                  className="bg-transparent border-0 outline-none text-sm flex-1 text-gray-700 placeholder:text-gray-400"
                />
                <div className="flex items-center space-x-1 text-xs text-gray-400">
                  <Command className="w-3 h-3" />
                  <span>K</span>
                </div>
              </div>

              {/* Notifications épurées */}
              <button className="relative p-3 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-xl transition-all">
                <Bell className="w-5 h-5" />
                <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></div>
              </button>

              {/* Profil utilisateur minimaliste */}
              <div className="flex items-center space-x-4">
                <div className="text-right hidden sm:block">
                  <div className="text-sm font-semibold text-gray-900">{user.name.split(' ')[0]}</div>
                  <div className="text-xs text-gray-500">{user.profession}</div>
                </div>
                <button 
                  onClick={() => onNavigate('account')}
                  className="w-10 h-10 bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl flex items-center justify-center text-white font-bold shadow-sm hover:shadow-md transition-all hover:scale-105"
                >
                  {user.name.charAt(0)}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-16 space-y-12 md:space-y-20">
        {/* Section d'accueil ultra-épurée avec plus d'espace */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-6 md:space-y-0">
          <div className="space-y-3">
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight">
              Bonjour {user.name.split(' ')[0]}
            </h1>
            <p className="text-lg md:text-2xl text-gray-600 font-light">
              Assistant IA pour <span className="font-semibold text-gray-900">{user.profession}</span>
            </p>
            <p className="text-gray-500 text-base md:text-lg">
              Automatisez vos tâches quotidiennes avec l'intelligence artificielle
            </p>
          </div>
          
          {/* Badge de statut minimaliste */}
          <div className="text-left md:text-right space-y-3">
            <Badge variant={user.isPro ? 'primary' : 'default'} size="md" className="px-6 py-3 text-base font-bold rounded-2xl">
              {user.isPro ? (
                <div className="flex items-center space-x-2">
                  <Crown className="w-5 h-5" />
                  <span>PRO</span>
                </div>
              ) : 'GRATUIT'}
            </Badge>
            <div className="text-base text-gray-500">
              <span className="font-bold text-gray-900 text-xl md:text-2xl">{user.promptsUsed}</span>
              <span className="text-gray-400">/{user.promptsLimit === -1 ? '∞' : user.promptsLimit}</span>
              <span className="text-sm ml-2">prompts</span>
            </div>
          </div>
        </div>

        {/* Statistiques ultra-épurées avec plus d'espace */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <Card key={index} className="border-0 shadow-sm bg-white/60 backdrop-blur-sm hover:shadow-lg transition-all duration-500 hover:scale-[1.02] rounded-3xl overflow-hidden group relative">
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              <CardContent className="p-8 md:p-10 relative z-10">
                <div className="flex items-start justify-between mb-6 md:mb-8">
                  <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-r ${stat.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className="w-7 h-7 md:w-8 md:h-8 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-green-600 bg-green-50 px-3 md:px-4 py-1 md:py-2 rounded-full">
                      {stat.trend}
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="text-3xl md:text-4xl font-black text-gray-900">
                    {stat.value}
                  </div>
                  <div className="text-gray-700 font-semibold text-base md:text-lg">
                    {stat.label}
                  </div>
                  <div className="text-sm text-gray-500">
                    {stat.description} • {stat.metric}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Principal ultra-épuré avec plus d'espace */}
        <Card className="border-0 shadow-xl bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white overflow-hidden relative rounded-3xl">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-800/95 to-black/95"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-48 translate-x-48"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full translate-y-40 -translate-x-40"></div>
          <CardContent className="p-12 md:p-20 text-center relative z-10">
            <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-8 md:mb-10 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <Plus className="w-8 h-8 md:w-10 md:h-10 text-white" />
            </div>
            <h2 className="text-3xl md:text-5xl font-black mb-6 md:mb-8 tracking-tight">
              Prêt à créer votre prochain contenu ?
            </h2>
            <p className="text-gray-300 mb-8 md:mb-12 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed font-light">
              Utilisez nos prompts intelligents, créez le vôtre ou discutez avec notre IA pour automatiser vos tâches en quelques clics
            </p>
            <div className="flex flex-col sm:flex-row gap-6 md:gap-8 justify-center">
              {user.isPro && (
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => onNavigate('chat')}
                  icon={Bot}
                  className="text-lg md:text-xl px-8 md:px-12 py-4 md:py-5 rounded-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  Chat IA Promptly
                </Button>
              )}
              <Button
                variant="secondary"
                size="lg"
                onClick={() => onNavigate('create-prompt')}
                icon={Plus}
                className="text-lg md:text-xl px-8 md:px-12 py-4 md:py-5 rounded-2xl font-bold bg-white text-gray-900 hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Créer un nouveau prompt
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => onNavigate('library')}
                icon={Library}
                className="border-2 border-white/30 text-white hover:bg-white hover:text-gray-900 text-lg md:text-xl px-8 md:px-12 py-4 md:py-5 rounded-2xl backdrop-blur-sm font-bold transition-all duration-300 hover:scale-105"
              >
                Voir la bibliothèque
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Layout en deux colonnes ultra-épuré avec plus d'espace */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 md:gap-16">
          {/* Colonne principale - Prompts recommandés */}
          <div className="lg:col-span-2 space-y-8 md:space-y-10">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
                  Recommandés pour vous
                </h2>
                <p className="text-gray-600 text-base md:text-lg">
                  Sélectionnés pour votre métier
                </p>
              </div>
              <Button
                onClick={() => onNavigate('library')}
                variant="outline"
                size="sm"
                icon={ChevronRight}
                className="rounded-xl border-gray-200 text-gray-600 hover:text-gray-900 hover:border-gray-300"
              >
                Voir tout
              </Button>
            </div>

            <div className="space-y-6 md:space-y-8">
              {recommendedPrompts.map((prompt, index) => (
                <Card key={prompt.id} className="border-0 shadow-sm bg-white/60 backdrop-blur-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.01] group cursor-pointer rounded-3xl overflow-hidden" onClick={() => onNavigate('execute-prompt')}>
                  <CardContent className="p-8 md:p-10">
                    <div className="flex flex-col md:flex-row items-start justify-between space-y-4 md:space-y-0">
                      <div className="flex-1 space-y-4 md:space-y-5">
                        <div>
                          <h3 className="font-bold text-gray-900 text-xl md:text-2xl mb-3 group-hover:text-blue-600 transition-colors tracking-tight">
                            {prompt.title}
                          </h3>
                          <p className="text-gray-600 line-clamp-2 leading-relaxed text-base md:text-lg">
                            {prompt.content}
                          </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 md:gap-5">
                          <Badge variant="primary" size="sm" className="font-semibold rounded-xl px-4 py-2">
                            {prompt.category}
                          </Badge>
                          <Badge variant="secondary" size="sm" className="font-semibold rounded-xl px-4 py-2">
                            {prompt.tone}
                          </Badge>
                          <div className="flex items-center space-x-2 text-base text-gray-500">
                            <Users className="w-5 h-5" />
                            <span>{prompt.usageCount}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex md:flex-col items-center md:items-end space-x-4 md:space-x-0 md:space-y-5 md:ml-10">
                        <div className="flex items-center space-x-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-4 md:px-5 py-2 md:py-3 rounded-xl shadow-sm text-sm md:text-base font-bold">
                          <Star className="w-4 h-4 md:w-5 md:h-5 fill-current" />
                          <span>{prompt.rating}</span>
                        </div>
                        <Button
                          size="sm"
                          className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 rounded-xl font-semibold bg-gray-900 hover:bg-gray-800 px-4 md:px-6 py-2 md:py-3"
                          icon={Play}
                        >
                          Utiliser
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar ultra-épurée avec activité récente uniquement */}
          <div className="space-y-8 md:space-y-10">
            {/* Activité récente épurée */}
            <div className="space-y-6">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">
                Activité récente
              </h3>
              <Card className="border-0 shadow-sm bg-white/60 backdrop-blur-sm rounded-3xl overflow-hidden">
                <CardContent className="p-0">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className={`p-6 md:p-8 hover:bg-gray-50/50 transition-colors ${index !== recentActivity.length - 1 ? 'border-b border-gray-100' : ''}`}>
                      <div className="flex items-center space-x-4 md:space-x-5">
                        <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl ${activity.bgColor} flex items-center justify-center`}>
                          <activity.icon className={`w-5 h-5 md:w-6 md:h-6 ${activity.color}`} />
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="font-semibold text-gray-900 text-sm md:text-base">
                            {activity.title}
                          </div>
                          <div className="text-xs md:text-sm text-gray-500">
                            {activity.time}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Upgrade prompt épuré pour les utilisateurs gratuits */}
            {!user.isPro && (
              <Card className="border-0 shadow-sm bg-gradient-to-br from-orange-50/80 to-yellow-50/80 backdrop-blur-sm rounded-3xl overflow-hidden">
                <CardContent className="p-8 md:p-10 text-center space-y-6">
                  <div className="w-14 h-14 md:w-16 md:h-16 mx-auto bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl flex items-center justify-center shadow-sm">
                    <Crown className="w-7 h-7 md:w-8 md:h-8 text-white" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="font-bold text-gray-900 text-lg md:text-xl">
                      Passez à PRO
                    </h3>
                    <p className="text-gray-600 text-sm md:text-base">
                      Prompts illimités, Chat IA et fonctionnalités avancées
                    </p>
                  </div>
                  <Button
                    onClick={() => onNavigate('account')}
                    variant="secondary"
                    size="sm"
                    className="w-full rounded-xl font-semibold bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white border-0 py-3"
                  >
                    Découvrir PRO
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Chat IA Teaser pour les utilisateurs gratuits */}
            {!user.isPro && (
              <Card className="border-0 shadow-sm bg-gradient-to-br from-blue-50/80 to-purple-50/80 backdrop-blur-sm rounded-3xl overflow-hidden">
                <CardContent className="p-8 md:p-10 text-center space-y-6">
                  <div className="w-14 h-14 md:w-16 md:h-16 mx-auto bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-sm">
                    <Bot className="w-7 h-7 md:w-8 md:h-8 text-white" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="font-bold text-gray-900 text-lg md:text-xl">
                      Chat IA Promptly
                    </h3>
                    <p className="text-gray-600 text-sm md:text-base">
                      Discutez avec votre assistant IA personnel et exécutez vos prompts à la voix
                    </p>
                  </div>
                  <Button
                    onClick={() => onNavigate('account')}
                    variant="secondary"
                    size="sm"
                    className="w-full rounded-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 py-3"
                    icon={Crown}
                  >
                    Fonctionnalité PRO
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}