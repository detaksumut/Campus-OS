-- Flyway Migration V1.0.0
-- Creation of Awards Schema for Awards Bounded Context

CREATE SCHEMA IF NOT EXISTS awards;

CREATE TABLE awards.award_programs (
    award_id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    cycle VARCHAR(50) NOT NULL,
    allow_self_nomination BOOLEAN NOT NULL DEFAULT FALSE,
    status VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE awards.award_nominations (
    nomination_id VARCHAR(50) PRIMARY KEY,
    award_id VARCHAR(50) NOT NULL,
    nominee_id VARCHAR(50) NOT NULL, -- Logical link to Membership
    nominator_id VARCHAR(50) NOT NULL, -- Logical link to Membership
    evidence JSONB, -- Stores EvidenceReference array
    CONSTRAINT fk_nomination_award FOREIGN KEY (award_id) REFERENCES awards.award_programs (award_id) ON DELETE CASCADE
);

CREATE TABLE awards.award_committees (
    committee_id VARCHAR(50) PRIMARY KEY,
    award_id VARCHAR(50) NOT NULL,
    evaluator_id VARCHAR(50) NOT NULL, -- Logical link to Membership
    role VARCHAR(50) NOT NULL,
    CONSTRAINT fk_committee_award FOREIGN KEY (award_id) REFERENCES awards.award_programs (award_id) ON DELETE CASCADE
);

CREATE TABLE awards.evaluation_sessions (
    evaluation_id VARCHAR(50) PRIMARY KEY,
    award_id VARCHAR(50) NOT NULL,
    nomination_id VARCHAR(50) NOT NULL,
    evaluator_id VARCHAR(50) NOT NULL, -- Logical link to Membership
    weighted_score NUMERIC(5,2) NOT NULL,
    comments TEXT,
    recommendation VARCHAR(50) NOT NULL,
    CONSTRAINT fk_evaluation_award FOREIGN KEY (award_id) REFERENCES awards.award_programs (award_id) ON DELETE CASCADE,
    CONSTRAINT fk_evaluation_nomination FOREIGN KEY (nomination_id) REFERENCES awards.award_nominations (nomination_id) ON DELETE CASCADE
);

CREATE TABLE awards.award_decisions (
    nomination_id VARCHAR(50) PRIMARY KEY,
    award_id VARCHAR(50) NOT NULL,
    decision VARCHAR(50) NOT NULL,
    summary_remarks TEXT,
    CONSTRAINT fk_decision_award FOREIGN KEY (award_id) REFERENCES awards.award_programs (award_id) ON DELETE CASCADE,
    CONSTRAINT fk_decision_nomination FOREIGN KEY (nomination_id) REFERENCES awards.award_nominations (nomination_id) ON DELETE CASCADE
);

CREATE TABLE awards.award_recipients (
    award_id VARCHAR(50) NOT NULL,
    member_id VARCHAR(50) NOT NULL, -- Logical link to Membership
    conferral_date TIMESTAMP NOT NULL,
    PRIMARY KEY (award_id, member_id),
    CONSTRAINT fk_recipient_award FOREIGN KEY (award_id) REFERENCES awards.award_programs (award_id) ON DELETE CASCADE
);
