-- ================================================
-- GAMIFICATION SYSTEM
-- ================================================
-- System for points, badges, levels, challenges, and leaderboard

-- User Progress Table
CREATE TABLE IF NOT EXISTS user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  points INTEGER DEFAULT 0,
  level TEXT DEFAULT 'beginner' CHECK (level IN ('beginner', 'intermediate', 'expert', 'master', 'legend')),
  streak_days INTEGER DEFAULT 0,
  last_activity_date DATE DEFAULT CURRENT_DATE,
  lessons_completed INTEGER DEFAULT 0,
  prompts_created INTEGER DEFAULT 0,
  prompts_shared INTEGER DEFAULT 0,
  people_helped INTEGER DEFAULT 0,
  challenges_completed INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Badges Table (definitions)
CREATE TABLE IF NOT EXISTS badges (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('learning', 'community', 'achievement', 'special')),
  points_required INTEGER,
  condition_type TEXT, -- 'lessons_completed', 'prompts_shared', 'people_helped', etc.
  condition_value INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- User Badges Table (earned badges)
CREATE TABLE IF NOT EXISTS user_badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  badge_id TEXT NOT NULL REFERENCES badges(id) ON DELETE CASCADE,
  earned_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, badge_id)
);

-- Challenges Table
CREATE TABLE IF NOT EXISTS challenges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('weekly', 'monthly', 'special')),
  category TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  reward_points INTEGER DEFAULT 0,
  reward_badge_id TEXT REFERENCES badges(id),
  goal_type TEXT NOT NULL, -- 'lessons', 'prompts', 'help', etc.
  goal_value INTEGER NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- User Challenge Progress Table
CREATE TABLE IF NOT EXISTS user_challenge_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  challenge_id UUID NOT NULL REFERENCES challenges(id) ON DELETE CASCADE,
  current_progress INTEGER DEFAULT 0,
  completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, challenge_id)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_points ON user_progress(points DESC);
CREATE INDEX IF NOT EXISTS idx_user_progress_level ON user_progress(level);
CREATE INDEX IF NOT EXISTS idx_user_badges_user_id ON user_badges(user_id);
CREATE INDEX IF NOT EXISTS idx_user_badges_badge_id ON user_badges(badge_id);
CREATE INDEX IF NOT EXISTS idx_challenges_type ON challenges(type);
CREATE INDEX IF NOT EXISTS idx_challenges_active ON challenges(is_active);
CREATE INDEX IF NOT EXISTS idx_user_challenge_progress_user_id ON user_challenge_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_challenge_progress_challenge_id ON user_challenge_progress(challenge_id);

-- RLS Policies
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_challenge_progress ENABLE ROW LEVEL SECURITY;

-- User Progress Policies
CREATE POLICY "Users can view all progress"
  ON user_progress FOR SELECT
  USING (true);

CREATE POLICY "Users can update own progress"
  ON user_progress FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "System can insert progress"
  ON user_progress FOR INSERT
  WITH CHECK (true);

-- Badges Policies
CREATE POLICY "Everyone can view badges"
  ON badges FOR SELECT
  USING (true);

-- User Badges Policies
CREATE POLICY "Everyone can view user badges"
  ON user_badges FOR SELECT
  USING (true);

CREATE POLICY "System can award badges"
  ON user_badges FOR INSERT
  WITH CHECK (true);

-- Challenges Policies
CREATE POLICY "Everyone can view active challenges"
  ON challenges FOR SELECT
  USING (is_active = true);

-- User Challenge Progress Policies
CREATE POLICY "Users can view all challenge progress"
  ON user_challenge_progress FOR SELECT
  USING (true);

CREATE POLICY "Users can update own challenge progress"
  ON user_challenge_progress FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Function to update user progress
