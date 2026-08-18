-- Flyway Migration V1.0.0
-- Creation of Admissions Schema for PMB Bounded Context

CREATE SCHEMA IF NOT EXISTS admissions;

CREATE TABLE admissions.admission_periods (
    period_id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    route VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL,
    academic_year VARCHAR(20) NOT NULL,
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NOT NULL
);

CREATE TABLE admissions.applicants (
    applicant_id VARCHAR(50) PRIMARY KEY,
    period_id VARCHAR(50) NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    registered_at TIMESTAMP NOT NULL,
    CONSTRAINT fk_applicant_period FOREIGN KEY (period_id) REFERENCES admissions.admission_periods (period_id) ON DELETE CASCADE
);

CREATE TABLE admissions.applications (
    application_id VARCHAR(50) PRIMARY KEY,
    period_id VARCHAR(50) NOT NULL,
    applicant_id VARCHAR(50) NOT NULL,
    choices_json JSONB NOT NULL, -- Stores ProgramChoice[] to avoid foreign keys to curriculum DB
    decision VARCHAR(50) NOT NULL,
    submitted_at TIMESTAMP NOT NULL,
    CONSTRAINT fk_application_period FOREIGN KEY (period_id) REFERENCES admissions.admission_periods (period_id) ON DELETE CASCADE,
    CONSTRAINT fk_application_applicant FOREIGN KEY (applicant_id) REFERENCES admissions.applicants (applicant_id) ON DELETE CASCADE
);

CREATE TABLE admissions.selection_stages (
    stage_id VARCHAR(50) PRIMARY KEY,
    application_id VARCHAR(50) NOT NULL,
    type VARCHAR(50) NOT NULL,
    description TEXT,
    CONSTRAINT fk_stage_application FOREIGN KEY (application_id) REFERENCES admissions.applications (application_id) ON DELETE CASCADE
);

CREATE TABLE admissions.assessment_results (
    assessment_id VARCHAR(50) PRIMARY KEY,
    stage_id VARCHAR(50) NOT NULL,
    evaluator_id VARCHAR(50) NOT NULL, -- Evaluator (MemberId)
    score NUMERIC NOT NULL,
    remarks TEXT,
    evaluated_at TIMESTAMP NOT NULL,
    CONSTRAINT fk_result_stage FOREIGN KEY (stage_id) REFERENCES admissions.selection_stages (stage_id) ON DELETE CASCADE
);

CREATE TABLE admissions.enrollment_offers (
    offer_id VARCHAR(50) PRIMARY KEY,
    application_id VARCHAR(50) NOT NULL UNIQUE,
    program_code VARCHAR(100) NOT NULL,
    valid_until TIMESTAMP NOT NULL,
    status VARCHAR(50) NOT NULL,
    issued_at TIMESTAMP NOT NULL,
    CONSTRAINT fk_offer_application FOREIGN KEY (application_id) REFERENCES admissions.applications (application_id) ON DELETE CASCADE
);
