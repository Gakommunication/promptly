import React, { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardHeader, CardContent, CardFooter } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { ArrowLeft, Search, Filter, Star, Heart, MessageCircle, Share, Crown, Zap, Users, TrendingUp, Award, Eye, Bookmark, Play, ChevronDown, Grid3X3, List, SlidersHorizontal, Sparkles, Target, Shield, Rocket, BarChart3, BookOpen, MessageSquare, Verified, Trophy, Flame, Clock, Calendar } from 'lucide-react';
import { Prompt } from '../src/types';

interface CommunityScreenProps {
  onNavigate: (screen: string) => void;
  isPro?: boolean;
}

export function CommunityScreen({ onNavigate, isPro = false }: CommunityScreenProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const communityPrompts: (Prompt & { 
    author: string; 
    likes: number; 
    comments: number; 
    isPremium?: boolean;
    isVerified?: boolean;
    authorAvatar?: string;
    timeAgo?: string;
  })[] = [
    {
      id: 'c1',
      title: 'Template email de négociation salariale',
      content: 'Rédigez un email professionnel pour négocier votre salaire avec {{arguments_cles}} en tenant compte de {{contexte_entreprise}}...',
      profession: 'Responsable RH',
      category: 'Communication',
      tone: 'Professionnel',
      variables: [],
      author: 'Marie Dubois',
      rating: 4.9,
      usageCount: 2450,
      likes: 184,
      comments: 23,
      isVerified: true,
      timeAgo: 'Il y a 2 jours',
      createdAt: new Date('2024-01-18')
    },
    {
      id: 'c2',
      title: 'Audit de conformité RGPD complet',
      content: 'Générez un audit RGPD pour {{type_entreprise}} incluant {{domaines_audit}}...',
      profession: 'Avocat',
      category: 'Juridique',
      tone: 'Formel',
      variables: [],
      author: 'Jean Martin',
      rating: 4.8,
      usageCount: 1890,
      likes: 156,
      comments: 31,
      isPremium: true,
      isVerified: true,
      timeAgo: 'Il y a 4 jours',
      createdAt: new Date('2024-01-16')
    },
    {
      id: 'c3',
      title: 'Stratégie de lancement produit 360°',
      content: 'Créez une stratégie complète pour le lancement de {{nom_produit}} sur {{marche_cible}}...',
      profession: 'Responsable Marketing',
      category: 'Marketing',
      tone: 'Créatif',
      variables: [],
      author: 'Sophie Chen',
      rating: 4.7,
      usageCount: 3200,
      likes: 298,
      comments: 45,
      isPremium: true,
      timeAgo: 'Il y a 1 semaine',
      createdAt: new Date('2024-01-14')
    },
    {
      id: 'c4',
      title: 'Plan de développement personnel 6 mois',
      content: 'Élaborez un plan de développement sur {{duree}} pour développer {{competences_cibles}}...',
      profession: 'Coach professionnel',
      category: 'Développement',
      tone: 'Empathique',
      variables: [],
      author: 'Pierre Rousseau',
      rating: 4.9,
      usageCount: 1650,
      likes: 203,
      comments: 18,
      isVerified: true,
      timeAgo: 'Il y a 3 jours',
      createdAt: new Date('2024-01-12')
    },
    {
      id: 'c5',
      title: 'Analyse concurrentielle détaillée',
      content: 'Analysez la concurrence de {{secteur}} en comparant {{criteres_analyse}}...',
      profession: 'Consultant métier',
      category: 'Analyse',
      tone: 'Professionnel',
      variables: [],
      author: 'Laura Silva',
      rating: 4.6,
      usageCount: 980,
      likes: 87,
      comments: 12,
      timeAgo: 'Il y a 5 jours',
      createdAt: new Date('2024-01-10')
    },
    {
      id: 'c6',
      title: 'Présentation commerciale persuasive',
      content: 'Créez une présentation impactante pour convaincre {{type_client}} d\'acheter {{solution}}...',
      profession: 'Commercial',
      category: 'Vente',
      tone: 'Persuasif',
      variables: [],
      author: 'Thomas Blanc',
      rating: 4.8,
      usageCount: 2100,
      likes: 145,
      comments: 28,
      isPremium: true,
      isVerified: true,
      timeAgo: 'Il y a 6 jours',
      createdAt: new Date('2024-01-08')
    }
  ];

  const professions = ['all', 'Responsable RH', 'Avocat', 'Responsable Marketing', 'Coach professionnel', 'Consultant métier', 'Commercial'];

  const filteredPrompts = communityPrompts.filter(prompt => {
    const matchesSearch = prompt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prompt.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prompt.author.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = selectedFilter === 'all' || prompt.profession === selectedFilter;
    
    return matchesSearch && matchesFilter;
  });

  const sortedPrompts = [...filteredPrompts].sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return b.likes - a.likes;
      case 'rating':
        return (b.rating || 0) - (a.rating || 0);
      case 'recent':
        return b.createdAt.getTime() - a.createdAt.getTime();
      case 'usage':
        return (b.usageCount || 0) - (a.usageCount || 0);
      default:
        return 0;
    }
  });

  const handleLike = (promptId: string) => {
    if (!isPro) {
      alert('Fonctionnalité réservée aux utilisateurs PRO');
      return;
    }
    // Handle like logic
  };

  const handleAddToFavorites = (promptId: string) => {
    if (!isPro) {
      alert('Fonctionnalité réservée aux utilisateurs PRO');
      return;
    }
    // Handle favorites logic
  };

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
        <div className="max-w-7xl mx-auto px-8 py-6">
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
                  Communauté Promptly
                </h1>
                <p className="text-gray-600">
                  Découvrez les prompts créés par notre communauté d'experts
                </p>
              </div>
            </div>
            {!isPro && (
              <div className="text-center space-y-2">
                <Badge variant="secondary" size="md" className="px-4 py-2 rounded-xl font-bold">
                  <Crown className="w-4 h-4 mr-2" />
                  Version PRO requise
                </Badge>
                <Button
                  onClick={() => onNavigate('account')}
                  variant="secondary"
                  size="sm"
                  className="rounded-xl font-semibold"
                >
                  Passer à PRO
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* Statistiques de la communauté */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <Card className="border-0 shadow-sm bg-white/60 backdrop-blur-sm rounded-2xl text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-black text-blue-600 mb-2">{communityPrompts.length}</div>
              <div className="text-sm text-gray-600 font-medium">Prompts partagés</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm bg-white/60 backdrop-blur-sm rounded-2xl text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-black text-green-600 mb-2">
                {communityPrompts.filter(p => p.isVerified).length}
              </div>
              <div className="text-sm text-gray-600 font-medium">Experts vérifiés</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm bg-white/60 backdrop-blur-sm rounded-2xl text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-black text-orange-600 mb-2">
                {communityPrompts.reduce((sum, p) => sum + p.likes, 0)}
              </div>
              <div className="text-sm text-gray-600 font-medium">Likes au total</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm bg-white/60 backdrop-blur-sm rounded-2xl text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-black text-purple-600 mb-2">
                {Math.round(communityPrompts.reduce((sum, p) => sum + (p.usageCount || 0), 0) / 1000)}k
              </div>
              <div className="text-sm text-gray-600 font-medium">Utilisations</div>
            </CardContent>
          </Card>
        </div>

        {/* Barre de recherche et filtres */}
        <div className="mb-12 space-y-6">
          {/* Recherche principale */}
          <div className="relative max-w-2xl">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Rechercher dans la communauté..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-12 pr-4 py-4 text-lg bg-white/60 backdrop-blur-sm border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm hover:shadow-md"
            />
          </div>
          
          {/* Filtres et contrôles */}
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex flex-wrap gap-4">
              <div className="min-w-48">
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm font-medium"
                >
                  {professions.map(profession => (
                    <option key={profession} value={profession}>
                      {profession === 'all' ? 'Tous les métiers' : profession}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="min-w-48">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm font-medium"
                >
                  <option value="popular">Plus populaire</option>
                  <option value="rating">Mieux noté</option>
                  <option value="recent">Plus récent</option>
                  <option value="usage">Plus utilisé</option>
                </select>
              </div>
            </div>

            {/* Contrôles d'affichage */}
            <div className="flex items-center space-x-4">
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
                <span>{sortedPrompts.length} résultat{sortedPrompts.length > 1 ? 's' : ''}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Grille de prompts communautaires */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sortedPrompts.map((prompt) => {
              const CategoryIcon = getCategoryIcon(prompt.category);
              const categoryGradient = getCategoryGradient(prompt.category);
              
              return (
                <Card key={prompt.id} className={`border-0 shadow-sm bg-white/60 backdrop-blur-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02] group cursor-pointer rounded-3xl overflow-hidden ${!isPro && prompt.isPremium ? 'opacity-60' : ''}`}>
                  <CardContent className="p-8 space-y-6">
                    {/* Header avec auteur */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-gray-600 to-gray-700 rounded-xl flex items-center justify-center text-white font-bold text-sm">
                          {prompt.author.charAt(0)}
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-semibold text-gray-900 text-sm">{prompt.author}</span>
                            {prompt.isVerified && (
                              <div className="flex items-center space-x-1 text-blue-600">
                                <Verified className="w-4 h-4 fill-current" />
                              </div>
                            )}
                            {prompt.isPremium && (
                              <Crown className="w-4 h-4 text-orange-500" />
                            )}
                          </div>
                          <div className="text-xs text-gray-500">{prompt.timeAgo}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1 rounded-xl shadow-sm text-sm font-bold">
                        <Star className="w-3 h-3 fill-current" />
                        <span>{prompt.rating}</span>
                      </div>
                    </div>

                    {/* Contenu du prompt */}
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${categoryGradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                          <CategoryIcon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900 text-lg leading-tight group-hover:text-blue-600 transition-colors tracking-tight">
                            {prompt.title}
                          </h3>
                        </div>
                      </div>
                      
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
                    </div>

                    {/* Stats et actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Heart className="w-4 h-4" />
                          <span>{prompt.likes}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageCircle className="w-4 h-4" />
                          <span>{prompt.comments}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Eye className="w-4 h-4" />
                          <span>{prompt.usageCount}</span>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button
                          onClick={() => handleLike(prompt.id)}
                          variant="outline"
                          size="sm"
                          disabled={!isPro && prompt.isPremium}
                          className="rounded-xl border-gray-200 text-gray-600 hover:text-red-600 hover:border-red-200 hover:bg-red-50"
                        >
                          <Heart className="w-4 h-4" />
                        </Button>
                        <Button
                          onClick={() => handleAddToFavorites(prompt.id)}
                          variant="outline"
                          size="sm"
                          disabled={!isPro}
                          className="rounded-xl border-gray-200 text-gray-600 hover:text-yellow-600 hover:border-yellow-200 hover:bg-yellow-50"
                        >
                          <Bookmark className="w-4 h-4" />
                        </Button>
                        <Button
                          onClick={() => onNavigate('execute-prompt')}
                          size="sm"
                          disabled={!isPro && prompt.isPremium}
                          className="rounded-xl font-semibold bg-gray-900 hover:bg-gray-800"
                          icon={Play}
                        >
                          Utiliser
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="space-y-4">
            {sortedPrompts.map((prompt) => {
              const CategoryIcon = getCategoryIcon(prompt.category);
              const categoryGradient = getCategoryGradient(prompt.category);
              
              return (
                <Card key={prompt.id} className={`border-0 shadow-sm bg-white/60 backdrop-blur-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.01] group cursor-pointer rounded-2xl overflow-hidden ${!isPro && prompt.isPremium ? 'opacity-60' : ''}`}>
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-6">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${categoryGradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                        <CategoryIcon className="w-8 h-8 text-white" />
                      </div>
                      
                      <div className="flex-1 space-y-4">
                        <div className="flex items-start justify-between">
                          <div className="space-y-2">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-gradient-to-r from-gray-600 to-gray-700 rounded-lg flex items-center justify-center text-white font-bold text-xs">
                                {prompt.author.charAt(0)}
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className="font-semibold text-gray-900 text-sm">{prompt.author}</span>
                                {prompt.isVerified && (
                                  <Verified className="w-4 h-4 text-blue-600 fill-current" />
                                )}
                                {prompt.isPremium && (
                                  <Crown className="w-4 h-4 text-orange-500" />
                                )}
                                <span className="text-xs text-gray-500">• {prompt.timeAgo}</span>
                              </div>
                            </div>
                            <h3 className="font-bold text-gray-900 text-xl group-hover:text-blue-600 transition-colors tracking-tight">
                              {prompt.title}
                            </h3>
                          </div>
                          <div className="flex items-center space-x-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1 rounded-xl shadow-sm text-sm font-bold">
                            <Star className="w-3 h-3 fill-current" />
                            <span>{prompt.rating}</span>
                          </div>
                        </div>
                        
                        <p className="text-gray-600 line-clamp-2 leading-relaxed">
                          {prompt.content}
                        </p>
                        
                        <div className="flex items-center justify-between">
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
                          </div>
                          
                          <div className="flex items-center space-x-6">
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <div className="flex items-center space-x-1">
                                <Heart className="w-4 h-4" />
                                <span>{prompt.likes}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <MessageCircle className="w-4 h-4" />
                                <span>{prompt.comments}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Eye className="w-4 h-4" />
                                <span>{prompt.usageCount}</span>
                              </div>
                            </div>
                            
                            <div className="flex space-x-2">
                              <Button
                                onClick={() => handleLike(prompt.id)}
                                variant="outline"
                                size="sm"
                                disabled={!isPro && prompt.isPremium}
                                className="rounded-xl border-gray-200 text-gray-600 hover:text-red-600 hover:border-red-200 hover:bg-red-50"
                              >
                                <Heart className="w-4 h-4" />
                              </Button>
                              <Button
                                onClick={() => handleAddToFavorites(prompt.id)}
                                variant="outline"
                                size="sm"
                                disabled={!isPro}
                                className="rounded-xl border-gray-200 text-gray-600 hover:text-yellow-600 hover:border-yellow-200 hover:bg-yellow-50"
                              >
                                <Bookmark className="w-4 h-4" />
                              </Button>
                              <Button
                                onClick={() => onNavigate('execute-prompt')}
                                size="sm"
                                disabled={!isPro && prompt.isPremium}
                                className="rounded-xl font-semibold bg-gray-900 hover:bg-gray-800"
                                icon={Play}
                              >
                                Utiliser
                              </Button>
                            </div>
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

        {/* État vide */}
        {sortedPrompts.length === 0 && (
          <div className="text-center py-24">
            <div className="w-24 h-24 mx-auto mb-8 bg-gray-100 rounded-3xl flex items-center justify-center">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">
              Aucun prompt trouvé
            </h3>
            <p className="text-gray-600">
              Essayez de modifier vos critères de recherche
            </p>
          </div>
        )}

        {/* Banner d'upgrade pour les utilisateurs gratuits */}
        {!isPro && (
          <div className="mt-16 bg-gradient-to-r from-gray-900 via-gray-800 to-black rounded-3xl p-12 text-white text-center">
            <div className="w-16 h-16 mx-auto mb-6 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <Crown className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-black mb-4 tracking-tight">
              Débloquez toute la communauté
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
              Accédez aux prompts premium, ajoutez vos favoris, et participez pleinement à la communauté Promptly
            </p>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => onNavigate('account')}
              className="rounded-2xl font-bold bg-white text-gray-900 hover:bg-gray-100 px-10 py-4 text-lg"
            >
              Passer à PRO maintenant
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}