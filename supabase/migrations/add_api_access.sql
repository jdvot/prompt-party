-- Create API keys table
CREATE TABLE IF NOT EXISTS api_keys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  key_hash TEXT UNIQUE NOT NULL,
  key_prefix TEXT NOT NULL,
  last_used_at TIMESTAMP WITH TIME ZONE,
  requests_count INTEGER DEFAULT 0,
  monthly_limit INTEGER DEFAULT 10000,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE
);

-- Create API request logs table
CREATE TABLE IF NOT EXISTS api_request_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  api_key_id UUID REFERENCES api_keys(id) ON DELETE SET NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  endpoint TEXT NOT NULL,
  method TEXT NOT NULL,
  status_code INTEGER,
  response_time_ms INTEGER,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_request_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies for api_keys
CREATE POLICY "Users can view own API keys"
ON api_keys FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create own API keys"
ON api_keys FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own API keys"
ON api_keys FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own API keys"
ON api_keys FOR DELETE
USING (auth.uid() = user_id);

-- RLS Policies for api_request_logs
CREATE POLICY "Users can view own API logs"
ON api_request_logs FOR SELECT
USING (
  user_id = auth.uid() OR
  api_key_id IN (SELECT id FROM api_keys WHERE user_id = auth.uid())
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_api_keys_user ON api_keys(user_id);
CREATE INDEX IF NOT EXISTS idx_api_keys_hash ON api_keys(key_hash);
CREATE INDEX IF NOT EXISTS idx_api_keys_prefix ON api_keys(key_prefix);
CREATE INDEX IF NOT EXISTS idx_api_request_logs_key ON api_request_logs(api_key_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_api_request_logs_user ON api_request_logs(user_id, created_at DESC);

-- Function to reset monthly API usage
CREATE OR REPLACE FUNCTION reset_monthly_api_usage()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE api_keys
  SET requests_count = 0
  WHERE is_active = true;
END;
$$;

-- Function to check API rate limit
CREATE OR REPLACE FUNCTION check_api_rate_limit(key_hash_input TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  api_key_record RECORD;
BEGIN
  SELECT * INTO api_key_record
  FROM api_keys
  WHERE key_hash = key_hash_input AND is_active = true;

  IF NOT FOUND THEN
    RETURN false;
  END IF;

  -- Check if expired
  IF api_key_record.expires_at IS NOT NULL AND api_key_record.expires_at < NOW() THEN
    RETURN false;
  END IF;

  -- Check monthly limit
  IF api_key_record.requests_count >= api_key_record.monthly_limit THEN
    RETURN false;
  END IF;

  RETURN true;
END;
$$;

-- Function to increment API usage
CREATE OR REPLACE FUNCTION increment_api_usage(key_hash_input TEXT)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE api_keys
  SET
    requests_count = requests_count + 1,
    last_used_at = NOW()
  WHERE key_hash = key_hash_input;
END;
$$;

-- Function to log API request
CREATE OR REPLACE FUNCTION log_api_request(
  key_id UUID,
  endpoint_path TEXT,
  http_method TEXT,
  status INTEGER,
  response_time INTEGER,
  ip TEXT DEFAULT NULL,
  agent TEXT DEFAULT NULL
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  log_id UUID;
  key_user_id UUID;
BEGIN
  -- Get user_id from api_key
  SELECT user_id INTO key_user_id
  FROM api_keys
  WHERE id = key_id;

  INSERT INTO api_request_logs (
    api_key_id,
    user_id,
    endpoint,
    method,
    status_code,
    response_time_ms,
    ip_address,
    user_agent
  )
  VALUES (
    key_id,
    key_user_id,
    endpoint_path,
    http_method,
    status,
    response_time,
    ip,
    agent
  )
  RETURNING id INTO log_id;

  RETURN log_id;
END;
$$;

-- Comments for documentation
COMMENT ON TABLE api_keys IS 'API keys for Business tier users';
COMMENT ON TABLE api_request_logs IS 'Logs of API requests for analytics and monitoring';
COMMENT ON FUNCTION reset_monthly_api_usage IS 'Resets API usage counters monthly (run via cron)';
COMMENT ON FUNCTION check_api_rate_limit IS 'Check if an API key has available quota';
COMMENT ON FUNCTION increment_api_usage IS 'Increment API usage count for a key';
COMMENT ON FUNCTION log_api_request IS 'Log an API request for analytics';
