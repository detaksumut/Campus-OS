-- Flyway Migration V1.0.0
-- Creation of Study Plan Schema

CREATE SCHEMA IF NOT EXISTS siakad_study_plan;

CREATE TABLE siakad_study_plan.study_plans (
    plan_id VARCHAR(50) PRIMARY KEY,
    student_id VARCHAR(50) NOT NULL,
    academic_period_id VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL
);

CREATE TABLE siakad_study_plan.study_plan_items (
    plan_id VARCHAR(50) NOT NULL,
    section_id VARCHAR(50) NOT NULL,
    is_mandatory BOOLEAN NOT NULL,
    PRIMARY KEY (plan_id, section_id),
    CONSTRAINT fk_spi_plan FOREIGN KEY (plan_id) REFERENCES siakad_study_plan.study_plans (plan_id) ON DELETE CASCADE
);
