-- Create challenges table
CREATE TABLE IF NOT EXISTS challenges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('creativity', 'code', 'marketing', 'writing', 'general')),
  difficulty TEXT NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard')),
  reward_credits INTEGER DEFAULT 0,
  starts_at TIMESTAMP WITH TIME ZONE NOT NULL,
  ends_at TIMESTAMP WITH TIME ZONE NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create challenge submissions table
CREATE TABLE IF NOT EXISTS challenge_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  challenge_id UUID NOT NULL REFERENCES challenges(id) ON DELETE CASCADE,
  prompt_id UUID NOT NULL REFERENCES prompts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  votes_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(challenge_id, prompt_id)
);

-- Create challenge votes table
CREATE TABLE IF NOT EXISTS challenge_votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  submission_id UUID NOT NULL REFERENCES challenge_submissions(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(submission_id, user_id)
);

-- Enable RLS
ALTER TABLE challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE challenge_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE challenge_votes ENABLE ROW LEVEL SECURITY;

-- RLS Policies for challenges
CREATE POLICY "Anyone can view active challenges"
ON challenges FOR SELECT
USING (is_active = true);

-- RLS Policies for submissions
CREATE POLICY "Anyone can view challenge submissions"
ON challenge_submissions FOR SELECT
USING (true);

CREATE POLICY "Users can create own submissions"
ON challenge_submissions FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own submissions"
ON challenge_submissions FOR UPDATE
USING (auth.uid() = user_id);

-- RLS Policies for votes
CREATE POLICY "Anyone can view challenge votes"
ON challenge_votes FOR SELECT
USING (true);

CREATE POLICY "Users can create own votes"
ON challenge_votes FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own votes"
ON challenge_votes FOR DELETE
USING (auth.uid() = user_id);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_challenges_active_dates ON challenges(is_active, starts_at DESC, ends_at DESC);
CREATE INDEX IF NOT EXISTS idx_submissions_challenge ON challenge_submissions(challenge_id, votes_count DESC);
CREATE INDEX IF NOT EXISTS idx_submissions_user ON challenge_submissions(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_votes_submission ON challenge_votes(submission_id);

-- Function to increment submission votes
CREATE OR REPLACE FUNCTION increment_submission_votes(submission_uuid UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE challenge_submissions
  SET votes_count = COALESCE(votes_count, 0) + 1
  WHERE id = submission_uuid;
END;
$$;

-- Function to decrement submission votes
CREATE OR REPLACE FUNCTION decrement_submission_votes(submission_uuid UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE challenge_submissions
  SET votes_count = GREATEST(COALESCE(votes_count, 0) - 1, 0)
  WHERE id = submission_uuid;
END;
$$;

-- Insert sample challenges
INSERT INTO challenges (title, description, category, difficulty, reward_credits, starts_at, ends_at)
VALUES
  (
    'Creative Writing Prompt',
    'Create the most imaginative creative writing prompt that inspires storytellers',
    'creativity',
    'easy',
    5,
    NOW(),
    NOW() + INTERVAL '7 days'
  ),
  (
    'Code Assistant Challenge',
    'Build the perfect coding assistant prompt that helps developers debug faster',
    'code',
    'medium',
    10,
    NOW(),
    NOW() + INTERVAL '7 days'
  ),
  (
    'Marketing Copy Master',
    'Craft a prompt that generates compelling marketing copy for any product',
    'marketing',
    'hard',
    15,
    NOW(),
    NOW() + INTERVAL '7 days'
  )
ON CONFLICT DO NOTHING;

-- Comments for documentation
COMMENT ON TABLE challenges IS 'Weekly/monthly prompt challenges for community engagement';
COMMENT ON TABLE challenge_submissions IS 'User submissions to challenges';
COMMENT ON TABLE challenge_votes IS 'Community votes on challenge submissions';
