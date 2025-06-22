import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardHeader, CardContent, CardFooter } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { ArrowLeft, Save, Play, Zap, AlertCircle, Globe, Lock, Crown } from 'lucide-react';
import { Variable, User } from '../types';

interface CreatePromptScreenProps {
  onNavigate: (screen: string) => void;
  user: User;
}

export function CreatePromptScreen({ onNavigate, user }: CreatePromptScreenProps) {
  const [title, setTitle] = useState('');
  const [profession, setProfession] = useState(user.profession);
  const [content, setContent] = useState('');
  const [detectedVariables, setDetectedVariables] = useState<Variable[]>([]);
  const [testResult, setTestResult] = useState('');
  const [isTestLoading, setIsTestLoading] = useState(false);
  const [publishToCommunity, setPublishToCommunity] = useState(!user.isPro); // Forcé à true pour les utilisateurs gratuits

  // Auto-detect variables in the prompt content
  useEffect(() => {
    const variableRegex = /\{\{([^}]+)\}\}/g;
    const matches = Array.from(content.matchAll(variableRegex));
    const uniqueVariables = [...new Set(matches.map(match => match[1].trim()))];
    
    const newVariables: Variable[] = uniqueVariables.map(varName => {
      const existing = detectedVariables.find(v => v.name === varName);
      return existing || {
        name: varName,
        example: '',
        defaultValue: '',
        required: true
      };
    });
    
    setDetectedVariables(newVariables);
  }, [content]);

  const updateVariable = (index: number, field: keyof Variable, value: string | boolean) => {
    setDetectedVariables(prev => prev.map((variable, i) => 
      i === index ? { ...variable, [field]: value } : variable
    ));
  };

  const handleTest = async () => {
    setIsTestLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate AI response
    let testPrompt = content;
    detectedVariables.forEach(variable => {
      const value = variable.example || variable.defaultValue || `[${variable.name}]`;
      testPrompt = testPrompt.replace(new RegExp(`\\{\\{${variable.name}\\}\\}`, 'g'), value);
    });
    
    setTestResult(`Voici un exemple de résultat basé sur votre prompt :\n\n${testPrompt}\n\nCe prompt semble bien structuré et devrait produire des résultats cohérents. N'hésitez pas à l'ajuster selon vos besoins spécifiques.`);
    setIsTestLoading(false);
  };

  const handleSave = () => {
    // Simulate saving
    const message = publishToCommunity 
      ? 'Prompt sauvegardé et publié dans la communauté avec succès !' 
      : 'Prompt sauvegardé en privé avec succès !';
    alert(message);
    onNavigate('my-prompts');
  };

  const professions = [
    'Responsable RH',
    'Avocat',
    'Responsable Marketing', 
    'Coach professionnel',
    'Consultant métier',
    'Commercial',
    'Manager',
    'Autre'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50/50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-gray-100/50 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-6">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
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
                Créer un Prompt Personnalisé
              </h1>
              <p className="text-gray-600">
                Concevez votre propre assistant IA sur mesure
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6 md:space-y-8">
            <Card className="border-0 shadow-sm bg-white/60 backdrop-blur-sm rounded-3xl">
              <CardHeader className="p-6 md:p-8 pb-4 md:pb-6">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">
                  Informations générales
                </h2>
              </CardHeader>
              <CardContent className="p-6 md:p-8 pt-0 space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Titre du prompt <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Email de suivi client personnalisé"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Métier <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={profession}
                    onChange={(e) => setProfession(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Sélectionnez votre métier</option>
                    {professions.map(prof => (
                      <option key={prof} value={prof}>{prof}</option>
                    ))}
                  </select>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm bg-white/60 backdrop-blur-sm rounded-3xl">
              <CardHeader className="p-6 md:p-8 pb-4 md:pb-6">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">
                  Contenu du prompt
                </h2>
                <p className="text-gray-600">
                  Utilisez la syntaxe <code className="bg-gray-100 px-2 py-1 rounded text-sm">{'{{variable}}'}</code> pour créer des champs dynamiques
                </p>
              </CardHeader>
              <CardContent className="p-6 md:p-8 pt-0">
                <textarea
                  placeholder="Ex: Rédigez un email de suivi pour {{nom_client}} concernant {{sujet_discussion}}. Le ton doit être {{ton_souhaite}} et inclure {{elements_specifiques}}."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={8}
                  className="w-full p-4 md:p-6 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                />
              </CardContent>
            </Card>

            {detectedVariables.length > 0 && (
              <Card className="border-0 shadow-sm bg-white/60 backdrop-blur-sm rounded-3xl">
                <CardHeader className="p-6 md:p-8 pb-4 md:pb-6">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">
                    Variables détectées ({detectedVariables.length})
                  </h2>
                  <p className="text-gray-600">
                    Configurez les variables pour améliorer l'expérience utilisateur
                  </p>
                </CardHeader>
                <CardContent className="p-6 md:p-8 pt-0 space-y-6">
                  {detectedVariables.map((variable, index) => (
                    <div key={index} className="border border-gray-200 rounded-2xl p-4 md:p-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <Badge variant="primary" size="sm" className="font-semibold rounded-xl">
                          {variable.name}
                        </Badge>
                        <label className="flex items-center space-x-2 text-sm">
                          <input
                            type="checkbox"
                            checked={variable.required}
                            onChange={(e) => updateVariable(index, 'required', e.target.checked)}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="font-medium">Obligatoire</span>
                        </label>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">Exemple</label>
                          <input
                            type="text"
                            placeholder="Ex: Jean Dupont"
                            value={variable.example}
                            onChange={(e) => updateVariable(index, 'example', e.target.value)}
                            className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">Valeur par défaut</label>
                          <input
                            type="text"
                            placeholder="Valeur optionnelle"
                            value={variable.defaultValue}
                            onChange={(e) => updateVariable(index, 'defaultValue', e.target.value)}
                            className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Section de publication */}
            <Card className="border-0 shadow-sm bg-white/60 backdrop-blur-sm rounded-3xl">
              <CardHeader className="p-6 md:p-8 pb-4 md:pb-6">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">
                  Publication
                </h2>
                <p className="text-gray-600">
                  Choisissez la visibilité de votre prompt
                </p>
              </CardHeader>
              <CardContent className="p-6 md:p-8 pt-0">
                {user.isPro ? (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => setPublishToCommunity(false)}>
                      <input
                        type="radio"
                        name="visibility"
                        checked={!publishToCommunity}
                        onChange={() => setPublishToCommunity(false)}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <Lock className="w-5 h-5 text-gray-600" />
                          <span className="font-semibold text-gray-900">Privé</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          Seul vous pouvez voir et utiliser ce prompt
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => setPublishToCommunity(true)}>
                      <input
                        type="radio"
                        name="visibility"
                        checked={publishToCommunity}
                        onChange={() => setPublishToCommunity(true)}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <Globe className="w-5 h-5 text-blue-600" />
                          <span className="font-semibold text-gray-900">Public</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          Partagez avec la communauté Promptly
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 md:p-6 bg-orange-50 border border-orange-200 rounded-xl">
                    <div className="flex items-start space-x-3">
                      <Crown className="w-6 h-6 text-orange-600 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-orange-900 mb-2">
                          Publication automatique
                        </h3>
                        <p className="text-orange-800 text-sm leading-relaxed">
                          Avec votre plan gratuit, tous les prompts créés sont automatiquement partagés avec la communauté. 
                          Passez à PRO pour créer des prompts privés.
                        </p>
                        <Button
                          onClick={() => onNavigate('account')}
                          variant="secondary"
                          size="sm"
                          className="mt-4 rounded-xl font-semibold bg-orange-600 hover:bg-orange-700 text-white border-0"
                        >
                          Découvrir PRO
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6 md:space-y-8">
            <Card className="border-0 shadow-sm bg-white/60 backdrop-blur-sm rounded-3xl">
              <CardHeader className="p-6 md:p-8 pb-4 md:pb-6">
                <h3 className="text-lg md:text-xl font-bold text-gray-900 tracking-tight">
                  Actions
                </h3>
              </CardHeader>
              <CardContent className="p-6 md:p-8 pt-0 space-y-4">
                <Button
                  onClick={handleTest}
                  disabled={!content.trim() || isTestLoading}
                  loading={isTestLoading}
                  icon={Play}
                  variant="outline"
                  className="w-full rounded-xl font-semibold"
                >
                  Tester ce prompt
                </Button>
                
                <Button
                  onClick={handleSave}
                  disabled={!title.trim() || !content.trim() || !profession}
                  icon={Save}
                  className="w-full rounded-xl font-semibold bg-gray-900 hover:bg-gray-800"
                >
                  Enregistrer le prompt
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm bg-white/60 backdrop-blur-sm rounded-3xl">
              <CardHeader className="p-6 md:p-8 pb-4 md:pb-6">
                <h3 className="text-lg md:text-xl font-bold text-gray-900 tracking-tight">
                  Conseils
                </h3>
              </CardHeader>
              <CardContent className="p-6 md:p-8 pt-0 space-y-4 text-sm text-gray-600">
                <div className="flex items-start space-x-3">
                  <Zap className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-gray-900">Variables dynamiques :</strong> Utilisez {'{{nom_variable}}'} pour créer des champs personnalisables
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-gray-900">Contexte :</strong> Plus votre prompt est précis, meilleurs seront les résultats de l'IA
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Save className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-gray-900">Test :</strong> Testez toujours votre prompt avant de l'enregistrer
                  </div>
                </div>
              </CardContent>
            </Card>

            {testResult && (
              <Card className="border-0 shadow-sm bg-white/60 backdrop-blur-sm rounded-3xl">
                <CardHeader className="p-6 md:p-8 pb-4 md:pb-6">
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 tracking-tight">
                    Résultat du test
                  </h3>
                </CardHeader>
                <CardContent className="p-6 md:p-8 pt-0">
                  <div className="bg-gray-50 p-4 md:p-6 rounded-2xl text-sm">
                    <pre className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                      {testResult}
                    </pre>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}