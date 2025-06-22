import React, { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Search, Filter, Plus, Star, Users, ArrowLeft, Grid3X3, List, SlidersHorizontal, Sparkles, Clock, TrendingUp, Award, Zap, Target, Briefcase, MessageSquare, BarChart3, BookOpen, Lightbulb, Rocket, Shield, Heart, Eye, Play, ChevronRight, User, Crown } from 'lucide-react';
import { Prompt, User as UserType } from '../types';

interface LibraryScreenProps {
  user: UserType;
  onNavigate: (screen: string) => void;
  onSelectPrompt: (prompt: Prompt) => void;
}

export function LibraryScreen({ user, onNavigate, onSelectPrompt }: LibraryScreenProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProfession, setSelectedProfession] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTone, setSelectedTone] = useState('all');
  const [selectedSource, setSelectedSource] = useState<'all' | 'personal' | 'favorites'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Prompts de base de la bibliothèque
  const basePrompts: Prompt[] = [
    {
      id: '1',
      title: 'Email de bienvenue nouveaux employés',
      content: 'Rédigez un email chaleureux pour accueillir {{nom_employe}} dans l\'équipe {{nom_equipe}}...',
      profession: 'Responsable RH',
      category: 'Communication',
      tone: 'Bienveillant',
      variables: [],
      rating: 4.8,
      usageCount: 1250,
      createdAt: new Date()
    },
    {
      id: '2',
      title: 'Contrat de prestation de service',
      content: 'Rédigez un contrat de prestation entre {{nom_client}} et {{nom_entreprise}}...',
      profession: 'Avocat',
      category: 'Juridique',
      tone: 'Formel',
      variables: [],
      rating: 4.9,
      usageCount: 890,
      createdAt: new Date()
    },
    {
      id: '3',
      title: 'Stratégie de contenu social media',
      content: 'Créez une stratégie de contenu pour {{plateforme}} sur le thème {{sujet}}...',
      profession: 'Responsable Marketing',
      category: 'Marketing',
      tone: 'Créatif',
      variables: [],
      rating: 4.7,
      usageCount: 1560,
      createdAt: new Date()
    },
    {
      id: '4',
      title: 'Plan de coaching personnalisé',
      content: 'Élaborez un plan de coaching sur {{duree}} pour atteindre l\'objectif {{objectif}}...',
      profession: 'Coach professionnel',
      category: 'Développement',
      tone: 'Empathique',
      variables: [],
      rating: 4.9,
      usageCount: 670,
      createdAt: new Date()
    },
    {
      id: '5',
      title: 'Rapport d\'analyse financière',
      content: 'Analysez les performances financières de {{periode}} et proposez des recommandations...',
      profession: 'Consultant métier',
      category: 'Analyse',
      tone: 'Professionnel',
      variables: [],
      rating: 4.6,
      usageCount: 420,
      createdAt: new Date()
    },
    {
      id: '6',
      title: 'Présentation commerciale',
      content: 'Créez une présentation pour convaincre {{nom_prospect}} d\'adopter {{solution}}...',
      profession: 'Commercial',
      category: 'Vente',
      tone: 'Persuasif',
      variables: [],
      rating: 4.8,
      usageCount: 980,
      createdAt: new Date()
    }
  ];

  // Prompts personnels de l'utilisateur (mockés)
  const myPrompts: Prompt[] = [
    {
      id: 'p1',
      title: 'Email de suivi personnalisé',
      content: 'Rédigez un email de suivi pour {{nom_client}} concernant {{sujet}}...',
      profession: user.profession,
      category: 'Communication',
      tone: 'Professionnel',
      variables: [],
      isPersonal: true,
      usageCount: 15,
      createdAt: new Date('2024-01-15')
    },
    {
      id: 'p2',
      title: 'Rapport mensuel personnalisé',
      content: 'Créez un rapport mensuel sur {{indicateurs}} pour la période {{mois}}...',
      profession: user.profession,
      category: 'Analyse',
      tone: 'Formel',
      variables: [],
      isPersonal: true,
      usageCount: 8,
      createdAt: new Date('2024-01-10')
    }
  ];

  // Prompts favoris (uniquement pour les utilisateurs PRO)
  const favoritedPrompts: Prompt[] = user.isPro ? [
    {
      id: 'f1',
      title: 'Template email de négociation salariale',
      content: 'Rédigez un email professionnel pour négocier votre salaire avec {{arguments_cles}}...',
      profession: 'Responsable RH',
      category: 'Communication',
      tone: 'Professionnel',
      variables: [],
      author: 'Marie Dubois',
      rating: 4.9,
      usageCount: 2450,
      isFavorited: true,
      createdAt: new Date('2024-01-18')
    },
    {
      id: 'f2',
      title: 'Audit de conformité RGPD complet',
      content: 'Générez un audit RGPD pour {{type_entreprise}} incluant {{domaines_audit}}...',
      profession: 'Avocat',
      category: 'Juridique',
      tone: 'Formel',
      variables: [],
      author: 'Jean Martin',
      rating: 4.8,
      usageCount: 1890,
      isFavorited: true,
      createdAt: new Date('2024-01-16')
    }
  ] : [];

  // Combiner toutes les sources de prompts
  const allPrompts = [
    ...basePrompts,
    ...myPrompts,
    ...favoritedPrompts
  ].filter((prompt, index, self) => 
    index === self.findIndex(p => p.id === prompt.id)
  );

  const professions = ['all', 'Responsable RH', 'Avocat', 'Responsable Marketing', 'Coach professionnel', 'Consultant métier', 'Commercial'];
  const categories = ['all', 'Communication', 'Juridique', 'Marketing', 'Développement', 'Analyse', 'Vente'];
  const tones = ['all', 'Professionnel', 'Formel', 'Bienveillant', 'Créatif', 'Empathique', 'Persuasif'];

  const filteredPrompts = allPrompts.filter(prompt => {
    const matchesSearch = prompt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prompt.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProfession = selectedProfession === 'all' || prompt.profession === selectedProfession;
    const matchesCategory = selectedCategory === 'all' || prompt.category === selectedCategory;
    const matchesTone = selectedTone === 'all' || prompt.tone === selectedTone;
    
    // Filtrage par source
    let matchesSource = true;
    if (selectedSource === 'personal') {
      matchesSource = prompt.isPersonal === true;
    } else if (selectedSource === 'favorites') {
      matchesSource = prompt.isFavorited === true;
    }
    
    return matchesSearch && matchesProfession && matchesCategory && matchesTone && matchesSource;
  });

  const getCategoryIcon = (category: string) => {
    const icons = {
      'Communication': MessageSquare,
      'Juridique': Shield,
      'Marketing': Rocket,
      'Développement': Target,
      'Analyse': BarChart3,
      'Vente': TrendingUp,
      'Formation': BookOpen
    };
    return icons[category as keyof typeof icons] || Sparkles;
  };

  const getCategoryGradient = (category: string) => {
    const gradients = {
      'Communication': 'from-blue-500 to-cyan-500',
      'Juridique': 'from-purple-500 to-indigo-500',
      'Marketing': 'from-pink-500 to-rose-500',
      'Développement': 'from-green-500 to-emerald-500',
      'Analyse': 'from-orange-500 to-red-500',
      'Vente': 'from-yellow-500 to-orange-500',
      'Formation': 'from-indigo-500 to-purple-500'
    };
    return gradients[category as keyof typeof gradients] || 'from-gray-500 to-gray-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50/50">
      {/* Header épuré */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-gray-100/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4 md:space-x-6">
              <Button
                variant="ghost"
                onClick={() => onNavigate('home')}
                icon={ArrowLeft}
                className="rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              >
                Retour
              </Button>
              <div className="space-y-1">
                <h1 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">
                  Bibliothèque de Prompts
                </h1>
                <p className="text-gray-600 text-sm md:text-base">
                  Découvrez {allPrompts.length} prompts professionnels prêts à l'emploi
                </p>
              </div>
            </div>
            <Button
              onClick={() => onNavigate('create-prompt')}
              icon={Plus}
              className="rounded-xl bg-gray-900 hover:bg-gray-800 font-semibold w-full md:w-auto"
            >
              Créer un prompt
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
        {/* Filtres de source */}
        <div className="mb-6 md:mb-8">
          <div className="flex flex-wrap gap-2 bg-gray-100 p-1 rounded-2xl w-full md:w-fit">
            <button
              onClick={() => setSelectedSource('all')}
              className={`flex items-center space-x-2 px-4 md:px-6 py-3 rounded-xl text-sm font-semibold transition-all ${
                selectedSource === 'all'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Tous ({allPrompts.length})</span>
            </button>
            <button
              onClick={() => setSelectedSource('personal')}
              className={`flex items-center space-x-2 px-4 md:px-6 py-3 rounded-xl text-sm font-semibold transition-all ${
                selectedSource === 'personal'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Mes prompts ({myPrompts.length})</span>
            </button>
            {user.isPro ? (
              <button
                onClick={() => setSelectedSource('favorites')}
                className={`flex items-center space-x-2 px-4 md:px-6 py-3 rounded-xl text-sm font-semibold transition-all ${
                  selectedSource === 'favorites'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Heart className="w-4 h-4" />
                <span>Favoris ({favoritedPrompts.length})</span>
              </button>
            ) : (
              <div className="flex items-center space-x-2 px-4 md:px-6 py-3 rounded-xl text-sm font-semibold text-gray-400 cursor-not-allowed">
                <Crown className="w-4 h-4" />
                <span>Favoris (PRO)</span>
              </div>
            )}
          </div>
        </div>

        {/* Barre de recherche et filtres épurés */}
        <div className="mb-8 md:mb-12 space-y-6">
          {/* Recherche principale */}
          <div className="relative max-w-2xl">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Rechercher un prompt..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-12 pr-4 py-4 text-base md:text-lg bg-white/60 backdrop-blur-sm border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm hover:shadow-md"
            />
          </div>
          
          {/* Filtres et contrôles */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex flex-col md:flex-row flex-wrap gap-4 w-full md:w-auto">
              <div className="min-w-full md:min-w-48">
                <select
                  value={selectedProfession}
                  onChange={(e) => setSelectedProfession(e.target.value)}
                  className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm font-medium"
                >
                  {professions.map(profession => (
                    <option key={profession} value={profession}>
                      {profession === 'all' ? 'Tous les métiers' : profession}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="min-w-full md:min-w-48">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm font-medium"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'Toutes les catégories' : category}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="min-w-full md:min-w-48">
                <select
                  value={selectedTone}
                  onChange={(e) => setSelectedTone(e.target.value)}
                  className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm font-medium"
                >
                  {tones.map(tone => (
                    <option key={tone} value={tone}>
                      {tone === 'all' ? 'Tous les tons' : tone}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Contrôles d'affichage */}
            <div className="flex items-center justify-between w-full md:w-auto space-x-4">
              <div className="flex items-center space-x-2 bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === 'grid' 
                      ? 'bg-white text-gray-900 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === 'list' 
                      ? 'bg-white text-gray-900 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
              
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <SlidersHorizontal className="w-4 h-4" />
                <span>{filteredPrompts.length} résultat{filteredPrompts.length > 1 ? 's' : ''}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Grille de prompts ultra-épurée */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredPrompts.map((prompt) => {
              const CategoryIcon = getCategoryIcon(prompt.category);
              const categoryGradient = getCategoryGradient(prompt.category);
              
              return (
                <Card key={prompt.id} className="border-0 shadow-sm bg-white/60 backdrop-blur-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02] group cursor-pointer rounded-3xl overflow-hidden">
                  <CardContent className="p-6 md:p-8 space-y-6">
                    {/* Header avec icône et rating */}
                    <div className="flex items-start justify-between">
                      <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-r ${categoryGradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <CategoryIcon className="w-6 h-6 md:w-7 md:h-7 text-white" />
                      </div>
                      <div className="flex items-center space-x-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1 rounded-xl shadow-sm text-sm font-bold">
                        <Star className="w-3 h-3 fill-current" />
                        <span>{prompt.rating || '4.5'}</span>
                      </div>
                    </div>

                    {/* Contenu */}
                    <div className="space-y-4">
                      <h3 className="font-bold text-gray-900 text-lg md:text-xl leading-tight group-hover:text-blue-600 transition-colors tracking-tight">
                        {prompt.title}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
                        {prompt.content}
                      </p>
                    </div>

                    {/* Badges */}
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="primary" size="sm" className="font-semibold rounded-xl">
                        {prompt.profession}
                      </Badge>
                      <Badge variant="secondary" size="sm" className="font-semibold rounded-xl">
                        {prompt.category}
                      </Badge>
                      <Badge variant="default" size="sm" className="font-semibold rounded-xl">
                        {prompt.tone}
                      </Badge>
                      {prompt.isPersonal && (
                        <Badge variant="success" size="sm" className="font-semibold rounded-xl">
                          Personnel
                        </Badge>
                      )}
                      {prompt.isFavorited && (
                        <Badge variant="warning" size="sm" className="font-semibold rounded-xl">
                          Favori
                        </Badge>
                      )}
                    </div>

                    {/* Footer avec stats et action */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Users className="w-4 h-4" />
                        <span>{prompt.usageCount || 0} utilisations</span>
                      </div>
                      <Button
                        onClick={() => onSelectPrompt(prompt)}
                        size="sm"
                        className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 rounded-xl font-semibold bg-gray-900 hover:bg-gray-800"
                        icon={Play}
                      >
                        Utiliser
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredPrompts.map((prompt) => {
              const CategoryIcon = getCategoryIcon(prompt.category);
              const categoryGradient = getCategoryGradient(prompt.category);
              
              return (
                <Card key={prompt.id} className="border-0 shadow-sm bg-white/60 backdrop-blur-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.01] group cursor-pointer rounded-2xl overflow-hidden">
                  <CardContent className="p-6 md:p-8">
                    <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-6">
                      <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-r ${categoryGradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                        <CategoryIcon className="w-7 h-7 md:w-8 md:h-8 text-white" />
                      </div>
                      
                      <div className="flex-1 space-y-3">
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-2 md:space-y-0">
                          <h3 className="font-bold text-gray-900 text-lg md:text-xl group-hover:text-blue-600 transition-colors tracking-tight">
                            {prompt.title}
                          </h3>
                          <div className="flex items-center space-x-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1 rounded-xl shadow-sm text-sm font-bold">
                            <Star className="w-3 h-3 fill-current" />
                            <span>{prompt.rating || '4.5'}</span>
                          </div>
                        </div>
                        
                        <p className="text-gray-600 line-clamp-2 leading-relaxed">
                          {prompt.content}
                        </p>
                        
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0">
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="primary" size="sm" className="font-semibold rounded-xl">
                              {prompt.profession}
                            </Badge>
                            <Badge variant="secondary" size="sm" className="font-semibold rounded-xl">
                              {prompt.category}
                            </Badge>
                            <Badge variant="default" size="sm" className="font-semibold rounded-xl">
                              {prompt.tone}
                            </Badge>
                            {prompt.isPersonal && (
                              <Badge variant="success" size="sm" className="font-semibold rounded-xl">
                                Personnel
                              </Badge>
                            )}
                            {prompt.isFavorited && (
                              <Badge variant="warning" size="sm" className="font-semibold rounded-xl">
                                Favori
                              </Badge>
                            )}
                          </div>
                          
                          <div className="flex items-center space-x-6">
                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                              <Users className="w-4 h-4" />
                              <span>{prompt.usageCount || 0}</span>
                            </div>
                            <Button
                              onClick={() => onSelectPrompt(prompt)}
                              size="sm"
                              className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 rounded-xl font-semibold bg-gray-900 hover:bg-gray-800"
                              icon={Play}
                            >
                              Utiliser
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* État vide épuré */}
        {filteredPrompts.length === 0 && (
          <div className="text-center py-16 md:py-24">
            <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-6 md:mb-8 bg-gray-100 rounded-3xl flex items-center justify-center">
              <Search className="w-10 h-10 md:w-12 md:h-12 text-gray-400" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 tracking-tight">
              Aucun prompt trouvé
            </h3>
            <p className="text-gray-600 mb-6 md:mb-8 max-w-md mx-auto">
              Essayez de modifier vos critères de recherche ou créez votre propre prompt personnalisé
            </p>
            <Button
              onClick={() => onNavigate('create-prompt')}
              icon={Plus}
              className="rounded-xl bg-gray-900 hover:bg-gray-800 font-semibold"
            >
              Créer un prompt personnalisé
            </Button>
          </div>
        )}

        {/* Banner d'upgrade pour les utilisateurs gratuits */}
        {!user.isPro && selectedSource === 'favorites' && (
          <div className="mt-12 md:mt-16 bg-gradient-to-r from-gray-900 via-gray-800 to-black rounded-3xl p-8 md:p-12 text-white text-center">
            <div className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-6 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <Crown className="w-7 h-7 md:w-8 md:h-8 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-black mb-4 tracking-tight">
              Fonctionnalité PRO
            </h2>
            <p className="text-gray-300 mb-6 md:mb-8 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
              Sauvegardez vos prompts favoris et accédez-y rapidement depuis votre bibliothèque personnalisée
            </p>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => onNavigate('account')}
              className="rounded-2xl font-bold bg-white text-gray-900 hover:bg-gray-100 px-8 md:px-10 py-3 md:py-4 text-base md:text-lg"
            >
              Passer à PRO maintenant
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}