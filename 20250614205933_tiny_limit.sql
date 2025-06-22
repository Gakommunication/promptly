/*
  # Fix users table RLS policy for registration

  1. Security Changes
    - Add INSERT policy for users table to allow authenticated users to create their own profile
    - This fixes the "new row violates row-level security policy" error during registration

  2. Notes
    - The existing SELECT and UPDATE policies remain unchanged
    - Users can only insert their own profile (auth.uid() = id)
*/

-- Add INSERT policy for users table
CREATE POLICY "Users can create own profile"
  ON users
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);