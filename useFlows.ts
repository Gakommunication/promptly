import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Prompt } from '../src/types';

interface Flow {
  id: string;
  name: string;
  description: string;
  category: string;
  icon_name: string;
  prompt_template: string;
  variables: any[];
  usage_count: number;
  is_personal: boolean;
  is_public: boolean;
  gradient_colors: string;
  bg_gradient_colors: string;
  created_by_user_id: string | null;
  created_at: string;
  updated_at: string;
}

export function useFlows(userId?: string) {
  const [flows, setFlows] = useState<Flow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchFlows();
  }, [userId]);

  const fetchFlows = async () => {
    try {
      setLoading(true);
      setError(null);

      let query = supabase
        .from('flows')
        .select('*')
        .order('usage_count', { ascending: false });

      // Si un utilisateur est connecté, récupérer ses flows personnels + les publics
      if (userId) {
        query = query.or(`is_public.eq.true,created_by_user_id.eq.${userId}`);
      } else {
        // Sinon, seulement les flows publics
        query = query.eq('is_public', true);
      }

      const { data, error: fetchError } = await query;

      if (fetchError) {
        throw fetchError;
      }

      setFlows(data || []);
    } catch (err) {
      console.error('Error fetching flows:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const createFlow = async (flowData: {
    name: string;
    description: string;
    category: string;
    icon_name?: string;
    prompt_template: string;
    variables?: any[];
    is_personal?: boolean;
    is_public?: boolean;
    gradient_colors?: string;
    bg_gradient_colors?: string;
  }) => {
    if (!userId) {
      throw new Error('User must be logged in to create flows');
    }

    try {
      const { data, error } = await supabase
        .from('flows')
        .insert({
          ...flowData,
          created_by_user_id: userId,
          is_personal: flowData.is_personal ?? true,
          is_public: flowData.is_public ?? false
        })
        .select()
        .single();

      if (error) throw error;

      // Refresh flows list
      await fetchFlows();

      return { data, error: null };
    } catch (err) {
      console.error('Error creating flow:', err);
      return { data: null, error: err };
    }
  };

  const updateFlow = async (flowId: string, updates: Partial<Flow>) => {
    try {
      const { data, error } = await supabase
        .from('flows')
        .update(updates)
        .eq('id', flowId)
        .eq('created_by_user_id', userId) // Ensure user owns the flow
        .select()
        .single();

      if (error) throw error;

      // Refresh flows list
      await fetchFlows();

      return { data, error: null };
    } catch (err) {
      console.error('Error updating flow:', err);
      return { data: null, error: err };
    }
  };

  const deleteFlow = async (flowId: string) => {
    try {
      const { error } = await supabase
        .from('flows')
        .delete()
        .eq('id', flowId)
        .eq('created_by_user_id', userId); // Ensure user owns the flow

      if (error) throw error;

      // Refresh flows list
      await fetchFlows();

      return { error: null };
    } catch (err) {
      console.error('Error deleting flow:', err);
      return { error: err };
    }
  };

  const incrementUsageCount = async (flowId: string) => {
    try {
      const { error } = await supabase.rpc('increment_flow_usage', {
        flow_id: flowId
      });

      if (error) throw error;

      // Update local state
      setFlows(prev => prev.map(flow => 
        flow.id === flowId 
          ? { ...flow, usage_count: flow.usage_count + 1 }
          : flow
      ));
    } catch (err) {
      console.error('Error incrementing usage count:', err);
    }
  };

  // Convert Flow to Prompt format for compatibility
  const convertFlowToPrompt = (flow: Flow): Prompt => ({
    id: flow.id,
    title: flow.name,
    content: flow.prompt_template,
    profession: flow.category, // Using category as profession for now
    category: flow.category,
    tone: 'Professionnel', // Default tone
    variables: flow.variables.map(v => ({
      name: v.name,
      example: v.example || '',
      defaultValue: v.defaultValue || '',
      required: v.required || false
    })),
    rating: 4.5, // Default rating
    usageCount: flow.usage_count,
    isPersonal: flow.is_personal,
    createdAt: new Date(flow.created_at)
  });

  const getPromptsFromFlows = (): Prompt[] => {
    return flows.map(convertFlowToPrompt);
  };

  return {
    flows,
    loading,
    error,
    createFlow,
    updateFlow,
    deleteFlow,
    incrementUsageCount,
    refreshFlows: fetchFlows,
    getPromptsFromFlows
  };
}