-- ================================================
-- PROMPT VERSIONING SYSTEM
-- ================================================
-- Enables version history tracking and collaborative editing
-- for prompts with automatic versioning and rollback support

-- Create prompt_versions table
CREATE TABLE IF NOT EXISTS prompt_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prompt_id UUID NOT NULL REFERENCES prompts(id) ON DELETE CASCADE,
  version_number INTEGER NOT NULL,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  category TEXT,
  tags TEXT[] DEFAULT '{}',
  changed_by UUID NOT NULL REFERENCES profiles(id) ON DELETE SET NULL,
  changed_by_name TEXT NOT NULL,
  change_summary TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),

  -- Ensure unique version numbers per prompt
  UNIQUE(prompt_id, version_number)
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_prompt_versions_prompt_id
  ON prompt_versions(prompt_id);
CREATE INDEX IF NOT EXISTS idx_prompt_versions_created_at
  ON prompt_versions(created_at DESC);

-- Enable RLS
ALTER TABLE prompt_versions ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Anyone can view versions of public prompts
CREATE POLICY "Public prompts versions are viewable by everyone"
  ON prompt_versions FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM prompts
      WHERE prompts.id = prompt_versions.prompt_id
      AND prompts.is_public = true
    )
  );

-- Authors can view all versions of their prompts
CREATE POLICY "Authors can view all versions of their prompts"
  ON prompt_versions FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM prompts
      WHERE prompts.id = prompt_versions.prompt_id
      AND prompts.author = auth.uid()
    )
  );

-- Only prompt authors can create versions
CREATE POLICY "Authors can create versions"
  ON prompt_versions FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM prompts
      WHERE prompts.id = prompt_versions.prompt_id
      AND prompts.author = auth.uid()
    )
  );

-- Function to auto-create version on prompt update
CREATE OR REPLACE FUNCTION create_prompt_version()
RETURNS TRIGGER AS $$
DECLARE
  v_next_version INTEGER;
  v_author_name TEXT;
BEGIN
  -- Get next version number
  SELECT COALESCE(MAX(version_number), 0) + 1
  INTO v_next_version
  FROM prompt_versions
  WHERE prompt_id = NEW.id;

  -- Get author name
  SELECT name INTO v_author_name
  FROM profiles
  WHERE id = NEW.author;

  -- Insert version (only if content actually changed)
  IF OLD IS NULL OR
     OLD.title != NEW.title OR
     OLD.body != NEW.body OR
     OLD.category IS DISTINCT FROM NEW.category OR
     OLD.tags IS DISTINCT FROM NEW.tags THEN

    INSERT INTO prompt_versions (
      prompt_id,
      version_number,
      title,
      body,
      category,
      tags,
      changed_by,
      changed_by_name,
      change_summary
    ) VALUES (
      NEW.id,
      v_next_version,
      NEW.title,
      NEW.body,
      NEW.category,
      NEW.tags,
      NEW.author,
      COALESCE(v_author_name, 'Unknown'),
      'Auto-saved version'
    );
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for auto-versioning
DROP TRIGGER IF EXISTS trigger_create_prompt_version ON prompts;
CREATE TRIGGER trigger_create_prompt_version
  AFTER UPDATE ON prompts
  FOR EACH ROW
  EXECUTE FUNCTION create_prompt_version();

-- Function to restore a version
CREATE OR REPLACE FUNCTION restore_prompt_version(
  p_prompt_id UUID,
  p_version_id UUID
)
RETURNS BOOLEAN AS $$
DECLARE
  v_version RECORD;
BEGIN
  -- Get the version data
  SELECT * INTO v_version
  FROM prompt_versions
  WHERE id = p_version_id
  AND prompt_id = p_prompt_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Version not found';
  END IF;

  -- Check authorization
  IF NOT EXISTS (
    SELECT 1 FROM prompts
    WHERE id = p_prompt_id
    AND author = auth.uid()
  ) THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;

  -- Update the prompt with version data
  UPDATE prompts
  SET
    title = v_version.title,
    body = v_version.body,
    category = v_version.category,
    tags = v_version.tags,
    updated_at = NOW()
  WHERE id = p_prompt_id;

  RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ================================================
-- COLLABORATIVE EDITING PRESENCE
-- ================================================
-- Track who is currently editing a prompt in real-time

-- Create presence tracking table
CREATE TABLE IF NOT EXISTS prompt_presence (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prompt_id UUID NOT NULL REFERENCES prompts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  user_name TEXT NOT NULL,
  avatar_url TEXT,
  color TEXT NOT NULL,
  cursor_position INTEGER,
  last_seen TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(prompt_id, user_id)
);

-- Index for fast lookups
CREATE INDEX IF NOT EXISTS idx_prompt_presence_prompt_id
  ON prompt_presence(prompt_id);
CREATE INDEX IF NOT EXISTS idx_prompt_presence_last_seen
  ON prompt_presence(last_seen DESC);

-- Enable RLS
ALTER TABLE prompt_presence ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Users can view presence for prompts they can access
CREATE POLICY "Users can view presence for accessible prompts"
  ON prompt_presence FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM prompts
      WHERE prompts.id = prompt_presence.prompt_id
      AND (prompts.is_public = true OR prompts.author = auth.uid())
    )
  );

-- Users can manage their own presence
CREATE POLICY "Users can manage their own presence"
  ON prompt_presence FOR ALL
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Function to cleanup old presence records
CREATE OR REPLACE FUNCTION cleanup_old_presence()
RETURNS void AS $$
BEGIN
  DELETE FROM prompt_presence
  WHERE last_seen < NOW() - INTERVAL '5 minutes';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON prompt_versions TO authenticated;
GRANT ALL ON prompt_presence TO authenticated;
GRANT EXECUTE ON FUNCTION create_prompt_version() TO authenticated;
GRANT EXECUTE ON FUNCTION restore_prompt_version(UUID, UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION cleanup_old_presence() TO authenticated;

-- Add helpful comments
COMMENT ON TABLE prompt_versions IS 'Stores version history for prompts to enable rollback and audit trail';
COMMENT ON TABLE prompt_presence IS 'Tracks real-time presence of users editing prompts for collaborative editing';
COMMENT ON FUNCTION create_prompt_version() IS 'Automatically creates a new version when a prompt is updated';
COMMENT ON FUNCTION restore_prompt_version(UUID, UUID) IS 'Restores a prompt to a specific version';
COMMENT ON FUNCTION cleanup_old_presence() IS 'Removes stale presence records (call via cron job)';
