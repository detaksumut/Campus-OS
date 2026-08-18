-- Flyway Migration V1.0.0
-- Creation of Curriculum Schema

CREATE SCHEMA IF NOT EXISTS siakad_curriculum;

CREATE TABLE siakad_curriculum.curriculums (
    curriculum_id VARCHAR(50) PRIMARY KEY,
    study_program_id VARCHAR(50) NOT NULL,
    name VARCHAR(255) NOT NULL,
    start_year VARCHAR(10) NOT NULL,
    status VARCHAR(50) NOT NULL
);

CREATE TABLE siakad_curriculum.courses (
    course_id VARCHAR(50) PRIMARY KEY,
    code VARCHAR(50) NOT NULL,
    name VARCHAR(255) NOT NULL,
    credits INT NOT NULL,
    type VARCHAR(50) NOT NULL
);

CREATE TABLE siakad_curriculum.curriculum_courses (
    curriculum_id VARCHAR(50) NOT NULL,
    course_id VARCHAR(50) NOT NULL,
    recommended_semester INT NOT NULL,
    is_mandatory BOOLEAN NOT NULL,
    PRIMARY KEY (curriculum_id, course_id),
    CONSTRAINT fk_cc_curriculum FOREIGN KEY (curriculum_id) REFERENCES siakad_curriculum.curriculums (curriculum_id) ON DELETE CASCADE,
    CONSTRAINT fk_cc_course FOREIGN KEY (course_id) REFERENCES siakad_curriculum.courses (course_id) ON DELETE CASCADE
);

CREATE TABLE siakad_curriculum.learning_outcomes (
    outcome_id VARCHAR(50) PRIMARY KEY,
    curriculum_id VARCHAR(50) NOT NULL,
    code VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    CONSTRAINT fk_cpl_curriculum FOREIGN KEY (curriculum_id) REFERENCES siakad_curriculum.curriculums (curriculum_id) ON DELETE CASCADE
);
