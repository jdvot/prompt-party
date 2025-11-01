-- Create marketing_prompts table for Marketing Suite
CREATE TABLE IF NOT EXISTS marketing_prompts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category TEXT NOT NULL, -- 'copywriting', 'seo', 'social_media', 'advertising', 'video', 'email'
  subcategory TEXT, -- e.g., 'landing_page', 'facebook_ad', 'youtube_script'
  title TEXT NOT NULL,
  description TEXT,
  prompt_text TEXT NOT NULL,
  example_output TEXT,
  tags TEXT[],
  use_case TEXT,
  difficulty TEXT DEFAULT 'intermediate', -- 'beginner', 'intermediate', 'advanced'
  estimated_time_saved INTEGER, -- in minutes
  is_premium BOOLEAN DEFAULT true, -- Marketing Suite exclusive
  usage_count INTEGER DEFAULT 0,
  rating DECIMAL(2,1) DEFAULT 0.0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX idx_marketing_prompts_category ON marketing_prompts(category);
CREATE INDEX idx_marketing_prompts_subcategory ON marketing_prompts(subcategory);
CREATE INDEX idx_marketing_prompts_tags ON marketing_prompts USING GIN(tags);

-- Enable RLS
ALTER TABLE marketing_prompts ENABLE ROW LEVEL SECURITY;

-- Policy: Everyone can read marketing prompts
CREATE POLICY "Marketing prompts are viewable by everyone"
  ON marketing_prompts
  FOR SELECT
  USING (true);

-- Policy: Only admins can insert/update/delete (we'll manage this separately)
CREATE POLICY "Only admins can manage marketing prompts"
  ON marketing_prompts
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.user_id = auth.uid()
      AND profiles.plan IN ('admin', 'marketing_suite', 'team', 'business')
    )
  );

-- Create marketing_prompt_usage table to track user usage
CREATE TABLE IF NOT EXISTS marketing_prompt_usage (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(user_id) ON DELETE CASCADE,
  prompt_id UUID REFERENCES marketing_prompts(id) ON DELETE CASCADE,
  used_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  feedback TEXT,
  UNIQUE(user_id, prompt_id, used_at)
);

-- Create index
CREATE INDEX idx_marketing_prompt_usage_user ON marketing_prompt_usage(user_id);
CREATE INDEX idx_marketing_prompt_usage_prompt ON marketing_prompt_usage(prompt_id);

-- Enable RLS
ALTER TABLE marketing_prompt_usage ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see their own usage
CREATE POLICY "Users can view their own marketing prompt usage"
  ON marketing_prompt_usage
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Users can insert their own usage
CREATE POLICY "Users can insert their own marketing prompt usage"
  ON marketing_prompt_usage
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own usage
CREATE POLICY "Users can update their own marketing prompt usage"
  ON marketing_prompt_usage
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Function to update usage count
CREATE OR REPLACE FUNCTION increment_marketing_prompt_usage()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE marketing_prompts
  SET usage_count = usage_count + 1
  WHERE id = NEW.prompt_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to increment usage count
CREATE TRIGGER trigger_increment_marketing_prompt_usage
  AFTER INSERT ON marketing_prompt_usage
  FOR EACH ROW
  EXECUTE FUNCTION increment_marketing_prompt_usage();

-- Function to update rating
CREATE OR REPLACE FUNCTION update_marketing_prompt_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE marketing_prompts
  SET rating = (
    SELECT AVG(rating)::DECIMAL(2,1)
    FROM marketing_prompt_usage
    WHERE prompt_id = NEW.prompt_id
    AND rating IS NOT NULL
  )
  WHERE id = NEW.prompt_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update rating
CREATE TRIGGER trigger_update_marketing_prompt_rating
  AFTER INSERT OR UPDATE ON marketing_prompt_usage
  FOR EACH ROW
  WHEN (NEW.rating IS NOT NULL)
  EXECUTE FUNCTION update_marketing_prompt_rating();
