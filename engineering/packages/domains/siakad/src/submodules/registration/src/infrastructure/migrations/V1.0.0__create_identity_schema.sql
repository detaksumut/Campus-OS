-- Flyway Migration V1.0.0
-- Creation of Identity Schema for Registration Bounded Context

CREATE SCHEMA IF NOT EXISTS identity;

CREATE TABLE identity.users (
    identity_id VARCHAR(50) PRIMARY KEY,
    full_name VARCHAR(150) NOT NULL,
    date_of_birth DATE NOT NULL,
    gender VARCHAR(20) NOT NULL,
    nationality VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE identity.accounts (
    account_id VARCHAR(50) PRIMARY KEY,
    identity_id VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    mfa_enabled BOOLEAN DEFAULT FALSE,
    status VARCHAR(50) NOT NULL,
    last_login TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_account_identity FOREIGN KEY (identity_id) REFERENCES identity.users (identity_id) ON DELETE CASCADE
);

CREATE TABLE identity.email_verifications (
    verification_id VARCHAR(50) PRIMARY KEY,
    account_id VARCHAR(50) NOT NULL,
    verification_code VARCHAR(100) NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    is_verified BOOLEAN DEFAULT FALSE,
    CONSTRAINT fk_email_verification_account FOREIGN KEY (account_id) REFERENCES identity.accounts (account_id) ON DELETE CASCADE
);
