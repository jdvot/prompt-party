-- ============================================
-- MANUAL DATABASE MIGRATION FOR COMMENTS_COUNT
-- ============================================
-- Execute this SQL in your Supabase Dashboard:
-- Dashboard > SQL Editor > New Query > Paste this > Run
-- ============================================

-- Step 1: Add comments_count column to prompts table
ALTER TABLE prompts ADD COLUMN IF NOT EXISTS comments_count INTEGER DEFAULT 0;

-- Step 2: Update existing prompts with actual comment counts
UPDATE prompts
SET comments_count = (
  SELECT COUNT(*)
  FROM comments
  WHERE comments.prompt_id = prompts.id
);

-- Step 3: Create function to update comments_count
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

-- Step 4: Create trigger to automatically update comments_count
DROP TRIGGER IF EXISTS update_prompt_comments_count ON comments;
CREATE TRIGGER update_prompt_comments_count
  AFTER INSERT OR DELETE ON comments
  FOR EACH ROW
  EXECUTE FUNCTION update_comments_count();

-- ============================================
-- VERIFICATION QUERY
-- ============================================
-- Run this to verify the migration worked:
-- SELECT id, title, comments_count FROM prompts LIMIT 10;
