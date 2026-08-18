-- Flyway Migration V1.0.0
-- Creation of Enrollment Schema

CREATE SCHEMA IF NOT EXISTS siakad_enrollment;

CREATE TABLE siakad_enrollment.enrollments (
    enrollment_id VARCHAR(50) PRIMARY KEY,
    student_id VARCHAR(50) NOT NULL,
    class_section_id VARCHAR(50) NOT NULL,
    study_plan_id VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL,
    CONSTRAINT uq_enrollment UNIQUE (student_id, class_section_id)
);
