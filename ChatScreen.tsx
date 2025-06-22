import React, { useState, useRef, useEffect } from 'react';
import { Button } from '../components/ui/Button';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { ArrowLeft, Send, Mic, MicOff, Copy, Download, FileText, Save, Star, Plus, Sparkles, Bot, User, Crown, Zap, MessageSquare, Folder, ChevronRight, Search, Filter, Play, Pause, Volume2, MoreHorizontal, Trash2, Edit3, Share2, BookOpen, Target, Shield, Rocket, BarChart3, Users, Mail, Calendar, Briefcase, Settings, Clock, CheckCircle, AlertCircle, Loader, ChevronLeft, Grid3X3, List, SlidersHorizontal, Workflow, Layers, Database, Command, Maximize2, Minimize2 } from 'lucide-react';
import { User as UserType } from '../src/types';

interface ChatScreenProps {
  user: UserType;
  onNavigate: (screen: string) => void;
}

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isVoice?: boolean;
  flowUsed?: string;
  actions?: string[];
}

interface PromptlyFlow {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: any;
  prompt: string;
  variables: string[];
  usageCount: number;
  isPersonal?: boolean;
  gradient: string;
  bgGradient: string;
}

export function ChatScreen({ user, onNavigate }: ChatScreenProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: `Bonjour ${user.name.split(' ')[0]} ! 👋\n\nJe suis votre assistant IA personnel Promptly, spécialisé en **${user.profession}**.\n\n✨ **Mes capacités :**\n• Conversation naturelle adaptée à votre métier\n• Commande vocale intelligente\n• Accès à vos Promptly Flows personnalisés\n• Exécution automatique de vos workflows\n\n🚀 **Pour commencer :**\nSélectionnez un Flow dans la sidebar ou décrivez-moi simplement votre besoin !\n\nComment puis-je vous accompagner aujourd'hui ?`,
      timestamp: new Date(),
      actions: ['copy', 'save']
    }
  ]);
  
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedFlow, setSelectedFlow] = useState<string | null>(null);
  const [searchFlow, setSearchFlow] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const flowsContainerRef = useRef<HTMLDivElement>(null);

  const promptlyFlows: PromptlyFlow[] = [
    // Flows RH
    {
      id: 'rh-1',
      name: 'Réponse Candidature Pro',
      description: 'Rédigez des emails de réponse professionnels aux candidatures',
      category: 'RH',
      icon: Mail,
      prompt: 'Rédigez un email professionnel pour répondre à {{candidat}} concernant sa candidature pour le poste de {{poste}}. Statut: {{statut}}. Ton: {{ton}}.',
      variables: ['candidat', 'poste', 'statut', 'ton'],
      usageCount: 245,
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50/80 to-cyan-50/80'
    },
    {
      id: 'rh-2',
      name: 'Fiche de Poste Expert',
      description: 'Créez des fiches de poste détaillées et attractives',
      category: 'RH',
      icon: Briefcase,
      prompt: 'Créez une fiche de poste complète pour {{titre_poste}} dans le secteur {{secteur}}. Incluez: missions, profil recherché, compétences.',
      variables: ['titre_poste', 'secteur'],
      usageCount: 189,
      gradient: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-50/80 to-emerald-50/80'
    },
    {
      id: 'rh-3',
      name: 'Entretien Annuel 360°',
      description: 'Préparez des entretiens d\'évaluation complets',
      category: 'RH',
      icon: Users,
      prompt: 'Préparez un guide d\'entretien annuel pour {{nom_employe}}, poste {{poste}}, objectifs {{objectifs}}.',
      variables: ['nom_employe', 'poste', 'objectifs'],
      usageCount: 156,
      gradient: 'from-purple-500 to-indigo-500',
      bgGradient: 'from-purple-50/80 to-indigo-50/80'
    },

    // Flows Juridique
    {
      id: 'juridique-1',
      name: 'Contrat Prestation Pro',
      description: 'Rédigez des contrats de prestation sécurisés',
      category: 'Juridique',
      icon: Shield,
      prompt: 'Rédigez un contrat de prestation entre {{client}} et {{prestataire}} pour {{service}}. Durée: {{duree}}.',
      variables: ['client', 'prestataire', 'service', 'duree'],
      usageCount: 312,
      gradient: 'from-red-500 to-pink-500',
      bgGradient: 'from-red-50/80 to-pink-50/80'
    },
    {
      id: 'juridique-2',
      name: 'Mise en Demeure Express',
      description: 'Rédigez des mises en demeure efficaces',
      category: 'Juridique',
      icon: AlertCircle,
      prompt: 'Rédigez une mise en demeure pour {{debiteur}} concernant {{objet}}. Montant: {{montant}}.',
      variables: ['debiteur', 'objet', 'montant'],
      usageCount: 98,
      gradient: 'from-orange-500 to-red-500',
      bgGradient: 'from-orange-50/80 to-red-50/80'
    },

    // Flows Marketing
    {
      id: 'marketing-1',
      name: 'Stratégie Contenu 360°',
      description: 'Créez des stratégies de contenu performantes',
      category: 'Marketing',
      icon: Rocket,
      prompt: 'Créez une stratégie de contenu pour {{marque}} sur {{plateforme}}. Cible: {{cible}}. Objectif: {{objectif}}.',
      variables: ['marque', 'plateforme', 'cible', 'objectif'],
      usageCount: 423,
      gradient: 'from-pink-500 to-rose-500',
      bgGradient: 'from-pink-50/80 to-rose-50/80'
    },
    {
      id: 'marketing-2',
      name: 'Email Marketing Pro',
      description: 'Rédigez des campagnes email qui convertissent',
      category: 'Marketing',
      icon: Mail,
      prompt: 'Créez un email marketing pour {{produit}}. Audience: {{audience}}. CTA: {{cta}}.',
      variables: ['produit', 'audience', 'cta'],
      usageCount: 267,
      gradient: 'from-yellow-500 to-orange-500',
      bgGradient: 'from-yellow-50/80 to-orange-50/80'
    },

    // Flows Analyse
    {
      id: 'analyse-1',
      name: 'Rapport Performance Pro',
      description: 'Analysez et présentez vos performances',
      category: 'Analyse',
      icon: BarChart3,
      prompt: 'Analysez les performances de {{periode}} pour {{departement}}. KPIs: {{kpis}}.',
      variables: ['periode', 'departement', 'kpis'],
      usageCount: 178,
      gradient: 'from-indigo-500 to-purple-500',
      bgGradient: 'from-indigo-50/80 to-purple-50/80'
    },

    // Mes Promptly Flows personnels
    {
      id: 'perso-1',
      name: 'Mon Flow Coaching',
      description: 'Assistant coaching personnalisé pour mes clients',
      category: 'Mes Promptly Flows',
      icon: Target,
      prompt: 'En tant que coach, aidez {{client}} avec {{problematique}}. Approche: {{approche}}.',
      variables: ['client', 'problematique', 'approche'],
      usageCount: 45,
      isPersonal: true,
      gradient: 'from-teal-500 to-cyan-500',
      bgGradient: 'from-teal-50/80 to-cyan-50/80'
    },
    {
      id: 'perso-2',
      name: 'Mon Flow Suivi Client',
      description: 'Workflow personnalisé pour le suivi client',
      category: 'Mes Promptly Flows',
      icon: Users,
      prompt: 'Créez un suivi personnalisé pour {{client}} concernant {{projet}}. Statut: {{statut}}.',
      variables: ['client', 'projet', 'statut'],
      usageCount: 23,
      isPersonal: true,
      gradient: 'from-emerald-500 to-teal-500',
      bgGradient: 'from-emerald-50/80 to-teal-50/80'
    }
  ];

  const categories = ['all', 'RH', 'Juridique', 'Marketing', 'Analyse', 'Mes Promptly Flows'];

  const filteredFlows = promptlyFlows.filter(flow => {
    const matchesSearch = flow.name.toLowerCase().includes(searchFlow.toLowerCase()) ||
                         flow.description.toLowerCase().includes(searchFlow.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || flow.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: generateAIResponse(inputText),
        timestamp: new Date(),
        flowUsed: selectedFlow ? promptlyFlows.find(f => f.id === selectedFlow)?.name : undefined,
        actions: ['copy', 'save', 'export']
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  const generateAIResponse = (input: string): string => {
    if (selectedFlow) {
      const flow = promptlyFlows.find(f => f.id === selectedFlow);
      return `✨ **${flow?.name}** exécuté avec succès !\n\nBasé sur votre demande "${input}", voici le résultat généré :\n\n---\n\n**📧 Email de réponse à candidature**\n\n**Objet :** Réponse à votre candidature - Poste de Graphiste\n\nBonjour Alice Dupont,\n\nJe vous remercie pour l'intérêt que vous portez à notre entreprise et pour votre candidature au poste de **Graphiste**.\n\nSuite à notre entretien du **14 juin**, nous avons été impressionnés par votre profil et vos compétences créatives. Cependant, après mûre réflexion, nous avons décidé de poursuivre avec un autre candidat dont le profil correspond davantage à nos besoins actuels.\n\nNous conservons votre candidature dans notre base de données et n'hésiterons pas à vous recontacter si un poste correspondant à votre profil se libère.\n\nJe vous souhaite plein succès dans vos recherches.\n\n**Cordialement,**\n[Votre nom]\nService Ressources Humaines\n\n---\n\n✅ **Actions disponibles :** Copier, Exporter PDF, Sauvegarder comme modèle, Partager`;
    }

    // Réponse générale intelligente
    const responses = [
      `Je comprends parfaitement votre demande concernant "${input}". \n\n🎯 **Analyse de votre besoin :**\nPour cette tâche spécifique à votre métier de ${user.profession}, je vous recommande d'utiliser le **Flow "Réponse Candidature Pro"** qui est parfaitement adapté.\n\n🚀 **Workflow suggéré :**\n1. **Sélectionnez** le Flow recommandé dans la sidebar\n2. **Renseignez** les informations du candidat\n3. **Laissez-moi** générer le contenu professionnel\n4. **Personnalisez** si nécessaire\n\nSouhaitez-vous que je lance ce Flow pour vous ?`,
      
      `Excellente question ! Pour "${input}", voici mon analyse :\n\n💡 **Solutions Promptly disponibles :**\n• **Flow spécialisé** de votre bibliothèque métier\n• **Création** d'un nouveau Flow personnalisé\n• **Adaptation** d'un modèle existant\n• **Workflow hybride** combinant plusieurs Flows\n\n🎨 **Recommandation personnalisée :**\nBasé sur votre profil ${user.profession}, je suggère une approche en 3 étapes...\n\nQuelle option préférez-vous explorer ?`,
      
      `Parfait ! Je traite votre demande "${input}" avec l'expertise ${user.profession}.\n\n⚡ **Traitement intelligent en cours...**\n\n🧠 **Analyse contextuelle :**\n• Métier détecté : ${user.profession}\n• Type de tâche : Communication professionnelle\n• Niveau de formalisme : Élevé\n• Urgence : Standard\n\n📋 **Contenu généré :**\n[Résultat personnalisé et structuré pour votre demande spécifique]\n\n✨ **Optimisations suggérées :**\n• Ton adapté à votre secteur\n• Terminologie métier appropriée\n• Structure professionnelle\n\nCela correspond-il à vos attentes ?`
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleVoiceToggle = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      // Start recording simulation
      setTimeout(() => {
        setIsRecording(false);
        setInputText("Candidat Alice Dupont, poste graphiste, entretien 14 juin, bon feeling mais pas retenue");
      }, 3000);
    }
  };

  const handleFlowSelect = (flowId: string) => {
    setSelectedFlow(flowId);
    const flow = promptlyFlows.find(f => f.id === flowId);
    setInputText(`Utiliser ${flow?.name}: `);
    inputRef.current?.focus();
  };

  const handleMessageAction = (action: string, messageId: string) => {
    const message = messages.find(m => m.id === messageId);
    if (!message) return;

    switch (action) {
      case 'copy':
        navigator.clipboard.writeText(message.content);
        // Feedback visuel
        break;
      case 'save':
        alert('Message sauvegardé dans vos modèles !');
        break;
      case 'export':
        alert('Export PDF en cours...');
        break;
    }
  };

  const getCategoryIcon = (category: string) => {
    const icons = {
      'RH': Users,
      'Juridique': Shield,
      'Marketing': Rocket,
      'Analyse': BarChart3,
      'Mes Promptly Flows': Target
    };
    return icons[category as keyof typeof icons] || Workflow;
  };

  return (
    <div className="h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50/50 flex overflow-hidden">
      {/* Sidebar Flows - Scroll indépendant */}
      <div className="w-96 bg-white/95 backdrop-blur-xl border-r border-gray-100/50 flex flex-col shadow-lg">
        {/* Header Sidebar - Fixe */}
        <div className="p-6 border-b border-gray-100/50 flex-shrink-0">
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Workflow className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-black text-gray-900 tracking-tight">
                Mes Promptly Flows
              </h2>
            </div>
            <p className="text-sm text-gray-600 font-medium">
              {filteredFlows.length} assistants spécialisés
            </p>
          </div>
        </div>

        {/* Search & Filters - Fixe */}
        <div className="p-6 space-y-4 border-b border-gray-100/50 flex-shrink-0">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Rechercher un Flow..."
              value={searchFlow}
              onChange={(e) => setSearchFlow(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50/80 backdrop-blur-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all hover:bg-white"
            />
          </div>
          
          <div className="flex items-center justify-between space-x-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="flex-1 px-4 py-3 bg-gray-50/80 backdrop-blur-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm font-medium transition-all hover:bg-white"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? 'Toutes les catégories' : cat}
                </option>
              ))}
            </select>
            
            <div className="flex items-center space-x-1 bg-gray-100 rounded-xl p-1">
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
            </div>
          </div>
        </div>

        {/* Flows List - Scroll indépendant */}
        <div 
          ref={flowsContainerRef}
          className="flex-1 overflow-y-auto p-6 space-y-4"
          style={{ scrollBehavior: 'smooth' }}
        >
          {viewMode === 'list' ? (
            // Vue Liste
            filteredFlows.map((flow) => {
              const IconComponent = flow.icon;
              return (
                <Card
                  key={flow.id}
                  className={`border-0 shadow-sm bg-white/70 backdrop-blur-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer rounded-2xl overflow-hidden group ${
                    selectedFlow === flow.id ? 'ring-2 ring-blue-500 bg-blue-50/80 shadow-lg' : ''
                  }`}
                  onClick={() => handleFlowSelect(flow.id)}
                >
                  <CardContent className="p-5">
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${flow.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-bold text-gray-900 text-base truncate group-hover:text-blue-600 transition-colors">
                            {flow.name}
                          </h3>
                          {flow.isPersonal && (
                            <Badge variant="success" size="sm" className="text-xs rounded-xl font-bold ml-2">
                              Personnel
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 line-clamp-2 mb-3 leading-relaxed">
                          {flow.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <Badge variant="default" size="sm" className="text-xs rounded-xl font-semibold bg-gray-100 text-gray-700">
                            {flow.category}
                          </Badge>
                          <div className="flex items-center space-x-1 text-xs text-gray-500">
                            <Zap className="w-3 h-3" />
                            <span className="font-medium">{flow.usageCount}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          ) : (
            // Vue Grille
            <div className="grid grid-cols-2 gap-4">
              {filteredFlows.map((flow) => {
                const IconComponent = flow.icon;
                return (
                  <Card
                    key={flow.id}
                    className={`border-0 shadow-sm bg-white/70 backdrop-blur-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.05] cursor-pointer rounded-2xl overflow-hidden group ${
                      selectedFlow === flow.id ? 'ring-2 ring-blue-500 bg-blue-50/80' : ''
                    }`}
                    onClick={() => handleFlowSelect(flow.id)}
                  >
                    <CardContent className="p-4 text-center">
                      <div className={`w-10 h-10 mx-auto mb-3 rounded-xl bg-gradient-to-r ${flow.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="font-bold text-gray-900 text-sm mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {flow.name}
                      </h3>
                      <div className="flex items-center justify-center space-x-1 text-xs text-gray-500">
                        <Zap className="w-3 h-3" />
                        <span>{flow.usageCount}</span>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
          
          {/* Create Custom Flow */}
          <Card className="border-2 border-dashed border-gray-300 hover:border-blue-400 hover:bg-blue-50/30 transition-all cursor-pointer rounded-2xl group">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-gray-100 to-gray-200 group-hover:from-blue-100 group-hover:to-blue-200 rounded-xl flex items-center justify-center transition-all">
                <Plus className="w-6 h-6 text-gray-600 group-hover:text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-700 group-hover:text-blue-700 mb-2 transition-colors">
                Créer un Flow
              </h3>
              <p className="text-sm text-gray-500 group-hover:text-blue-600 transition-colors">
                Assistant personnalisé
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header Chat - Fixe */}
        <div className="bg-white/95 backdrop-blur-xl border-b border-gray-100/50 p-6 shadow-sm flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6 min-w-0">
              <Button
                variant="ghost"
                onClick={() => onNavigate('home')}
                icon={ArrowLeft}
                className="rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all flex-shrink-0"
              >
                Retour
              </Button>
              <div className="space-y-2 min-w-0">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <div className="min-w-0">
                    <h1 className="text-2xl font-black text-gray-900 tracking-tight truncate">
                      Chat IA Promptly
                    </h1>
                    <p className="text-base text-gray-600 font-medium truncate">
                      Assistant IA • {user.profession}
                    </p>
                  </div>
                  <Badge variant="primary" size="md" className="rounded-xl font-bold px-4 py-2 flex-shrink-0">
                    <Crown className="w-4 h-4 mr-2" />
                    PRO
                  </Badge>
                </div>
              </div>
            </div>
            
            {selectedFlow && (
              <div className="flex items-center space-x-3 bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-3 rounded-2xl border border-blue-200">
                <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Workflow className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-bold text-gray-900 truncate max-w-48">
                  {promptlyFlows.find(f => f.id === selectedFlow)?.name}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedFlow(null)}
                  className="w-6 h-6 p-0 text-gray-600 hover:bg-white hover:text-gray-900 rounded-lg"
                >
                  ×
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Messages Area - Scroll indépendant */}
        <div 
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto p-8 space-y-8"
          style={{ scrollBehavior: 'smooth' }}
        >
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-4xl ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                <div className="flex items-start space-x-4">
                  {message.type === 'assistant' && (
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                      <Bot className="w-6 h-6 text-white" />
                    </div>
                  )}
                  
                  <div className={`flex-1 ${message.type === 'user' ? 'text-right' : ''}`}>
                    <div
                      className={`inline-block p-6 rounded-3xl shadow-sm transition-all hover:shadow-md max-w-full ${
                        message.type === 'user'
                          ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white'
                          : 'bg-white/95 backdrop-blur-sm border border-gray-100'
                      }`}
                    >
                      {message.flowUsed && (
                        <div className="mb-4 pb-4 border-b border-blue-200">
                          <div className="flex items-center space-x-3 text-blue-600">
                            <div className="w-5 h-5 bg-blue-100 rounded-lg flex items-center justify-center">
                              <Workflow className="w-3 h-3" />
                            </div>
                            <span className="text-sm font-bold">Flow utilisé: {message.flowUsed}</span>
                          </div>
                        </div>
                      )}
                      
                      <div className={`prose prose-sm max-w-none ${message.type === 'user' ? 'prose-invert' : ''}`}>
                        {message.content.split('\n').map((line, index) => (
                          <p key={index} className="mb-3 last:mb-0 leading-relaxed text-base">
                            {line}
                          </p>
                        ))}
                      </div>
                      
                      {message.isVoice && (
                        <div className="mt-4 flex items-center space-x-2 text-blue-200">
                          <Volume2 className="w-4 h-4" />
                          <span className="text-sm font-medium">Message vocal</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-xs text-gray-500 font-medium">
                        {message.timestamp.toLocaleTimeString('fr-FR', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </span>
                      
                      {message.actions && message.type === 'assistant' && (
                        <div className="flex space-x-2">
                          {message.actions.includes('copy') && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleMessageAction('copy', message.id)}
                              className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl p-2"
                            >
                              <Copy className="w-4 h-4" />
                            </Button>
                          )}
                          {message.actions.includes('save') && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleMessageAction('save', message.id)}
                              className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl p-2"
                            >
                              <Save className="w-4 h-4" />
                            </Button>
                          )}
                          {message.actions.includes('export') && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleMessageAction('export', message.id)}
                              className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl p-2"
                            >
                              <Download className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {message.type === 'user' && (
                    <div className="w-10 h-10 bg-gradient-to-r from-gray-700 to-gray-800 rounded-2xl flex items-center justify-center flex-shrink-0 text-white font-bold text-lg shadow-lg">
                      {user.name.charAt(0)}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div className="bg-white/95 backdrop-blur-sm border border-gray-100 p-6 rounded-3xl shadow-sm">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area - Fixe */}
        <div className="bg-white/95 backdrop-blur-xl border-t border-gray-100/50 p-8 shadow-sm flex-shrink-0">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-end space-x-4">
              <div className="flex-1 relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                  placeholder={selectedFlow ? `Utilisez ${promptlyFlows.find(f => f.id === selectedFlow)?.name}...` : "Décrivez votre besoin ou sélectionnez un Flow..."}
                  className="w-full px-8 py-5 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm text-base resize-none hover:bg-white"
                  disabled={isTyping}
                />
                
                {selectedFlow && (
                  <div className="absolute top-3 right-20 flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-xl border border-blue-200">
                    <Workflow className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-bold text-blue-900">Flow actif</span>
                  </div>
                )}
              </div>
              
              <Button
                onClick={handleVoiceToggle}
                variant={isRecording ? "secondary" : "outline"}
                size="lg"
                className={`rounded-2xl border-gray-200 hover:bg-gray-50 ${isRecording ? 'animate-pulse bg-red-50 border-red-200 text-red-600' : ''} flex-shrink-0`}
                disabled={isTyping}
              >
                {isRecording ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
              </Button>
              
              <Button
                onClick={handleSendMessage}
                disabled={!inputText.trim() || isTyping}
                size="lg"
                className="rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all px-8 flex-shrink-0"
                icon={isTyping ? Loader : Send}
                loading={isTyping}
              >
                Envoyer
              </Button>
            </div>
            
            {isRecording && (
              <div className="mt-6 flex items-center justify-center space-x-4 text-red-600">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-bold">Enregistrement en cours...</span>
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              </div>
            )}
            
            {/* Suggestions rapides */}
            {!selectedFlow && messages.length === 1 && (
              <div className="mt-6 flex flex-wrap gap-3 justify-center">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setInputText("Aide-moi à rédiger un email professionnel")}
                  className="rounded-xl border-gray-200 hover:bg-gray-50 text-gray-700"
                >
                  📧 Email professionnel
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setInputText("Créer un rapport d'analyse")}
                  className="rounded-xl border-gray-200 hover:bg-gray-50 text-gray-700"
                >
                  📊 Rapport d'analyse
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setInputText("Rédiger un contrat")}
                  className="rounded-xl border-gray-200 hover:bg-gray-50 text-gray-700"
                >
                  📋 Contrat
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}