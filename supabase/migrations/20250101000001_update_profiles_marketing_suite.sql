-- Update profiles table to support marketing_suite plan
-- Add marketing_suite as valid plan type

-- First, check if plan column exists and add constraint for marketing_suite
ALTER TABLE profiles
DROP CONSTRAINT IF EXISTS profiles_plan_check;

ALTER TABLE profiles
ADD CONSTRAINT profiles_plan_check
CHECK (plan IN ('free', 'pro', 'marketing_suite', 'team', 'business'));

-- Add marketing suite specific fields
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS marketing_suite_credits INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS marketing_suite_trial_ends_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS brand_voice_profile JSONB DEFAULT '{}'::jsonb,
ADD COLUMN IF NOT EXISTS team_seats_used INTEGER DEFAULT 1,
ADD COLUMN IF NOT EXISTS team_seats_limit INTEGER DEFAULT 1;

-- Update team_seats_limit based on plan
CREATE OR REPLACE FUNCTION update_team_seats_limit()
RETURNS TRIGGER AS $$
BEGIN
  -- Set team seats limit based on plan
  IF NEW.plan = 'marketing_suite' THEN
    NEW.team_seats_limit := 3;
  ELSIF NEW.plan = 'team' THEN
    NEW.team_seats_limit := 10;
  ELSIF NEW.plan = 'business' THEN
    NEW.team_seats_limit := 50;
  ELSE
    NEW.team_seats_limit := 1;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update team seats limit
DROP TRIGGER IF EXISTS trigger_update_team_seats_limit ON profiles;
CREATE TRIGGER trigger_update_team_seats_limit
  BEFORE INSERT OR UPDATE OF plan ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_team_seats_limit();

-- Create marketing_suite_analytics table
CREATE TABLE IF NOT EXISTS marketing_suite_analytics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(user_id) ON DELETE CASCADE,
  date DATE NOT NULL,
  prompts_used INTEGER DEFAULT 0,
  ai_tests_run INTEGER DEFAULT 0,
  multi_llm_comparisons INTEGER DEFAULT 0,
  brand_voice_optimizations INTEGER DEFAULT 0,
  time_saved_minutes INTEGER DEFAULT 0,
  roi_estimated_euros DECIMAL(10,2) DEFAULT 0.00,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, date)
);

-- Create index
CREATE INDEX idx_marketing_suite_analytics_user_date ON marketing_suite_analytics(user_id, date DESC);

-- Enable RLS
ALTER TABLE marketing_suite_analytics ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see their own analytics
CREATE POLICY "Users can view their own marketing analytics"
  ON marketing_suite_analytics
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Users can insert/update their own analytics
CREATE POLICY "Users can manage their own marketing analytics"
  ON marketing_suite_analytics
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create function to track daily marketing suite usage
CREATE OR REPLACE FUNCTION track_marketing_suite_usage(
  p_user_id UUID,
  p_prompts_used INTEGER DEFAULT 0,
  p_ai_tests_run INTEGER DEFAULT 0,
  p_multi_llm_comparisons INTEGER DEFAULT 0,
  p_brand_voice_optimizations INTEGER DEFAULT 0,
  p_time_saved_minutes INTEGER DEFAULT 0
)
RETURNS void AS $$
BEGIN
  INSERT INTO marketing_suite_analytics (
    user_id,
    date,
    prompts_used,
    ai_tests_run,
    multi_llm_comparisons,
    brand_voice_optimizations,
    time_saved_minutes,
    roi_estimated_euros
  )
  VALUES (
    p_user_id,
    CURRENT_DATE,
    p_prompts_used,
    p_ai_tests_run,
    p_multi_llm_comparisons,
    p_brand_voice_optimizations,
    p_time_saved_minutes,
    (p_time_saved_minutes * 0.83) -- Assuming €50/hour rate = €0.83/minute
  )
  ON CONFLICT (user_id, date)
  DO UPDATE SET
    prompts_used = marketing_suite_analytics.prompts_used + EXCLUDED.prompts_used,
    ai_tests_run = marketing_suite_analytics.ai_tests_run + EXCLUDED.ai_tests_run,
    multi_llm_comparisons = marketing_suite_analytics.multi_llm_comparisons + EXCLUDED.multi_llm_comparisons,
    brand_voice_optimizations = marketing_suite_analytics.brand_voice_optimizations + EXCLUDED.brand_voice_optimizations,
    time_saved_minutes = marketing_suite_analytics.time_saved_minutes + EXCLUDED.time_saved_minutes,
    roi_estimated_euros = marketing_suite_analytics.roi_estimated_euros + EXCLUDED.roi_estimated_euros;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission
GRANT EXECUTE ON FUNCTION track_marketing_suite_usage TO authenticated;

-- Create view for marketing suite dashboard
CREATE OR REPLACE VIEW marketing_suite_dashboard AS
SELECT
  user_id,
  SUM(prompts_used) as total_prompts_used,
  SUM(ai_tests_run) as total_ai_tests,
  SUM(multi_llm_comparisons) as total_comparisons,
  SUM(brand_voice_optimizations) as total_optimizations,
  SUM(time_saved_minutes) as total_time_saved_minutes,
  SUM(roi_estimated_euros) as total_roi_euros,
  COUNT(DISTINCT date) as active_days,
  MAX(date) as last_active_date,
  -- Last 7 days
  SUM(CASE WHEN date >= CURRENT_DATE - INTERVAL '7 days' THEN time_saved_minutes ELSE 0 END) as time_saved_7d,
  SUM(CASE WHEN date >= CURRENT_DATE - INTERVAL '7 days' THEN prompts_used ELSE 0 END) as prompts_used_7d,
  -- Last 30 days
  SUM(CASE WHEN date >= CURRENT_DATE - INTERVAL '30 days' THEN time_saved_minutes ELSE 0 END) as time_saved_30d,
  SUM(CASE WHEN date >= CURRENT_DATE - INTERVAL '30 days' THEN prompts_used ELSE 0 END) as prompts_used_30d
FROM marketing_suite_analytics
GROUP BY user_id;

-- Grant select permission on view
GRANT SELECT ON marketing_suite_dashboard TO authenticated;

-- Comment on tables
COMMENT ON TABLE marketing_prompts IS 'Library of 500+ pre-made marketing prompts for Marketing Suite subscribers';
COMMENT ON TABLE marketing_prompt_usage IS 'Tracks individual user usage of marketing prompts';
COMMENT ON TABLE marketing_suite_analytics IS 'Daily analytics for Marketing Suite users to track ROI and productivity';
COMMENT ON VIEW marketing_suite_dashboard IS 'Aggregated dashboard metrics for Marketing Suite users';
