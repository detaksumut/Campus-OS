-- Flyway Migration
-- Version: V1.0.2
-- Description: Core Master Data Injection

INSERT INTO academic.semesters (academic_year, term, start_date, end_date, is_active) VALUES
('2026/2027', 'Ganjil', '2026-08-01', '2026-12-31', true),
('2026/2027', 'Genap', '2027-02-01', '2027-06-30', false);
