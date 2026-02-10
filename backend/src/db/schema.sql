-- Master DB: project_registry
CREATE TABLE IF NOT EXISTS organizations (
  id UUID PRIMARY KEY,
  org_name TEXT NOT NULL,
  logo_url TEXT,
  admin_contact TEXT NOT NULL,
  license_type TEXT CHECK (license_type IN ('Trial', 'Pro')),
  tenant_db_name TEXT UNIQUE NOT NULL,
  tenant_code TEXT UNIQUE NOT NULL,
  qr_code TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS activity_logs (
  id BIGSERIAL PRIMARY KEY,
  actor_id TEXT NOT NULL,
  actor_role TEXT NOT NULL,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  tenant_code TEXT NOT NULL,
  meta JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Per tenant DB template: project_time_manager{N}
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY,
  role TEXT NOT NULL,
  display_name TEXT NOT NULL,
  email_or_phone TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  created_by UUID NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS tasks (
  id UUID PRIMARY KEY,
  project_id UUID NOT NULL,
  title TEXT NOT NULL,
  status TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
