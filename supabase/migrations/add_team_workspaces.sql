-- Create teams table
CREATE TABLE IF NOT EXISTS teams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  avatar_url TEXT,
  owner_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  plan TEXT DEFAULT 'team' CHECK (plan IN ('team', 'business')),
  max_members INTEGER DEFAULT 10,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create team members table
CREATE TABLE IF NOT EXISTS team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('owner', 'admin', 'editor', 'viewer')),
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(team_id, user_id)
);

-- Create team collections table (shared collections)
CREATE TABLE IF NOT EXISTS team_collections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  created_by UUID NOT NULL REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create team collection items
CREATE TABLE IF NOT EXISTS team_collection_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  collection_id UUID NOT NULL REFERENCES team_collections(id) ON DELETE CASCADE,
  prompt_id UUID NOT NULL REFERENCES prompts(id) ON DELETE CASCADE,
  added_by UUID NOT NULL REFERENCES auth.users(id),
  added_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(collection_id, prompt_id)
);

-- Create team activity log
CREATE TABLE IF NOT EXISTS team_activity (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id),
  action TEXT NOT NULL,
  details JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create team invitations
CREATE TABLE IF NOT EXISTS team_invitations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin', 'editor', 'viewer')),
  invited_by UUID NOT NULL REFERENCES auth.users(id),
  token TEXT UNIQUE NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  accepted_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(team_id, email)
);

-- Enable RLS
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_collection_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_activity ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_invitations ENABLE ROW LEVEL SECURITY;

-- RLS Policies for teams
CREATE POLICY "Team members can view their teams"
ON teams FOR SELECT
USING (
  id IN (
    SELECT team_id FROM team_members WHERE user_id = auth.uid()
  )
);

CREATE POLICY "Team owners can update their teams"
ON teams FOR UPDATE
USING (owner_id = auth.uid());

CREATE POLICY "Anyone can create a team"
ON teams FOR INSERT
WITH CHECK (owner_id = auth.uid());

-- RLS Policies for team_members
CREATE POLICY "Team members can view team members"
ON team_members FOR SELECT
USING (
  team_id IN (
    SELECT team_id FROM team_members WHERE user_id = auth.uid()
  )
);

CREATE POLICY "Team owners and admins can add members"
ON team_members FOR INSERT
WITH CHECK (
  team_id IN (
    SELECT team_id FROM team_members
    WHERE user_id = auth.uid() AND role IN ('owner', 'admin')
  )
);

CREATE POLICY "Team owners and admins can remove members"
ON team_members FOR DELETE
USING (
  team_id IN (
    SELECT team_id FROM team_members
    WHERE user_id = auth.uid() AND role IN ('owner', 'admin')
  )
);

-- RLS Policies for team_collections
CREATE POLICY "Team members can view team collections"
ON team_collections FOR SELECT
USING (
  team_id IN (
    SELECT team_id FROM team_members WHERE user_id = auth.uid()
  )
);

CREATE POLICY "Team editors can create collections"
ON team_collections FOR INSERT
WITH CHECK (
  team_id IN (
    SELECT team_id FROM team_members
    WHERE user_id = auth.uid() AND role IN ('owner', 'admin', 'editor')
  )
);

CREATE POLICY "Collection creators can update their collections"
ON team_collections FOR UPDATE
USING (created_by = auth.uid());

-- RLS Policies for team_collection_items
CREATE POLICY "Team members can view collection items"
ON team_collection_items FOR SELECT
USING (
  collection_id IN (
    SELECT id FROM team_collections
    WHERE team_id IN (
      SELECT team_id FROM team_members WHERE user_id = auth.uid()
    )
  )
);

CREATE POLICY "Team editors can add items to collections"
ON team_collection_items FOR INSERT
WITH CHECK (
  collection_id IN (
    SELECT tc.id FROM team_collections tc
    JOIN team_members tm ON tc.team_id = tm.team_id
    WHERE tm.user_id = auth.uid() AND tm.role IN ('owner', 'admin', 'editor')
  )
);

-- RLS Policies for team_activity
CREATE POLICY "Team members can view team activity"
ON team_activity FOR SELECT
USING (
  team_id IN (
    SELECT team_id FROM team_members WHERE user_id = auth.uid()
  )
);

CREATE POLICY "Team members can create activity logs"
ON team_activity FOR INSERT
WITH CHECK (user_id = auth.uid());

-- RLS Policies for team_invitations
CREATE POLICY "Team members can view invitations"
ON team_invitations FOR SELECT
USING (
  team_id IN (
    SELECT team_id FROM team_members WHERE user_id = auth.uid()
  )
  OR email = (SELECT email FROM auth.users WHERE id = auth.uid())
);

CREATE POLICY "Team owners and admins can create invitations"
ON team_invitations FOR INSERT
WITH CHECK (
  team_id IN (
    SELECT team_id FROM team_members
    WHERE user_id = auth.uid() AND role IN ('owner', 'admin')
  )
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_teams_owner ON teams(owner_id);
CREATE INDEX IF NOT EXISTS idx_teams_slug ON teams(slug);
CREATE INDEX IF NOT EXISTS idx_team_members_team ON team_members(team_id);
CREATE INDEX IF NOT EXISTS idx_team_members_user ON team_members(user_id);
CREATE INDEX IF NOT EXISTS idx_team_collections_team ON team_collections(team_id);
CREATE INDEX IF NOT EXISTS idx_team_activity_team ON team_activity(team_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_team_invitations_token ON team_invitations(token);
CREATE INDEX IF NOT EXISTS idx_team_invitations_email ON team_invitations(email);

-- Function to log team activity
CREATE OR REPLACE FUNCTION log_team_activity(
  team_uuid UUID,
  action_name TEXT,
  action_details JSONB DEFAULT NULL
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  activity_id UUID;
BEGIN
  INSERT INTO team_activity (team_id, user_id, action, details)
  VALUES (team_uuid, auth.uid(), action_name, action_details)
  RETURNING id INTO activity_id;

  RETURN activity_id;
END;
$$;

-- Function to check team membership
CREATE OR REPLACE FUNCTION is_team_member(team_uuid UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM team_members
    WHERE team_id = team_uuid AND user_id = auth.uid()
  );
END;
$$;

-- Function to check team role
CREATE OR REPLACE FUNCTION get_team_role(team_uuid UUID)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  user_role TEXT;
BEGIN
  SELECT role INTO user_role
  FROM team_members
  WHERE team_id = team_uuid AND user_id = auth.uid();

  RETURN user_role;
END;
$$;

-- Trigger to add owner as team member
CREATE OR REPLACE FUNCTION add_owner_to_team()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO team_members (team_id, user_id, role)
  VALUES (NEW.id, NEW.owner_id, 'owner');

  PERFORM log_team_activity(NEW.id, 'team_created', jsonb_build_object('team_name', NEW.name));

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_team_created ON teams;
CREATE TRIGGER on_team_created
AFTER INSERT ON teams
FOR EACH ROW
EXECUTE FUNCTION add_owner_to_team();

-- Comments for documentation
COMMENT ON TABLE teams IS 'Team workspaces for collaboration';
COMMENT ON TABLE team_members IS 'Team membership and roles';
COMMENT ON TABLE team_collections IS 'Shared collections within teams';
COMMENT ON TABLE team_activity IS 'Activity log for team actions';
COMMENT ON TABLE team_invitations IS 'Pending team invitations';
