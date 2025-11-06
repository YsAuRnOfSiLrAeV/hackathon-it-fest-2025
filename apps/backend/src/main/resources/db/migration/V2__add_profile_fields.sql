ALTER TABLE app_user
    ADD COLUMN IF NOT EXISTS github_url   varchar(255),
    ADD COLUMN IF NOT EXISTS linkedin_url varchar(255),
    ADD COLUMN IF NOT EXISTS website_url  varchar(255),
    ADD COLUMN IF NOT EXISTS bio          text,
    ADD COLUMN IF NOT EXISTS last_login_at timestamp NULL;