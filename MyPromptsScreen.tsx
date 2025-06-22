import React, { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { ArrowLeft, Search, Plus, Play, Edit, Trash2, Calendar, Clock } from 'lucide-react';
import { Prompt, PromptExecution } from '../types';

interface MyPromptsScreenProps {
  onNavigate: (screen: string) => void;
}

export function MyPromptsScreen({ onNavigate }: MyPromptsScreenProps) {
  const [activeTab, setActiveTab] = useState<'prompts' | 'history'>('prompts');
  const [searchTerm, setSearchTerm] = useState('');

  const myPrompts: Prompt[] = [
    {
      id: 'p1',
      title: 'Email de suivi personnalisé',
      content: 'Rédigez un email de suivi pour {{nom_client}} concernant {{sujet}}...',
      profession: 'Commercial',
      category: 'Communication',
      tone: 'Professionnel',
      variables: [],
      isPersonal: true,
      usageCount: 15,
      createdAt: new Date('2024-01-15')
    },
    {
      id: 'p2',
      title: 'Rapport mensuel RH',
      content: 'Créez un rapport mensuel sur {{indicateurs}} pour la période {{mois}}...',
      profession: 'Responsable RH',
      category: 'Analyse',
      tone: 'Formel',
      variables: [],
      isPersonal: true,
      usageCount: 8,
      createdAt: new Date('2024-01-10')
    },
    {
      id: 'p3',
      title: 'Proposition commerciale',
      content: 'Rédigez une proposition pour {{prospect}} incluant {{services}}...',
      profession: 'Commercial',
      category: 'Vente',
      tone: 'Persuasif',
      variables: [],
      isPersonal: true,
      usageCount: 22,
      createdAt: new Date('2024-01-05')
    }
  ];

  const executionHistory: PromptExecution[] = [
    {
      id: 'e1',
      promptId: 'p1',
      variables: { nom_client: 'Entreprise ABC', sujet: 'Projet web' },
      result: 'Email généré pour le suivi du projet web avec Entreprise ABC...',
      createdAt: new Date('2024-01-20')
    },
    {
      id: 'e2',
      promptId: 'p2',
      variables: { indicateurs: 'Recrutement, Formation', mois: 'Janvier 2024' },
      result: 'Rapport mensuel RH pour janvier 2024 comprenant les indicateurs...',
      createdAt: new Date('2024-01-18')
    },
    {
      id: 'e3',
      promptId: 'p3',
      variables: { prospect: 'Startup XYZ', services: 'Développement mobile' },
      result: 'Proposition commerciale pour Startup XYZ concernant le développement...',
      createdAt: new Date('2024-01-16')
    },
    {
      id: 'e4',
      promptId: 'p1',
      variables: { nom_client: 'Client DEF', sujet: 'Maintenance' },
      result: 'Email de suivi pour Client DEF concernant la maintenance...',
      createdAt: new Date('2024-01-14')
    },
    {
      id: 'e5',
      promptId: 'p3',
      variables: { prospect: 'PME GHI', services: 'Audit sécurité' },
      result: 'Proposition d\'audit sécurité pour PME GHI incluant...',
      createdAt: new Date('2024-01-12')
    }
  ];

  const filteredPrompts = myPrompts.filter(prompt =>
    prompt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prompt.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredHistory = executionHistory.filter(execution => {
    const prompt = myPrompts.find(p => p.id === execution.promptId);
    return prompt?.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
           execution.result.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50/50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-gray-100/50 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-6">
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
                  Mon Espace Personnel
                </h1>
                <p className="text-gray-600">
                  Gérez vos prompts et consultez votre historique
                </p>
              </div>
            </div>
            <Button
              onClick={() => onNavigate('create-prompt')}
              icon={Plus}
              className="rounded-xl bg-gray-900 hover:bg-gray-800 font-semibold w-full md:w-auto"
            >
              Nouveau prompt
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8 md:py-12">
        {/* Tabs */}
        <div className="flex space-x-2 bg-gray-100 p-1 rounded-2xl mb-8 md:mb-12 w-full md:w-fit">
          <button
            onClick={() => setActiveTab('prompts')}
            className={`px-4 md:px-6 py-3 rounded-xl text-sm font-semibold transition-all ${
              activeTab === 'prompts'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Mes Prompts ({myPrompts.length})
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-4 md:px-6 py-3 rounded-xl text-sm font-semibold transition-all ${
              activeTab === 'history'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Historique ({executionHistory.length})
          </button>
        </div>

        {/* Search */}
        <div className="mb-6 md:mb-8">
          <div className="relative max-w-2xl">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-12 pr-4 py-4 text-base md:text-lg bg-white/60 backdrop-blur-sm border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm hover:shadow-md"
            />
          </div>
        </div>

        {/* Content */}
        {activeTab === 'prompts' ? (
          <div className="space-y-6">
            {filteredPrompts.length === 0 ? (
              <div className="text-center py-16 md:py-24">
                <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-6 md:mb-8 bg-gray-100 rounded-3xl flex items-center justify-center">
                  <Plus className="w-10 h-10 md:w-12 md:h-12 text-gray-400" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 tracking-tight">
                  {searchTerm ? 'Aucun prompt trouvé' : 'Aucun prompt personnel'}
                </h3>
                <p className="text-gray-600 mb-6 md:mb-8 max-w-md mx-auto">
                  {searchTerm 
                    ? 'Essayez de modifier votre recherche'
                    : 'Créez votre premier prompt personnalisé pour commencer'
                  }
                </p>
                {!searchTerm && (
                  <Button
                    onClick={() => onNavigate('create-prompt')}
                    icon={Plus}
                    className="rounded-xl bg-gray-900 hover:bg-gray-800 font-semibold"
                  >
                    Créer mon premier prompt
                  </Button>
                )}
              </div>
            ) : (
              filteredPrompts.map((prompt) => (
                <Card key={prompt.id} className="border-0 shadow-sm bg-white/60 backdrop-blur-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.01] group cursor-pointer rounded-3xl overflow-hidden">
                  <CardContent className="p-6 md:p-8">
                    <div className="flex flex-col md:flex-row items-start justify-between space-y-4 md:space-y-0">
                      <div className="flex-1 space-y-4">
                        <div>
                          <h3 className="font-bold text-gray-900 text-lg md:text-xl mb-2 group-hover:text-blue-600 transition-colors tracking-tight">
                            {prompt.title}
                          </h3>
                          <p className="text-gray-600 line-clamp-2 leading-relaxed mb-4">
                            {prompt.content}
                          </p>
                          <div className="flex flex-wrap items-center gap-3 md:gap-4">
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
                          </div>
                        </div>
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0">
                          <div className="flex flex-wrap gap-3">
                            <Button
                              onClick={() => onNavigate('execute-prompt')}
                              icon={Play}
                              size="sm"
                              className="rounded-xl font-semibold bg-gray-900 hover:bg-gray-800"
                            >
                              Utiliser
                            </Button>
                            <Button
                              onClick={() => onNavigate('create-prompt')}
                              icon={Edit}
                              variant="outline"
                              size="sm"
                              className="rounded-xl font-semibold"
                            >
                              Modifier
                            </Button>
                            <Button
                              icon={Trash2}
                              variant="ghost"
                              size="sm"
                              className="text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl"
                            >
                              Supprimer
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div className="flex md:flex-col items-center md:items-end space-x-4 md:space-x-0 md:space-y-2 md:ml-8">
                        <div className="text-sm text-gray-500">
                          {prompt.usageCount} utilisations
                        </div>
                        <div className="text-xs text-gray-400">
                          Créé le {formatDate(prompt.createdAt)}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {filteredHistory.length === 0 ? (
              <div className="text-center py-16 md:py-24">
                <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-6 md:mb-8 bg-gray-100 rounded-3xl flex items-center justify-center">
                  <Clock className="w-10 h-10 md:w-12 md:h-12 text-gray-400" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 tracking-tight">
                  {searchTerm ? 'Aucun résultat dans l\'historique' : 'Aucun historique'}
                </h3>
                <p className="text-gray-600">
                  {searchTerm 
                    ? 'Essayez de modifier votre recherche'
                    : 'Vos générations de contenu apparaîtront ici'
                  }
                </p>
              </div>
            ) : (
              filteredHistory.map((execution) => {
                const prompt = myPrompts.find(p => p.id === execution.promptId);
                return (
                  <Card key={execution.id} className="border-0 shadow-sm bg-white/60 backdrop-blur-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.01] group cursor-pointer rounded-3xl overflow-hidden">
                    <CardContent className="p-6 md:p-8">
                      <div className="space-y-6">
                        <div className="flex flex-col md:flex-row items-start justify-between space-y-4 md:space-y-0">
                          <div className="flex-1">
                            <h3 className="font-bold text-gray-900 text-lg md:text-xl mb-2 group-hover:text-blue-600 transition-colors tracking-tight">
                              {prompt?.title}
                            </h3>
                            <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
                              <Calendar className="w-4 h-4" />
                              <span>{formatDate(execution.createdAt)}</span>
                            </div>
                            <div className="text-sm text-gray-600 mb-4">
                              <strong>Variables utilisées :</strong>
                              <div className="mt-2 flex flex-wrap gap-2">
                                {Object.entries(execution.variables).map(([key, value]) => (
                                  <span key={key} className="bg-gray-100 px-3 py-1 rounded-xl text-xs font-medium">
                                    {key}: {value}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="bg-gray-50 p-4 md:p-6 rounded-2xl">
                          <p className="text-sm text-gray-700 line-clamp-3 leading-relaxed">
                            {execution.result}
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-3">
                          <Button
                            onClick={() => onNavigate('execute-prompt')}
                            icon={Play}
                            size="sm"
                            variant="outline"
                            className="rounded-xl font-semibold"
                          >
                            Réutiliser
                          </Button>
                          <Button
                            icon={Edit}
                            size="sm"
                            variant="outline"
                            className="rounded-xl font-semibold"
                          >
                            Voir le détail
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
}