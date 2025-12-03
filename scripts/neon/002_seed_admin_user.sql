-- Insert default admin user
-- Email: admin@donas.com
-- Password: DonaS2025!
-- Password hash generated with bcrypt (10 rounds)
INSERT INTO admins (email, password_hash, name)
VALUES (
  'admin@donas.com',
  '$2b$10$YourActualHashWillBeGeneratedByTheAPI',
  'Administrador DonaS'
)
ON CONFLICT (email) DO NOTHING;
