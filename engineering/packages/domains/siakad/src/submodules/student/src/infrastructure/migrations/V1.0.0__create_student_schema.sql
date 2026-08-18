-- Flyway Migration V1.0.0
-- Creation of Student Schema

CREATE SCHEMA IF NOT EXISTS siakad_student;

CREATE TABLE siakad_student.students (
    student_id VARCHAR(50) PRIMARY KEY,
    nim VARCHAR(50) UNIQUE NOT NULL,
    registration_id VARCHAR(50) NOT NULL,
    member_id VARCHAR(50) NOT NULL,
    study_program_id VARCHAR(50) NOT NULL,
    enrollment_year INT NOT NULL,
    status VARCHAR(50) NOT NULL
);

CREATE TABLE siakad_student.academic_leaves (
    leave_id VARCHAR(50) PRIMARY KEY,
    student_id VARCHAR(50) NOT NULL,
    semester_id VARCHAR(50) NOT NULL,
    reason TEXT NOT NULL,
    approved_date TIMESTAMP NOT NULL,
    CONSTRAINT fk_leave_student FOREIGN KEY (student_id) REFERENCES siakad_student.students (student_id) ON DELETE CASCADE
);
