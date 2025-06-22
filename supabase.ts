import { createClient } from '@supabase/supabase-js';

// Use demo values for development when no env vars are available
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://demo.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'demo-anon-key';

// Create client with fallback for development
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: false
  }
});

// Types pour TypeScript
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          name: string;
          email: string;
          profession: string;
          is_pro: boolean;
          prompts_used: number;
          prompts_limit: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          name: string;
          email: string;
          profession: string;
          is_pro?: boolean;
          prompts_used?: number;
          prompts_limit?: number;
        };
        Update: {
          name?: string;
          email?: string;
          profession?: string;
          is_pro?: boolean;
          prompts_used?: number;
          prompts_limit?: number;
        };
      };
      flows: {
        Row: {
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
        };
        Insert: {
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
          created_by_user_id?: string;
        };
        Update: {
          name?: string;
          description?: string;
          category?: string;
          icon_name?: string;
          prompt_template?: string;
          variables?: any[];
          is_personal?: boolean;
          is_public?: boolean;
          gradient_colors?: string;
          bg_gradient_colors?: string;
        };
      };
      chat_sessions: {
        Row: {
          id: string;
          user_id: string;
          title: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          title?: string;
        };
        Update: {
          title?: string;
        };
      };
      messages: {
        Row: {
          id: string;
          chat_session_id: string;
          user_id: string;
          type: 'user' | 'assistant';
          content: string;
          is_voice: boolean;
          flow_used_id: string | null;
          actions: string[];
          created_at: string;
        };
        Insert: {
          chat_session_id: string;
          user_id: string;
          type: 'user' | 'assistant';
          content: string;
          is_voice?: boolean;
          flow_used_id?: string;
          actions?: string[];
        };
        Update: {
          content?: string;
          actions?: string[];
        };
      };
      flow_executions: {
        Row: {
          id: string;
          flow_id: string;
          user_id: string;
          variables: Record<string, any>;
          result: string;
          execution_time_ms: number | null;
          created_at: string;
        };
        Insert: {
          flow_id: string;
          user_id: string;
          variables: Record<string, any>;
          result: string;
          execution_time_ms?: number;
        };
        Update: {
          result?: string;
          execution_time_ms?: number;
        };
      };
      user_favorites: {
        Row: {
          id: string;
          user_id: string;
          flow_id: string;
          created_at: string;
        };
        Insert: {
          user_id: string;
          flow_id: string;
        };
        Update: never;
      };
    };
  };
}