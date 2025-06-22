/*
  # Schéma initial Promptly - Application SaaS d'automatisation IA

  1. Tables principales
    - `users` - Profils utilisateurs avec abonnements
    - `flows` - Promptly Flows (prompts métiers)
    - `chat_sessions` - Sessions de chat IA
    - `messages` - Historique des conversations
    - `flow_executions` - Historique d'exécution des flows
    - `user_favorites` - Flows favoris des utilisateurs

  2. Sécurité
    - RLS activé sur toutes les tables
    - Politiques d'accès basées sur l'authentification
    - Isolation des données par utilisateur

  3. Fonctionnalités
    - Gestion des abonnements PRO/Gratuit
    - Historique complet des interactions
    - Système de favoris et partage
    - Analytics d'utilisation
*/

-- Extension pour UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table des utilisateurs (étend auth.users)
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  email text NOT NULL,
  profession text NOT NULL,
  is_pro boolean DEFAULT false,
  prompts_used integer DEFAULT 0,
  prompts_limit integer DEFAULT 10,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Table des Promptly Flows
CREATE TABLE IF NOT EXISTS flows (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  category text NOT NULL,
  icon_name text NOT NULL DEFAULT 'Sparkles',
  prompt_template text NOT NULL,
  variables jsonb DEFAULT '[]'::jsonb,
  usage_count integer DEFAULT 0,
  is_personal boolean DEFAULT false,
  is_public boolean DEFAULT true,
  gradient_colors text NOT NULL DEFAULT 'from-blue-500 to-cyan-500',
  bg_gradient_colors text NOT NULL DEFAULT 'from-blue-50/80 to-cyan-50/80',
  created_by_user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Table des sessions de chat
CREATE TABLE IF NOT EXISTS chat_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Table des messages de chat
CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  chat_session_id uuid NOT NULL REFERENCES chat_sessions(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type text NOT NULL CHECK (type IN ('user', 'assistant')),
  content text NOT NULL,
  is_voice boolean DEFAULT false,
  flow_used_id uuid REFERENCES flows(id) ON DELETE SET NULL,
  actions jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now()
);

-- Table des exécutions de flows
CREATE TABLE IF NOT EXISTS flow_executions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  flow_id uuid NOT NULL REFERENCES flows(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  variables jsonb NOT NULL DEFAULT '{}'::jsonb,
  result text NOT NULL,
  execution_time_ms integer,
  created_at timestamptz DEFAULT now()
);

-- Table des favoris utilisateurs
CREATE TABLE IF NOT EXISTS user_favorites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  flow_id uuid NOT NULL REFERENCES flows(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, flow_id)
);

-- Activation de RLS sur toutes les tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE flows ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE flow_executions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_favorites ENABLE ROW LEVEL SECURITY;

-- Politiques RLS pour users
CREATE POLICY "Users can read own profile"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Politiques RLS pour flows
CREATE POLICY "Users can read public flows"
  ON flows
  FOR SELECT
  TO authenticated
  USING (is_public = true OR created_by_user_id = auth.uid());

CREATE POLICY "Users can create flows"
  ON flows
  FOR INSERT
  TO authenticated
  WITH CHECK (created_by_user_id = auth.uid());

CREATE POLICY "Users can update own flows"
  ON flows
  FOR UPDATE
  TO authenticated
  USING (created_by_user_id = auth.uid());

CREATE POLICY "Users can delete own flows"
  ON flows
  FOR DELETE
  TO authenticated
  USING (created_by_user_id = auth.uid());

-- Politiques RLS pour chat_sessions
CREATE POLICY "Users can manage own chat sessions"
  ON chat_sessions
  FOR ALL
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Politiques RLS pour messages
CREATE POLICY "Users can manage own messages"
  ON messages
  FOR ALL
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Politiques RLS pour flow_executions
CREATE POLICY "Users can manage own flow executions"
  ON flow_executions
  FOR ALL
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Politiques RLS pour user_favorites
CREATE POLICY "Users can manage own favorites"
  ON user_favorites
  FOR ALL
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Fonctions pour mettre à jour updated_at automatiquement
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers pour updated_at
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_flows_updated_at
  BEFORE UPDATE ON flows
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_chat_sessions_updated_at
  BEFORE UPDATE ON chat_sessions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Index pour les performances
CREATE INDEX IF NOT EXISTS idx_flows_category ON flows(category);
CREATE INDEX IF NOT EXISTS idx_flows_created_by ON flows(created_by_user_id);
CREATE INDEX IF NOT EXISTS idx_flows_public ON flows(is_public);
CREATE INDEX IF NOT EXISTS idx_messages_session ON messages(chat_session_id);
CREATE INDEX IF NOT EXISTS idx_messages_user ON messages(user_id);
CREATE INDEX IF NOT EXISTS idx_flow_executions_user ON flow_executions(user_id);
CREATE INDEX IF NOT EXISTS idx_flow_executions_flow ON flow_executions(flow_id);
CREATE INDEX IF NOT EXISTS idx_user_favorites_user ON user_favorites(user_id);