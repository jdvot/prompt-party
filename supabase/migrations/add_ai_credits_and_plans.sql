-- Add AI testing credits and plan columns to profiles table
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS ai_test_credits INTEGER DEFAULT 10,
ADD COLUMN IF NOT EXISTS plan TEXT DEFAULT 'free' CHECK (plan IN ('free', 'pro', 'team', 'business'));

-- Add comment for documentation
COMMENT ON COLUMN profiles.ai_test_credits IS 'Number of AI prompt tests remaining (resets monthly for free users)';
COMMENT ON COLUMN profiles.plan IS 'User subscription plan: free (10 tests/month), pro (unlimited), team, business';

-- Create index for plan queries
CREATE INDEX IF NOT EXISTS idx_profiles_plan ON profiles(plan);

-- Create table for AI test history (optional, for analytics)
CREATE TABLE IF NOT EXISTS ai_test_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  prompt_id UUID REFERENCES prompts(id) ON DELETE SET NULL,
  model TEXT NOT NULL CHECK (model IN ('gpt-4', 'claude-3', 'gemini-pro')),
  tokens_used INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add RLS policies for ai_test_history
ALTER TABLE ai_test_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own AI test history"
ON ai_test_history FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own AI test history"
ON ai_test_history FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Create index for performance
CREATE INDEX IF NOT EXISTS idx_ai_test_history_user_created ON ai_test_history(user_id, created_at DESC);

-- Function to reset free user credits monthly (call via cron)
CREATE OR REPLACE FUNCTION reset_monthly_ai_credits()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE profiles
  SET ai_test_credits = 10
  WHERE plan = 'free';
END;
$$;

COMMENT ON FUNCTION reset_monthly_ai_credits IS 'Resets AI test credits for free users - run monthly via cron';
