-- Create prompt templates table
CREATE TABLE IF NOT EXISTS prompt_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL CHECK (category IN ('marketing', 'writing', 'code', 'business', 'education', 'creative', 'other')),
  template_body TEXT NOT NULL,
  variables JSONB DEFAULT '[]'::jsonb,
  use_count INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  is_premium BOOLEAN DEFAULT false,
  author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create template usage tracking
CREATE TABLE IF NOT EXISTS template_usage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  template_id UUID NOT NULL REFERENCES prompt_templates(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  prompt_id UUID REFERENCES prompts(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE prompt_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE template_usage ENABLE ROW LEVEL SECURITY;

-- RLS Policies for templates
CREATE POLICY "Anyone can view non-premium templates"
ON prompt_templates FOR SELECT
USING (is_premium = false OR auth.uid() IN (
  SELECT id FROM profiles WHERE plan IN ('pro', 'team', 'business')
));

CREATE POLICY "Pro users can view premium templates"
ON prompt_templates FOR SELECT
USING (
  is_premium = true AND auth.uid() IN (
    SELECT id FROM profiles WHERE plan IN ('pro', 'team', 'business')
  )
);

CREATE POLICY "Authors can manage own templates"
ON prompt_templates FOR ALL
USING (author_id = auth.uid())
WITH CHECK (author_id = auth.uid());

-- RLS Policies for template_usage
CREATE POLICY "Users can view own template usage"
ON template_usage FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can track own template usage"
ON template_usage FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_templates_category ON prompt_templates(category);
CREATE INDEX IF NOT EXISTS idx_templates_featured ON prompt_templates(is_featured) WHERE is_featured = true;
CREATE INDEX IF NOT EXISTS idx_templates_use_count ON prompt_templates(use_count DESC);
CREATE INDEX IF NOT EXISTS idx_template_usage_template ON template_usage(template_id);
CREATE INDEX IF NOT EXISTS idx_template_usage_user ON template_usage(user_id);

-- Function to increment template usage
CREATE OR REPLACE FUNCTION increment_template_usage(template_uuid UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE prompt_templates
  SET use_count = COALESCE(use_count, 0) + 1
  WHERE id = template_uuid;
END;
$$;

-- Insert starter templates
INSERT INTO prompt_templates (title, description, category, template_body, variables, is_featured) VALUES
(
  'Blog Post Outline',
  'Generate a comprehensive blog post outline on any topic',
  'writing',
  'Create a detailed blog post outline about {{topic}}. Include:\n- Catchy title\n- Introduction hook\n- 5 main sections with subpoints\n- Conclusion with call-to-action\n- Target audience: {{audience}}',
  '[{"name": "topic", "type": "text", "placeholder": "AI in Healthcare"}, {"name": "audience", "type": "text", "placeholder": "Healthcare professionals"}]'::jsonb,
  true
),
(
  'Product Description',
  'Create compelling product descriptions that convert',
  'marketing',
  'Write a persuasive product description for {{product_name}}.\n\nKey features:\n{{features}}\n\nTarget customer: {{target_customer}}\n\nTone: {{tone}}\n\nInclude benefits, unique selling points, and a strong call-to-action.',
  '[{"name": "product_name", "type": "text"}, {"name": "features", "type": "textarea"}, {"name": "target_customer", "type": "text"}, {"name": "tone", "type": "select", "options": ["professional", "casual", "luxury", "technical"]}]'::jsonb,
  true
),
(
  'Code Review Assistant',
  'Get detailed code reviews and improvement suggestions',
  'code',
  'Review the following {{language}} code and provide:\n1. Code quality assessment\n2. Potential bugs or issues\n3. Performance improvements\n4. Best practices recommendations\n5. Security considerations\n\nCode:\n```{{language}}\n{{code}}\n```',
  '[{"name": "language", "type": "select", "options": ["javascript", "python", "typescript", "java", "go"]}, {"name": "code", "type": "textarea"}]'::jsonb,
  true
),
(
  'Meeting Agenda Creator',
  'Generate structured meeting agendas',
  'business',
  'Create a professional meeting agenda for:\n\nMeeting topic: {{topic}}\nDuration: {{duration}} minutes\nAttendees: {{attendees}}\nObjectives: {{objectives}}\n\nInclude time allocations, discussion points, and action items.',
  '[{"name": "topic", "type": "text"}, {"name": "duration", "type": "number"}, {"name": "attendees", "type": "text"}, {"name": "objectives", "type": "textarea"}]'::jsonb,
  false
),
(
  'Social Media Caption',
  'Craft engaging social media posts',
  'marketing',
  'Create an engaging {{platform}} post about {{subject}}.\n\nTone: {{tone}}\nInclude: {{include_elements}}\nCharacter limit: {{char_limit}}\n\nMake it shareable and include relevant hashtags.',
  '[{"name": "platform", "type": "select", "options": ["twitter", "linkedin", "instagram", "facebook"]}, {"name": "subject", "type": "text"}, {"name": "tone", "type": "text"}, {"name": "include_elements", "type": "text", "placeholder": "emoji, hashtags, CTA"}, {"name": "char_limit", "type": "number"}]'::jsonb,
  true
),
(
  'Email Subject Line Generator',
  'Generate high-converting email subject lines',
  'marketing',
  'Generate 10 compelling email subject lines for:\n\nCampaign: {{campaign_type}}\nTarget audience: {{audience}}\nKey message: {{message}}\nGoal: {{goal}}\n\nMake them attention-grabbing and A/B test ready.',
  '[{"name": "campaign_type", "type": "text"}, {"name": "audience", "type": "text"}, {"name": "message", "type": "text"}, {"name": "goal", "type": "select", "options": ["open rate", "click rate", "conversion"]}]'::jsonb,
  false
),
(
  'Learning Path Creator',
  'Design personalized learning paths',
  'education',
  'Create a comprehensive learning path for mastering {{skill}}.\n\nCurrent level: {{current_level}}\nGoal level: {{goal_level}}\nTime available: {{time_commitment}} hours/week\n\nInclude resources, milestones, and progress checkpoints.',
  '[{"name": "skill", "type": "text"}, {"name": "current_level", "type": "select", "options": ["beginner", "intermediate", "advanced"]}, {"name": "goal_level", "type": "select", "options": ["intermediate", "advanced", "expert"]}, {"name": "time_commitment", "type": "number"}]'::jsonb,
  false
),
(
  'Creative Story Starter',
  'Generate unique story beginnings',
  'creative',
  'Create a captivating story opening for a {{genre}} story.\n\nSetting: {{setting}}\nMain character: {{character}}\nConflict: {{conflict}}\nTone: {{tone}}\n\nWrite the first 3 paragraphs that hook the reader.',
  '[{"name": "genre", "type": "select", "options": ["sci-fi", "fantasy", "mystery", "romance", "thriller"]}, {"name": "setting", "type": "text"}, {"name": "character", "type": "text"}, {"name": "conflict", "type": "text"}, {"name": "tone", "type": "text"}]'::jsonb,
  true
),
(
  'API Documentation Generator',
  'Create clear API documentation',
  'code',
  'Generate API documentation for:\n\nEndpoint: {{endpoint}}\nMethod: {{method}}\nDescription: {{description}}\nParameters: {{parameters}}\nResponse format: {{response}}\n\nInclude examples, error codes, and authentication requirements.',
  '[{"name": "endpoint", "type": "text"}, {"name": "method", "type": "select", "options": ["GET", "POST", "PUT", "DELETE", "PATCH"]}, {"name": "description", "type": "textarea"}, {"name": "parameters", "type": "textarea"}, {"name": "response", "type": "textarea"}]'::jsonb,
  false
),
(
  'Resume Bullet Point Enhancer',
  'Transform resume bullets into achievement statements',
  'business',
  'Transform this resume bullet point into a compelling achievement statement:\n\n{{bullet_point}}\n\nJob role: {{role}}\nIndustry: {{industry}}\n\nUse action verbs, quantify results, and highlight impact.',
  '[{"name": "bullet_point", "type": "textarea"}, {"name": "role", "type": "text"}, {"name": "industry", "type": "text"}]'::jsonb,
  false
)
ON CONFLICT DO NOTHING;

-- Comments
COMMENT ON TABLE prompt_templates IS 'Reusable prompt templates with variables';
COMMENT ON TABLE template_usage IS 'Track template usage for analytics';
COMMENT ON FUNCTION increment_template_usage IS 'Increment template use counter';
