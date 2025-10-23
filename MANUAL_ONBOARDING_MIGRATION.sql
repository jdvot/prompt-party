-- ============================================
-- ONBOARDING SYSTEM MIGRATION
-- ============================================
-- Execute this SQL in your Supabase Dashboard:
-- Dashboard > SQL Editor > New Query > Paste this > Run
-- ============================================

-- Step 1: Add onboarding fields to profiles table
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS onboarding_completed BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS onboarding_step INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS selected_interests TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS onboarding_completed_at TIMESTAMPTZ;

-- Step 2: Create index for faster onboarding queries
CREATE INDEX IF NOT EXISTS idx_profiles_onboarding ON profiles(onboarding_completed, onboarding_step);

-- Step 3: Create function to mark onboarding as complete
CREATE OR REPLACE FUNCTION complete_onboarding(user_id_param UUID)
RETURNS void AS $$
BEGIN
  UPDATE profiles
  SET
    onboarding_completed = true,
    onboarding_step = 5,
    onboarding_completed_at = NOW()
  WHERE user_id = user_id_param;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- VERIFICATION QUERY
-- ============================================
-- Run this to verify the migration worked:
-- SELECT user_id, onboarding_completed, onboarding_step, selected_interests FROM profiles LIMIT 10;
