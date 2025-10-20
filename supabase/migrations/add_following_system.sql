-- Create follows table
CREATE TABLE IF NOT EXISTS follows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  follower_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  following_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(follower_id, following_id),
  CHECK (follower_id != following_id)
);

-- Add follower counts to profiles
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS followers_count INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS following_count INTEGER DEFAULT 0;

-- Enable RLS
ALTER TABLE follows ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Anyone can view follows"
ON follows FOR SELECT
USING (true);

CREATE POLICY "Users can follow others"
ON follows FOR INSERT
WITH CHECK (auth.uid() = follower_id);

CREATE POLICY "Users can unfollow"
ON follows FOR DELETE
USING (auth.uid() = follower_id);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_follows_follower ON follows(follower_id);
CREATE INDEX IF NOT EXISTS idx_follows_following ON follows(following_id);
CREATE INDEX IF NOT EXISTS idx_profiles_followers_count ON profiles(followers_count DESC);

-- Function to increment follower counts
CREATE OR REPLACE FUNCTION increment_follower_counts()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Increment following_count for follower
  UPDATE profiles
  SET following_count = COALESCE(following_count, 0) + 1
  WHERE id = NEW.follower_id;

  -- Increment followers_count for following
  UPDATE profiles
  SET followers_count = COALESCE(followers_count, 0) + 1
  WHERE id = NEW.following_id;

  -- Create notification for the followed user
  PERFORM create_notification(
    NEW.following_id,
    'follow',
    'New follower',
    (SELECT name FROM profiles WHERE id = NEW.follower_id) || ' started following you',
    '/profile/' || (SELECT name FROM profiles WHERE id = NEW.follower_id)
  );

  RETURN NEW;
END;
$$;

-- Function to decrement follower counts
CREATE OR REPLACE FUNCTION decrement_follower_counts()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Decrement following_count for follower
  UPDATE profiles
  SET following_count = GREATEST(COALESCE(following_count, 0) - 1, 0)
  WHERE id = OLD.follower_id;

  -- Decrement followers_count for following
  UPDATE profiles
  SET followers_count = GREATEST(COALESCE(followers_count, 0) - 1, 0)
  WHERE id = OLD.following_id;

  RETURN OLD;
END;
$$;

-- Triggers for follow counts
DROP TRIGGER IF EXISTS on_follow_created ON follows;
CREATE TRIGGER on_follow_created
AFTER INSERT ON follows
FOR EACH ROW
EXECUTE FUNCTION increment_follower_counts();

DROP TRIGGER IF EXISTS on_follow_deleted ON follows;
CREATE TRIGGER on_follow_deleted
AFTER DELETE ON follows
FOR EACH ROW
EXECUTE FUNCTION decrement_follower_counts();

-- Function to check if user follows another
CREATE OR REPLACE FUNCTION is_following(user_id UUID, target_id UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM follows
    WHERE follower_id = user_id AND following_id = target_id
  );
END;
$$;

-- Comments for documentation
COMMENT ON TABLE follows IS 'User follow relationships';
COMMENT ON FUNCTION is_following IS 'Check if a user follows another user';
