-- Flyway Migration V1.0.0
-- Creation of Academic Organization Schema

CREATE SCHEMA IF NOT EXISTS siakad_organization;

CREATE TABLE siakad_organization.universities (
    university_id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL
);

CREATE TABLE siakad_organization.faculties (
    faculty_id VARCHAR(50) PRIMARY KEY,
    university_id VARCHAR(50) NOT NULL,
    name VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL,
    CONSTRAINT fk_fac_univ FOREIGN KEY (university_id) REFERENCES siakad_organization.universities (university_id) ON DELETE CASCADE
);

CREATE TABLE siakad_organization.departments (
    department_id VARCHAR(50) PRIMARY KEY,
    faculty_id VARCHAR(50) NOT NULL,
    name VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL,
    CONSTRAINT fk_dep_fac FOREIGN KEY (faculty_id) REFERENCES siakad_organization.faculties (faculty_id) ON DELETE CASCADE
);

CREATE TABLE siakad_organization.study_programs (
    program_id VARCHAR(50) PRIMARY KEY,
    department_id VARCHAR(50) NOT NULL,
    name VARCHAR(255) NOT NULL,
    level VARCHAR(50) NOT NULL,
    accreditation VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL,
    CONSTRAINT fk_prog_dep FOREIGN KEY (department_id) REFERENCES siakad_organization.departments (department_id) ON DELETE CASCADE
);

CREATE TABLE siakad_organization.campuses (
    campus_id VARCHAR(50) PRIMARY KEY,
    university_id VARCHAR(50) NOT NULL,
    name VARCHAR(255) NOT NULL,
    address TEXT NOT NULL,
    CONSTRAINT fk_camp_univ FOREIGN KEY (university_id) REFERENCES siakad_organization.universities (university_id) ON DELETE CASCADE
);

CREATE TABLE siakad_organization.buildings (
    building_id VARCHAR(50) PRIMARY KEY,
    campus_id VARCHAR(50) NOT NULL,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(50) NOT NULL,
    CONSTRAINT fk_bldg_camp FOREIGN KEY (campus_id) REFERENCES siakad_organization.campuses (campus_id) ON DELETE CASCADE
);