CREATE OR REPLACE FUNCTION update_user_progress()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();

  -- Update level based on points
  IF NEW.points >= 5000 THEN
    NEW.level = 'legend';
  ELSIF NEW.points >= 2000 THEN
    NEW.level = 'master';
  ELSIF NEW.points >= 800 THEN
    NEW.level = 'expert';
  ELSIF NEW.points >= 300 THEN
    NEW.level = 'intermediate';
  ELSE
    NEW.level = 'beginner';
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_user_progress
  BEFORE UPDATE ON user_progress
  FOR EACH ROW
  EXECUTE FUNCTION update_user_progress();

-- Function to create user progress on signup
CREATE OR REPLACE FUNCTION create_user_progress()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_progress (user_id)
  VALUES (NEW.id)
  ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_user_created_progress
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION create_user_progress();

-- Insert default badges
INSERT INTO badges (id, name, description, icon, category, condition_type, condition_value) VALUES
  ('first_lesson', 'Premier Pas', 'Complète ta première leçon', '✨', 'learning', 'lessons_completed', 1),
  ('beginner_path', 'Débutant Certifié', 'Termine le parcours Débutant', '🎓', 'learning', 'lessons_completed', 5),
  ('intermediate_path', 'Intermédiaire Certifié', 'Termine le parcours Intermédiaire', '🧠', 'learning', 'lessons_completed', 13),
  ('expert_path', 'Expert Certifié', 'Termine le parcours Avancé', '🚀', 'learning', 'lessons_completed', 23),
  ('first_prompt', 'Créateur', 'Partage ton premier prompt', '💡', 'community', 'prompts_shared', 1),
  ('active_creator', 'Contributeur', 'Partage 5 prompts', '⭐', 'community', 'prompts_shared', 5),
  ('prolific_creator', 'Contributeur Légendaire', 'Partage 50 prompts', '💎', 'community', 'prompts_shared', 50),
  ('helper', 'Mentor', 'Aide 3 personnes', '🤝', 'community', 'people_helped', 3),
  ('super_helper', 'Mentor Expert', 'Aide 10 personnes', '🎓', 'community', 'people_helped', 10),
  ('legend_helper', 'Mentor Légendaire', 'Aide 50 personnes', '🏆', 'community', 'people_helped', 50),
  ('streak_3', 'Régulier', '3 jours consécutifs', '🔥', 'achievement', NULL, NULL),
  ('streak_7', 'Dévoué', '7 jours consécutifs', '🔥🔥', 'achievement', NULL, NULL),
  ('streak_30', 'Passionné', '30 jours consécutifs', '🔥🔥🔥', 'achievement', NULL, NULL),
  ('early_adopter', 'Early Adopter', 'Parmi les 100 premiers', '💎', 'special', NULL, NULL),
  ('supporter', 'Supporter', 'Soutient le projet', '💚', 'special', NULL, NULL)
ON CONFLICT (id) DO NOTHING;

-- Insert sample challenges
INSERT INTO challenges (title, description, type, category, start_date, end_date, reward_points, goal_type, goal_value) VALUES
  ('Challenge Hebdo - Apprendre', 'Complète 2 leçons cette semaine', 'weekly', 'learning', CURRENT_DATE, CURRENT_DATE + INTERVAL '7 days', 50, 'lessons', 2),
  ('Challenge Hebdo - Partager', 'Crée et partage 1 prompt', 'weekly', 'community', CURRENT_DATE, CURRENT_DATE + INTERVAL '7 days', 30, 'prompts', 1),
  ('Challenge Mensuel - Expert', 'Complète 5 leçons ce mois', 'monthly', 'learning', DATE_TRUNC('month', CURRENT_DATE), DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '1 month', 200, 'lessons', 5)
ON CONFLICT DO NOTHING;

COMMENT ON TABLE user_progress IS 'Tracks user progression, points, level, and streak';
COMMENT ON TABLE badges IS 'Badge definitions and requirements';
COMMENT ON TABLE user_badges IS 'Badges earned by users';
COMMENT ON TABLE challenges IS 'Weekly and monthly challenges';
COMMENT ON TABLE user_challenge_progress IS 'User progress on challenges';
