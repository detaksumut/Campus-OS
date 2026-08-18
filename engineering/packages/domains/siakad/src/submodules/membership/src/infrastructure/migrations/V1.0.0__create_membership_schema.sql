-- Flyway Migration V1.0.0
-- Creation of Membership Schema for Membership Bounded Context

CREATE SCHEMA IF NOT EXISTS membership;

CREATE TABLE membership.members (
    member_id VARCHAR(50) PRIMARY KEY,
    identity_id VARCHAR(50) NOT NULL UNIQUE, -- Link to Registration Context
    status VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE membership.member_profiles (
    member_id VARCHAR(50) PRIMARY KEY,
    academic_level VARCHAR(50) NOT NULL,
    affiliation VARCHAR(255) NOT NULL,
    department VARCHAR(255) NOT NULL,
    enrollment_year INT NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_profile_member FOREIGN KEY (member_id) REFERENCES membership.members (member_id) ON DELETE CASCADE
);

CREATE TABLE membership.digital_cards (
    card_id VARCHAR(50) PRIMARY KEY,
    member_id VARCHAR(50) NOT NULL UNIQUE,
    verification_token VARCHAR(255) NOT NULL,
    version INT NOT NULL DEFAULT 1,
    status VARCHAR(50) NOT NULL,
    issue_date TIMESTAMP NOT NULL,
    expiration_date TIMESTAMP NOT NULL,
    CONSTRAINT fk_card_member FOREIGN KEY (member_id) REFERENCES membership.members (member_id) ON DELETE CASCADE
);
