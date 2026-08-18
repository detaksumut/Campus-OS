-- Flyway Migration V1.0.0
-- Creation of Publication Schema for Publication Bounded Context

CREATE SCHEMA IF NOT EXISTS publication;

CREATE TABLE publication.submissions (
    submission_id VARCHAR(50) PRIMARY KEY,
    author_id VARCHAR(50) NOT NULL, -- Logical link to Registration/Membership Identity
    status VARCHAR(50) NOT NULL,
    current_review_round INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE publication.manuscripts (
    submission_id VARCHAR(50) NOT NULL,
    version INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    abstract_text TEXT NOT NULL,
    file_url VARCHAR(500) NOT NULL,
    checksum VARCHAR(255) NOT NULL,
    submitted_at TIMESTAMP NOT NULL,
    PRIMARY KEY (submission_id, version),
    CONSTRAINT fk_manuscript_submission FOREIGN KEY (submission_id) REFERENCES publication.submissions (submission_id) ON DELETE CASCADE
);

CREATE TABLE publication.review_assignments (
    assignment_id VARCHAR(50) PRIMARY KEY,
    submission_id VARCHAR(50) NOT NULL,
    reviewer_id VARCHAR(50) NOT NULL,
    round INT NOT NULL,
    deadline TIMESTAMP NOT NULL,
    status VARCHAR(50) NOT NULL,
    CONSTRAINT fk_assignment_submission FOREIGN KEY (submission_id) REFERENCES publication.submissions (submission_id) ON DELETE CASCADE
);

CREATE TABLE publication.reviews (
    assignment_id VARCHAR(50) PRIMARY KEY,
    decision VARCHAR(50) NOT NULL,
    comments_to_author TEXT,
    comments_to_editor TEXT,
    submitted_at TIMESTAMP NOT NULL,
    CONSTRAINT fk_review_assignment FOREIGN KEY (assignment_id) REFERENCES publication.review_assignments (assignment_id) ON DELETE CASCADE
);

CREATE TABLE publication.editorial_decisions (
    submission_id VARCHAR(50) NOT NULL,
    editor_id VARCHAR(50) NOT NULL,
    decision VARCHAR(50) NOT NULL,
    justification TEXT NOT NULL,
    decided_at TIMESTAMP NOT NULL,
    PRIMARY KEY (submission_id, editor_id, decided_at),
    CONSTRAINT fk_decision_submission FOREIGN KEY (submission_id) REFERENCES publication.submissions (submission_id) ON DELETE CASCADE
);
