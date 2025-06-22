import React, { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardHeader, CardContent, CardFooter } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { ArrowLeft, Play, Copy, Download, FileText, Save, CheckCircle } from 'lucide-react';
import { Prompt, Variable } from '../src/types';

interface ExecutePromptScreenProps {
  prompt?: Prompt;
  onNavigate: (screen: string) => void;
}

export function ExecutePromptScreen({ prompt, onNavigate }: ExecutePromptScreenProps) {
  // Mock prompt if none provided
  const currentPrompt: Prompt = prompt || {
    id: '1',
    title: 'Email de réponse candidature',
    content: 'Rédigez un email professionnel pour répondre à {{nom_candidat}} concernant sa candidature pour le poste de {{poste}}. Le ton doit être {{ton}} et inclure les éléments suivants : {{elements_reponse}}.',
    profession: 'Responsable RH',
    category: 'Communication',
    tone: 'Professionnel',
    variables: [
      { name: 'nom_candidat', example: 'Marie Dupont', defaultValue: '', required: true },
      { name: 'poste', example: 'Développeur Frontend', defaultValue: '', required: true },
      { name: 'ton', example: 'Bienveillant', defaultValue: 'Professionnel', required: false },
      { name: 'elements_reponse', example: 'Remerciements, prochaines étapes, contact RH', defaultValue: '', required: true }
    ],
    rating: 4.8,
    usageCount: 1250,
    createdAt: new Date()
  };

  const [variableValues, setVariableValues] = useState<Record<string, string>>(
    currentPrompt.variables.reduce((acc, variable) => ({
      ...acc,
      [variable.name]: variable.defaultValue
    }), {})
  );
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleVariableChange = (variableName: string, value: string) => {
    setVariableValues(prev => ({
      ...prev,
      [variableName]: value
    }));
  };

  const generateFinalPrompt = () => {
    let finalPrompt = currentPrompt.content;
    currentPrompt.variables.forEach(variable => {
      const value = variableValues[variable.name] || variable.defaultValue || `[${variable.name}]`;
      finalPrompt = finalPrompt.replace(new RegExp(`\\{\\{${variable.name}\\}\\}`, 'g'), value);
    });
    return finalPrompt;
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const mockResult = `Objet : Réponse à votre candidature - ${variableValues.poste || 'Poste'}\n\nBonjour ${variableValues.nom_candidat || 'Candidat'},\n\nJe vous remercie pour l'intérêt que vous portez à notre entreprise et pour votre candidature au poste de ${variableValues.poste || 'Poste'}.\n\nAprès avoir examiné votre profil, nous souhaitons vous informer que votre candidature a retenu notre attention. Votre expérience et vos compétences correspondent aux critères que nous recherchons.\n\nNous aimerions vous rencontrer pour un entretien afin d'échanger davantage sur vos motivations et vos expériences. Seriez-vous disponible la semaine prochaine pour un entretien ?\n\nEn attendant votre retour, je reste à votre disposition pour toute question.\n\nCordialement,\n[Votre nom]\nService Ressources Humaines`;
    
    setResult(mockResult);
    setIsGenerating(false);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const canGenerate = currentPrompt.variables
    .filter(v => v.required)
    .every(v => variableValues[v.name]?.trim());

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50/50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-gray-100/50 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-6">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
            <Button
              variant="ghost"
              onClick={() => onNavigate('library')}
              icon={ArrowLeft}
              className="rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            >
              Retour
            </Button>
            <div className="flex-1 space-y-2">
              <h1 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">
                {currentPrompt.title}
              </h1>
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="primary" size="sm" className="font-semibold rounded-xl">
                  {currentPrompt.profession}
                </Badge>
                <Badge variant="secondary" size="sm" className="font-semibold rounded-xl">
                  {currentPrompt.category}
                </Badge>
                <Badge variant="default" size="sm" className="font-semibold rounded-xl">
                  {currentPrompt.tone}
                </Badge>
              </div>
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
                  Remplissez les informations
                </h2>
                <p className="text-gray-600">
                  Complétez les champs pour personnaliser votre contenu
                </p>
              </CardHeader>
              <CardContent className="p-6 md:p-8 pt-0 space-y-6">
                {currentPrompt.variables.map((variable) => (
                  <div key={variable.name} className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      {variable.name.replace(/_/g, ' ')}
                      {variable.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    <input
                      type="text"
                      placeholder={variable.example}
                      value={variableValues[variable.name] || ''}
                      onChange={(e) => handleVariableChange(variable.name, e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            {showPreview && (
              <Card className="border-0 shadow-sm bg-white/60 backdrop-blur-sm rounded-3xl">
                <CardHeader className="p-6 md:p-8 pb-4 md:pb-6">
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 tracking-tight">
                    Aperçu du prompt final
                  </h3>
                </CardHeader>
                <CardContent className="p-6 md:p-8 pt-0">
                  <div className="bg-gray-50 p-4 md:p-6 rounded-2xl">
                    <pre className="whitespace-pre-wrap text-sm text-gray-700 leading-relaxed">
                      {generateFinalPrompt()}
                    </pre>
                  </div>
                </CardContent>
              </Card>
            )}

            {result && (
              <Card className="border-0 shadow-sm bg-white/60 backdrop-blur-sm rounded-3xl">
                <CardHeader className="p-6 md:p-8 pb-4 md:pb-6">
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 tracking-tight">
                    Résultat généré
                  </h3>
                </CardHeader>
                <CardContent className="p-6 md:p-8 pt-0">
                  <div className="bg-white border border-gray-200 p-4 md:p-6 rounded-2xl">
                    <pre className="whitespace-pre-wrap text-sm text-gray-700 leading-relaxed">
                      {result}
                    </pre>
                  </div>
                </CardContent>
                <CardFooter className="p-6 md:p-8 pt-0">
                  <div className="flex flex-wrap gap-3">
                    <Button
                      onClick={handleCopy}
                      icon={copied ? CheckCircle : Copy}
                      variant="outline"
                      size="sm"
                      className="rounded-xl font-semibold"
                    >
                      {copied ? 'Copié !' : 'Copier'}
                    </Button>
                    <Button
                      icon={Download}
                      variant="outline"
                      size="sm"
                      className="rounded-xl font-semibold"
                    >
                      Exporter PDF
                    </Button>
                    <Button
                      icon={FileText}
                      variant="outline"
                      size="sm"
                      className="rounded-xl font-semibold"
                    >
                      Google Doc
                    </Button>
                    <Button
                      icon={Save}
                      variant="outline"
                      size="sm"
                      className="rounded-xl font-semibold"
                    >
                      Sauvegarder
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            )}
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
                  onClick={() => setShowPreview(!showPreview)}
                  variant="outline"
                  className="w-full rounded-xl font-semibold"
                >
                  {showPreview ? 'Masquer' : 'Voir'} l'aperçu
                </Button>
                
                <Button
                  onClick={handleGenerate}
                  disabled={!canGenerate || isGenerating}
                  loading={isGenerating}
                  icon={Play}
                  className="w-full rounded-xl font-semibold bg-gray-900 hover:bg-gray-800"
                >
                  {isGenerating ? 'Génération...' : 'Générer avec IA'}
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm bg-white/60 backdrop-blur-sm rounded-3xl">
              <CardHeader className="p-6 md:p-8 pb-4 md:pb-6">
                <h3 className="text-lg md:text-xl font-bold text-gray-900 tracking-tight">
                  Informations du prompt
                </h3>
              </CardHeader>
              <CardContent className="p-6 md:p-8 pt-0 space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 font-medium">Note :</span>
                  <span className="font-bold">★ {currentPrompt.rating}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 font-medium">Utilisations :</span>
                  <span className="font-bold">{currentPrompt.usageCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 font-medium">Variables :</span>
                  <span className="font-bold">{currentPrompt.variables.length}</span>
                </div>
              </CardContent>
            </Card>

            {!canGenerate && (
              <Card className="border-0 shadow-sm bg-orange-50/80 backdrop-blur-sm rounded-3xl border-orange-200">
                <CardContent className="p-6 md:p-8">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="text-sm text-orange-800">
                      <strong>Champs requis :</strong> Veuillez remplir tous les champs obligatoires pour générer le contenu.
                    </div>
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