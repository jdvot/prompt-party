-- Add views_count column to prompts table
ALTER TABLE prompts
ADD COLUMN IF NOT EXISTS views_count INTEGER DEFAULT 0;

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_prompts_views_count ON prompts(views_count DESC);

-- Create function to increment view count
CREATE OR REPLACE FUNCTION increment_prompt_views(prompt_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE prompts
  SET views_count = COALESCE(views_count, 0) + 1
  WHERE id = prompt_id;
END;
$$;

-- Add comments for documentation
COMMENT ON COLUMN prompts.views_count IS 'Number of times this prompt has been viewed';
COMMENT ON FUNCTION increment_prompt_views IS 'Increments the view count for a prompt atomically';
