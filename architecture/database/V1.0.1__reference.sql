-- Flyway Migration
-- Version: V1.0.1
-- Description: Core Reference Data Injection

INSERT INTO kernel.academic_ranks (code, name) VALUES
('AA', 'Asisten Ahli'),
('L', 'Lektor'),
('LK', 'Lektor Kepala'),
('GB', 'Guru Besar');

INSERT INTO kernel.countries (iso_code, name) VALUES
('ID', 'Indonesia'),
('MY', 'Malaysia'),
('SG', 'Singapore');
