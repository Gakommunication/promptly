import { useState, useEffect } from 'react';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { User } from '../types';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [supabaseUser, setSupabaseUser] = useState<SupabaseUser | null>(null);

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        // Check if we have valid Supabase configuration
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
        const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
        
        // If no valid config, use demo mode
        if (!supabaseUrl || !supabaseKey || 
            supabaseUrl === 'https://demo.supabase.co' || 
            supabaseKey === 'demo-anon-key' ||
            supabaseUrl.includes('netlify.app')) {
          console.log('Demo mode: Using mock authentication');
          setLoading(false);
          return;
        }

        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          console.log('Initial session found:', session.user.id);
          setSupabaseUser(session.user);
          await fetchUserProfile(session.user.id);
        } else {
          console.log('No initial session found');
        }
      } catch (error) {
        console.error('Error getting initial session:', error);
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session?.user?.id);
      
      if (session?.user) {
        setSupabaseUser(session.user);
        await fetchUserProfile(session.user.id);
      } else {
        setSupabaseUser(null);
        setUser(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      console.log('Fetching user profile for:', userId);
      
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId);

      if (error) {
        console.error('Error fetching user profile:', error);
        return;
      }

      // Check if user profile exists
      if (data && data.length > 0) {
        const userData = data[0];
        console.log('User profile found:', userData);
        
        setUser({
          id: userData.id,
          name: userData.name,
          email: userData.email,
          profession: userData.profession,
          isPro: userData.is_pro,
          promptsUsed: userData.prompts_used,
          promptsLimit: userData.prompts_limit
        });
      } else {
        // User profile doesn't exist yet, this is normal for new users
        console.log('User profile not found, user may need to complete registration');
        setUser(null);
      }
    } catch (error) {
      console.error('Error in fetchUserProfile:', error);
    }
  };

  const signUp = async (email: string, password: string, userData: { name: string; profession: string }) => {
    try {
      console.log('Starting signup process...');
      
      // Check if we're in demo mode
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
      
      if (!supabaseUrl || !supabaseKey || 
          supabaseUrl === 'https://demo.supabase.co' || 
          supabaseKey === 'demo-anon-key' ||
          supabaseUrl.includes('netlify.app')) {
        console.log('Demo mode: Creating mock user');
        
        // Simulate loading time
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Create a mock user for demo
        const mockUser: User = {
          id: 'demo-user-' + Date.now(),
          name: userData.name,
          email: email,
          profession: userData.profession,
          isPro: false,
          promptsUsed: 0,
          promptsLimit: 10
        };
        
        console.log('Mock user created:', mockUser);
        setUser(mockUser);
        return { data: { user: { id: mockUser.id } }, error: null };
      }

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData
        }
      });

      if (error) throw error;

      // Create user profile immediately after signup
      if (data.user) {
        console.log('Creating user profile for:', data.user.id);
        
        const { error: profileError } = await supabase
          .from('users')
          .insert({
            id: data.user.id,
            name: userData.name,
            email: email,
            profession: userData.profession,
            is_pro: false,
            prompts_used: 0,
            prompts_limit: 10
          });

        if (profileError) {
          console.error('Error creating user profile:', profileError);
          // Don't throw error, continue with auth
        } else {
          console.log('User profile created successfully');
          
          // Set user immediately for better UX
          const newUser: User = {
            id: data.user.id,
            name: userData.name,
            email: email,
            profession: userData.profession,
            isPro: false,
            promptsUsed: 0,
            promptsLimit: 10
          };
          console.log('Setting new user:', newUser);
          setUser(newUser);
        }
      }

      return { data, error };
    } catch (error) {
      console.error('Error in signUp:', error);
      return { data: null, error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      console.log('Starting signin process...');
      
      // Check if we're in demo mode
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
      
      if (!supabaseUrl || !supabaseKey || 
          supabaseUrl === 'https://demo.supabase.co' || 
          supabaseKey === 'demo-anon-key' ||
          supabaseUrl.includes('netlify.app')) {
        console.log('Demo mode: Creating mock user for signin');
        
        // Simulate loading time
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Create a mock user for demo
        const mockUser: User = {
          id: 'demo-user-signin',
          name: 'Utilisateur Démo',
          email: email,
          profession: 'Responsable RH',
          isPro: false,
          promptsUsed: 3,
          promptsLimit: 10
        };
        
        console.log('Mock signin user created:', mockUser);
        setUser(mockUser);
        return { data: { user: { id: mockUser.id } }, error: null };
      }
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        console.error('Signin error:', error);
        return { data, error };
      }

      console.log('Signin successful for user:', data.user?.id);
      
      // Fetch user profile immediately after signin
      if (data.user) {
        await fetchUserProfile(data.user.id);
      }
      
      return { data, error };
    } catch (error) {
      console.error('Error in signIn:', error);
      return { data: null, error };
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      setUser(null);
      setSupabaseUser(null);
    } catch (error) {
      console.error('Error in signOut:', error);
    }
  };

  const updateProfile = async (updates: Partial<User>) => {
    if (!user) return { error: 'No user logged in' };

    try {
      const { data, error } = await supabase
        .from('users')
        .update({
          name: updates.name,
          email: updates.email,
          profession: updates.profession,
          is_pro: updates.isPro,
          prompts_used: updates.promptsUsed,
          prompts_limit: updates.promptsLimit
        })
        .eq('id', user.id)
        .select()
        .single();

      if (error) throw error;

      if (data) {
        setUser({
          id: data.id,
          name: data.name,
          email: data.email,
          profession: data.profession,
          isPro: data.is_pro,
          promptsUsed: data.prompts_used,
          promptsLimit: data.prompts_limit
        });
      }

      return { data, error: null };
    } catch (error) {
      console.error('Error updating profile:', error);
      return { data: null, error };
    }
  };

  const upgradeToPro = async () => {
    return updateProfile({
      ...user!,
      isPro: true,
      promptsLimit: -1 // Unlimited
    });
  };

  return {
    user,
    supabaseUser,
    loading,
    signUp,
    signIn,
    signOut,
    updateProfile,
    upgradeToPro,
    refreshProfile: () => user && fetchUserProfile(user.id)
  };
}