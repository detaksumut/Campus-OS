-- Flyway Migration V1.0.0
-- Creation of Conference Schema for Conference Bounded Context

CREATE SCHEMA IF NOT EXISTS conference;

CREATE TABLE conference.conferences (
    conference_id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL,
    review_mode VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE conference.conference_tracks (
    track_id VARCHAR(50) PRIMARY KEY,
    conference_id VARCHAR(50) NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    CONSTRAINT fk_track_conference FOREIGN KEY (conference_id) REFERENCES conference.conferences (conference_id) ON DELETE CASCADE
);

CREATE TABLE conference.review_committees (
    committee_id VARCHAR(50) PRIMARY KEY,
    conference_id VARCHAR(50) NOT NULL,
    member_id VARCHAR(50) NOT NULL, -- Logical link to Membership MemberId
    role VARCHAR(50) NOT NULL,
    CONSTRAINT fk_committee_conference FOREIGN KEY (conference_id) REFERENCES conference.conferences (conference_id) ON DELETE CASCADE
);

CREATE TABLE conference.paper_submissions (
    paper_id VARCHAR(50) PRIMARY KEY,
    conference_id VARCHAR(50) NOT NULL,
    track_id VARCHAR(50) NOT NULL,
    author_id VARCHAR(50) NOT NULL, -- Logical link to Membership MemberId
    title VARCHAR(255) NOT NULL,
    abstract_text TEXT NOT NULL,
    research_project_id VARCHAR(50), -- Logical link to Research ProjectId
    status VARCHAR(50) NOT NULL,
    CONSTRAINT fk_paper_conference FOREIGN KEY (conference_id) REFERENCES conference.conferences (conference_id) ON DELETE CASCADE,
    CONSTRAINT fk_paper_track FOREIGN KEY (track_id) REFERENCES conference.conference_tracks (track_id)
);

CREATE TABLE conference.presenters (
    presenter_id VARCHAR(50) PRIMARY KEY,
    conference_id VARCHAR(50) NOT NULL,
    identity_type VARCHAR(50) NOT NULL,
    member_id VARCHAR(50), -- Internal Member link
    ext_name VARCHAR(255),
    ext_institution VARCHAR(255),
    ext_email VARCHAR(255),
    ext_country VARCHAR(100),
    CONSTRAINT fk_presenter_conference FOREIGN KEY (conference_id) REFERENCES conference.conferences (conference_id) ON DELETE CASCADE
);

CREATE TABLE conference.presentation_sessions (
    session_id VARCHAR(50) PRIMARY KEY,
    conference_id VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    location VARCHAR(255) NOT NULL,
    CONSTRAINT fk_session_conference FOREIGN KEY (conference_id) REFERENCES conference.conferences (conference_id) ON DELETE CASCADE
);

CREATE TABLE conference.presentation_assignments (
    paper_id VARCHAR(50) NOT NULL,
    session_id VARCHAR(50) NOT NULL,
    PRIMARY KEY (paper_id, session_id),
    CONSTRAINT fk_assignment_paper FOREIGN KEY (paper_id) REFERENCES conference.paper_submissions (paper_id) ON DELETE CASCADE,
    CONSTRAINT fk_assignment_session FOREIGN KEY (session_id) REFERENCES conference.presentation_sessions (session_id) ON DELETE CASCADE
);
