-- Flyway Migration V1.0.0
-- Creation of Course Offering Schema

CREATE SCHEMA IF NOT EXISTS siakad_course_offering;

CREATE TABLE siakad_course_offering.offerings (
    offering_id VARCHAR(50) PRIMARY KEY,
    course_id VARCHAR(50) NOT NULL,
    academic_period_id VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL
);

CREATE TABLE siakad_course_offering.class_sections (
    section_id VARCHAR(50) PRIMARY KEY,
    offering_id VARCHAR(50) NOT NULL,
    name VARCHAR(255) NOT NULL,
    capacity INT NOT NULL,
    enrolled_count INT NOT NULL DEFAULT 0,
    CONSTRAINT fk_sec_off FOREIGN KEY (offering_id) REFERENCES siakad_course_offering.offerings (offering_id) ON DELETE CASCADE
);

CREATE TABLE siakad_course_offering.teaching_assignments (
    assignment_id VARCHAR(50) PRIMARY KEY,
    section_id VARCHAR(50) NOT NULL,
    lecturer_id VARCHAR(50) NOT NULL,
    role VARCHAR(50) NOT NULL,
    CONSTRAINT fk_asgn_sec FOREIGN KEY (section_id) REFERENCES siakad_course_offering.class_sections (section_id) ON DELETE CASCADE
);

CREATE TABLE siakad_course_offering.room_schedules (
    schedule_id VARCHAR(50) PRIMARY KEY,
    section_id VARCHAR(50) NOT NULL,
    building_id VARCHAR(50) NOT NULL,
    room_name VARCHAR(100) NOT NULL,
    day_of_week INT NOT NULL,
    start_time VARCHAR(10) NOT NULL,
    end_time VARCHAR(10) NOT NULL,
    CONSTRAINT fk_sch_sec FOREIGN KEY (section_id) REFERENCES siakad_course_offering.class_sections (section_id) ON DELETE CASCADE
);
