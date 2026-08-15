-- DevForge database schema
CREATE TABLE IF NOT EXISTS projects (
  id BIGSERIAL PRIMARY KEY,
  title VARCHAR(120) NOT NULL,
  category VARCHAR(60) NOT NULL,
  technologies TEXT[] NOT NULL DEFAULT '{}',
  status VARCHAR(40) NOT NULL DEFAULT 'New',
  score INTEGER NOT NULL DEFAULT 100 CHECK (score BETWEEN 0 AND 100),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS contact_messages (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS projects_category_idx ON projects(category);
CREATE INDEX IF NOT EXISTS projects_created_at_idx ON projects(created_at DESC);

INSERT INTO projects (title, category, technologies, status, score)
SELECT 'AI Content Studio', 'AI', ARRAY['Next.js','OpenAI','Supabase'], 'Live', 98
WHERE NOT EXISTS (SELECT 1 FROM projects WHERE title = 'AI Content Studio');
