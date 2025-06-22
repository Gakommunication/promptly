import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { flow_id } = await req.json();

    if (!flow_id) {
      throw new Error('flow_id is required');
    }

    // Increment usage count
    const { data, error } = await supabaseClient
      .from('flows')
      .update({ 
        usage_count: supabaseClient.sql`usage_count + 1` 
      })
      .eq('id', flow_id)
      .select('usage_count')
      .single();

    if (error) {
      throw error;
    }

    return new Response(
      JSON.stringify({ success: true, new_usage_count: data.usage_count }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );

  } catch (error) {
    console.error('Error incrementing flow usage:', error);
    
    return new Response(
      JSON.stringify({
        error: error.message || 'An error occurred',
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});