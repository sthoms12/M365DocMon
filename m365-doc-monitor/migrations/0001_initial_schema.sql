-- Documentation Mappings Table
CREATE TABLE doc_mappings (
  id TEXT PRIMARY KEY,
  ms_learn_url TEXT NOT NULL UNIQUE,
  internal_kb_urls TEXT NOT NULL,
  github_source TEXT,
  last_checked_timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
  status TEXT DEFAULT 'active'
);

-- Change Log Table
CREATE TABLE change_logs (
  id TEXT PRIMARY KEY,
  doc_mapping_id TEXT NOT NULL,
  change_type TEXT NOT NULL,
  change_description TEXT,
  detected_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (doc_mapping_id) REFERENCES doc_mappings(id)
);