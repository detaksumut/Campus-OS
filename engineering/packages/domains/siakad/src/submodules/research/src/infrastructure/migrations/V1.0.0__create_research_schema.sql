-- Flyway Migration V1.0.0
-- Creation of Research Schema for Research Bounded Context

CREATE SCHEMA IF NOT EXISTS research;

CREATE TABLE research.projects (
    project_id VARCHAR(50) PRIMARY KEY,
    status VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE research.proposals (
    proposal_id VARCHAR(50) PRIMARY KEY,
    project_id VARCHAR(50) NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    abstract_text TEXT NOT NULL,
    methodology TEXT NOT NULL,
    status VARCHAR(50) NOT NULL,
    CONSTRAINT fk_proposal_project FOREIGN KEY (project_id) REFERENCES research.projects (project_id) ON DELETE CASCADE
);

CREATE TABLE research.research_members (
    project_id VARCHAR(50) NOT NULL,
    member_id VARCHAR(50) NOT NULL, -- Logical link to Membership MemberId
    role VARCHAR(50) NOT NULL,
    assigned_at TIMESTAMP NOT NULL,
    PRIMARY KEY (project_id, member_id),
    CONSTRAINT fk_member_project FOREIGN KEY (project_id) REFERENCES research.projects (project_id) ON DELETE CASCADE
);

CREATE TABLE research.milestones (
    milestone_id VARCHAR(50) PRIMARY KEY,
    project_id VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    target_date TIMESTAMP NOT NULL,
    dependent_milestone_id VARCHAR(50),
    status VARCHAR(50) NOT NULL,
    CONSTRAINT fk_milestone_project FOREIGN KEY (project_id) REFERENCES research.projects (project_id) ON DELETE CASCADE
);

CREATE TABLE research.funding_allocations (
    project_id VARCHAR(50) PRIMARY KEY,
    funding_type VARCHAR(50) NOT NULL,
    amount DECIMAL(15,2) NOT NULL,
    source_name VARCHAR(255) NOT NULL,
    is_disbursed BOOLEAN NOT NULL DEFAULT FALSE,
    CONSTRAINT fk_funding_project FOREIGN KEY (project_id) REFERENCES research.projects (project_id) ON DELETE CASCADE
);

CREATE TABLE research.research_outputs (
    output_id VARCHAR(50) PRIMARY KEY,
    project_id VARCHAR(50) NOT NULL,
    output_type VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    publication_submission_id VARCHAR(50), -- Logical link to Publication SubmissionId
    is_verified BOOLEAN NOT NULL DEFAULT FALSE,
    CONSTRAINT fk_output_project FOREIGN KEY (project_id) REFERENCES research.projects (project_id) ON DELETE CASCADE
);
