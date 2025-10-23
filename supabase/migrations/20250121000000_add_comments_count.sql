-- Add comments_count column to prompts table
ALTER TABLE prompts ADD COLUMN comments_count INTEGER DEFAULT 0;

-- Update existing prompts with actual comment counts
UPDATE prompts
SET comments_count = (
  SELECT COUNT(*)
  FROM comments
  WHERE comments.prompt_id = prompts.id
);

-- Function to update comments_count
CREATE OR REPLACE FUNCTION update_comments_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE prompts SET comments_count = comments_count + 1 WHERE id = NEW.prompt_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE prompts SET comments_count = comments_count - 1 WHERE id = OLD.prompt_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update comments_count
CREATE TRIGGER update_prompt_comments_count
  AFTER INSERT OR DELETE ON comments
  FOR EACH ROW
  EXECUTE FUNCTION update_comments_count();
