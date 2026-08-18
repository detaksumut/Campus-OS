-- Flyway Migration V1.0.0
-- Creation of Certification Schema for Certification Bounded Context

CREATE SCHEMA IF NOT EXISTS certification;

CREATE TABLE certification.programs (
    program_id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE certification.applications (
    application_id VARCHAR(50) PRIMARY KEY,
    program_id VARCHAR(50) NOT NULL,
    candidate_id VARCHAR(50) NOT NULL, -- Logical link to Membership MemberId
    status VARCHAR(50) NOT NULL,
    certificate_id VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE certification.exam_sessions (
    exam_id VARCHAR(50) PRIMARY KEY,
    application_id VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL,
    scheduled_start TIMESTAMP NOT NULL,
    time_limit_minutes INT NOT NULL,
    score DECIMAL(5,2),
    CONSTRAINT fk_exam_application FOREIGN KEY (application_id) REFERENCES certification.applications (application_id) ON DELETE CASCADE
);

CREATE TABLE certification.interview_sessions (
    interview_id VARCHAR(50) PRIMARY KEY,
    application_id VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL,
    scheduled_time TIMESTAMP NOT NULL,
    score DECIMAL(5,2),
    result_notes TEXT,
    CONSTRAINT fk_interview_application FOREIGN KEY (application_id) REFERENCES certification.applications (application_id) ON DELETE CASCADE
);

CREATE TABLE certification.assessment_panels (
    interview_id VARCHAR(50) NOT NULL,
    assessor_id VARCHAR(50) NOT NULL, -- Logical link to Membership MemberId
    PRIMARY KEY (interview_id, assessor_id),
    CONSTRAINT fk_panel_interview FOREIGN KEY (interview_id) REFERENCES certification.interview_sessions (interview_id) ON DELETE CASCADE
);

CREATE TABLE certification.certificates (
    certificate_id VARCHAR(50) PRIMARY KEY,
    program_id VARCHAR(50) NOT NULL,
    candidate_id VARCHAR(50) NOT NULL,
    issue_date TIMESTAMP NOT NULL,
    expiration_date TIMESTAMP,
    status VARCHAR(50) NOT NULL,
    cryptographic_hash VARCHAR(255) NOT NULL
);
