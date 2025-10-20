-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('comment', 'like', 'remix', 'challenge', 'follow', 'system')),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  link TEXT,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create notification preferences table
CREATE TABLE IF NOT EXISTS notification_preferences (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email_comments BOOLEAN DEFAULT true,
  email_likes BOOLEAN DEFAULT true,
  email_remixes BOOLEAN DEFAULT true,
  email_challenges BOOLEAN DEFAULT true,
  email_follows BOOLEAN DEFAULT true,
  email_weekly_digest BOOLEAN DEFAULT true,
  push_comments BOOLEAN DEFAULT false,
  push_likes BOOLEAN DEFAULT false,
  push_remixes BOOLEAN DEFAULT true,
  push_challenges BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE notification_preferences ENABLE ROW LEVEL SECURITY;

-- RLS Policies for notifications
CREATE POLICY "Users can view own notifications"
ON notifications FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can update own notifications"
ON notifications FOR UPDATE
USING (auth.uid() = user_id);

-- RLS Policies for preferences
CREATE POLICY "Users can view own preferences"
ON notification_preferences FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own preferences"
ON notification_preferences FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own preferences"
ON notification_preferences FOR UPDATE
USING (auth.uid() = user_id);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_notifications_user_created ON notifications(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_notifications_user_unread ON notifications(user_id, read) WHERE read = false;

-- Function to create notification
CREATE OR REPLACE FUNCTION create_notification(
  recipient_id UUID,
  notification_type TEXT,
  notification_title TEXT,
  notification_message TEXT,
  notification_link TEXT DEFAULT NULL
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  notification_id UUID;
BEGIN
  INSERT INTO notifications (user_id, type, title, message, link)
  VALUES (recipient_id, notification_type, notification_title, notification_message, notification_link)
  RETURNING id INTO notification_id;

  RETURN notification_id;
END;
$$;

-- Function to mark notification as read
CREATE OR REPLACE FUNCTION mark_notification_read(notification_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE notifications
  SET read = true
  WHERE id = notification_id AND user_id = auth.uid();
END;
$$;

-- Function to mark all notifications as read
CREATE OR REPLACE FUNCTION mark_all_notifications_read()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE notifications
  SET read = true
  WHERE user_id = auth.uid() AND read = false;
END;
$$;

-- Trigger to create notification when comment is added
CREATE OR REPLACE FUNCTION notify_comment()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  prompt_author UUID;
  prompt_title TEXT;
  commenter_name TEXT;
BEGIN
  -- Get prompt author and title
  SELECT author, title INTO prompt_author, prompt_title
  FROM prompts
  WHERE id = NEW.prompt_id;

  -- Get commenter name
  SELECT name INTO commenter_name
  FROM profiles
  WHERE id = NEW.author;

  -- Don't notify if user is commenting on their own prompt
  IF prompt_author != NEW.author THEN
    -- Check if user wants email notifications for comments
    IF EXISTS (
      SELECT 1 FROM notification_preferences
      WHERE user_id = prompt_author AND email_comments = true
    ) OR NOT EXISTS (
      SELECT 1 FROM notification_preferences WHERE user_id = prompt_author
    ) THEN
      PERFORM create_notification(
        prompt_author,
        'comment',
        'New comment on your prompt',
        commenter_name || ' commented on "' || prompt_title || '"',
        '/prompts/' || NEW.prompt_id
      );
    END IF;
  END IF;

  RETURN NEW;
END;
$$;

-- Trigger to create notification when like is added
CREATE OR REPLACE FUNCTION notify_like()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  prompt_author UUID;
  prompt_title TEXT;
  liker_name TEXT;
BEGIN
  -- Get prompt author and title
  SELECT author, title INTO prompt_author, prompt_title
  FROM prompts
  WHERE id = NEW.prompt_id;

  -- Get liker name
  SELECT name INTO liker_name
  FROM profiles
  WHERE id = NEW.user_id;

  -- Don't notify if user is liking their own prompt
  IF prompt_author != NEW.user_id THEN
    -- Check if user wants email notifications for likes
    IF EXISTS (
      SELECT 1 FROM notification_preferences
      WHERE user_id = prompt_author AND email_likes = true
    ) OR NOT EXISTS (
      SELECT 1 FROM notification_preferences WHERE user_id = prompt_author
    ) THEN
      PERFORM create_notification(
        prompt_author,
        'like',
        'Someone liked your prompt',
        liker_name || ' liked "' || prompt_title || '"',
        '/prompts/' || NEW.prompt_id
      );
    END IF;
  END IF;

  RETURN NEW;
END;
$$;

-- Trigger to create notification when remix is created
CREATE OR REPLACE FUNCTION notify_remix()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  original_author UUID;
  original_title TEXT;
  remixer_name TEXT;
BEGIN
  -- Get original prompt author and title
  SELECT author, title INTO original_author, original_title
  FROM prompts
  WHERE id = NEW.original_id;

  -- Get remixer name
  SELECT name INTO remixer_name
  FROM profiles
  WHERE id = NEW.fork_author;

  -- Don't notify if user is remixing their own prompt
  IF original_author != NEW.fork_author THEN
    -- Check if user wants email notifications for remixes
    IF EXISTS (
      SELECT 1 FROM notification_preferences
      WHERE user_id = original_author AND email_remixes = true
    ) OR NOT EXISTS (
      SELECT 1 FROM notification_preferences WHERE user_id = original_author
    ) THEN
      PERFORM create_notification(
        original_author,
        'remix',
        'Your prompt was remixed',
        remixer_name || ' remixed "' || original_title || '"',
        '/prompts/' || NEW.fork_id
      );
    END IF;
  END IF;

  RETURN NEW;
END;
$$;

-- Create triggers
DROP TRIGGER IF EXISTS on_comment_created ON comments;
CREATE TRIGGER on_comment_created
AFTER INSERT ON comments
FOR EACH ROW
EXECUTE FUNCTION notify_comment();

DROP TRIGGER IF EXISTS on_like_created ON likes;
CREATE TRIGGER on_like_created
AFTER INSERT ON likes
FOR EACH ROW
EXECUTE FUNCTION notify_like();

DROP TRIGGER IF EXISTS on_fork_created ON forks;
CREATE TRIGGER on_fork_created
AFTER INSERT ON forks
FOR EACH ROW
EXECUTE FUNCTION notify_remix();

-- Insert default notification preferences for existing users
INSERT INTO notification_preferences (user_id)
SELECT id FROM auth.users
WHERE id NOT IN (SELECT user_id FROM notification_preferences)
ON CONFLICT (user_id) DO NOTHING;

-- Comments for documentation
COMMENT ON TABLE notifications IS 'User notifications for comments, likes, remixes, etc.';
COMMENT ON TABLE notification_preferences IS 'User preferences for email and push notifications';
COMMENT ON FUNCTION create_notification IS 'Creates a new notification for a user';
COMMENT ON FUNCTION mark_notification_read IS 'Marks a single notification as read';
COMMENT ON FUNCTION mark_all_notifications_read IS 'Marks all user notifications as read';
