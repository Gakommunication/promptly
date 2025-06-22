import { supabase } from '../lib/supabase';

export interface ChatMessage {
  message: string;
  flowId?: string;
  variables?: Record<string, string>;
  userId: string;
}

export interface ChatResponse {
  response: string;
  usage?: any;
  model?: string;
}

export class AIService {
  static async sendChatMessage(data: ChatMessage): Promise<ChatResponse> {
    try {
      const { data: response, error } = await supabase.functions.invoke('ai-chat', {
        body: data
      });

      if (error) {
        throw new Error(error.message || 'Failed to get AI response');
      }

      if (response.error) {
        throw new Error(response.error);
      }

      return response;
    } catch (error) {
      console.error('Error in AI service:', error);
      throw error;
    }
  }

  static async incrementFlowUsage(flowId: string): Promise<void> {
    try {
      const { error } = await supabase.functions.invoke('increment-flow-usage', {
        body: { flow_id: flowId }
      });

      if (error) {
        console.error('Error incrementing flow usage:', error);
      }
    } catch (error) {
      console.error('Error in incrementFlowUsage:', error);
    }
  }

  // Fallback response for when AI service is not available
  static generateFallbackResponse(message: string, flowName?: string): string {
    if (flowName) {
      return `✨ **${flowName}** - Simulation de réponse\n\nVotre demande "${message}" a été traitée avec succès.\n\n**Résultat généré :**\n\nCeci est une réponse simulée pour démonstration. Dans la version complète, cette réponse serait générée par notre IA spécialisée selon votre métier et vos besoins spécifiques.\n\n**Fonctionnalités disponibles :**\n• Génération de contenu professionnel\n• Adaptation au contexte métier\n• Variables personnalisables\n• Export et sauvegarde\n\n✅ **Actions :** Copier, Exporter PDF, Sauvegarder`;
    }

    const responses = [
      `Je comprends votre demande concernant "${message}". \n\n🎯 **Analyse :**\nPour cette tâche, je recommande d'utiliser un de nos Flows spécialisés qui vous permettra d'obtenir un résultat optimisé.\n\n🚀 **Suggestion :**\nSélectionnez un Flow dans la sidebar ou décrivez-moi plus précisément votre besoin pour que je puisse vous orienter vers la meilleure solution.`,
      
      `Excellente question ! Pour "${message}", voici mon analyse :\n\n💡 **Solutions disponibles :**\n• Flow spécialisé de votre bibliothèque métier\n• Création d'un nouveau Flow personnalisé\n• Adaptation d'un modèle existant\n\n🎨 **Recommandation :**\nJe peux vous aider à structurer votre demande pour obtenir le meilleur résultat possible.\n\nQuelle approche préférez-vous ?`,
      
      `Parfait ! Je traite votre demande "${message}".\n\n⚡ **Analyse en cours...**\n\n📋 **Contenu suggéré :**\nBasé sur votre demande, je peux vous proposer plusieurs approches adaptées à votre contexte professionnel.\n\n✨ **Optimisations :**\n• Ton professionnel adapté\n• Structure claire et efficace\n• Personnalisation selon vos besoins\n\nSouhaitez-vous que je développe une solution spécifique ?`
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  }
}