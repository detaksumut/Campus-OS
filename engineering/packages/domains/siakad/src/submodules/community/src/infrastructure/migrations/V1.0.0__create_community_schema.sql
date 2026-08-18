-- Flyway Migration V1.0.0
-- Creation of Community Schema for Community Bounded Context

CREATE SCHEMA IF NOT EXISTS community;

CREATE TABLE community.communities (
    community_id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    type VARCHAR(100) NOT NULL,
    visibility VARCHAR(50) NOT NULL,
    join_policy VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL,
    parent_community_id VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE community.community_members (
    community_id VARCHAR(50) NOT NULL,
    member_id VARCHAR(50) NOT NULL, -- Logical link to Membership
    role VARCHAR(50) NOT NULL,
    joined_at TIMESTAMP NOT NULL,
    is_suspended BOOLEAN NOT NULL DEFAULT FALSE,
    PRIMARY KEY (community_id, member_id),
    CONSTRAINT fk_member_community FOREIGN KEY (community_id) REFERENCES community.communities (community_id) ON DELETE CASCADE
);

CREATE TABLE community.membership_requests (
    request_id VARCHAR(50) PRIMARY KEY,
    community_id VARCHAR(50) NOT NULL,
    member_id VARCHAR(50) NOT NULL, -- Logical link to Membership
    message TEXT,
    status VARCHAR(50) NOT NULL,
    requested_at TIMESTAMP NOT NULL,
    CONSTRAINT fk_request_community FOREIGN KEY (community_id) REFERENCES community.communities (community_id) ON DELETE CASCADE
);

CREATE TABLE community.discussions (
    discussion_id VARCHAR(50) PRIMARY KEY,
    community_id VARCHAR(50) NOT NULL,
    author_id VARCHAR(50) NOT NULL, -- Logical link to Membership
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    references_json JSONB, -- Stores ArtifactReference array
    is_closed BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL,
    CONSTRAINT fk_discussion_community FOREIGN KEY (community_id) REFERENCES community.communities (community_id) ON DELETE CASCADE
);

CREATE TABLE community.community_events (
    event_id VARCHAR(50) PRIMARY KEY,
    community_id VARCHAR(50) NOT NULL,
    organizer_id VARCHAR(50) NOT NULL, -- Logical link to Membership
    title VARCHAR(255) NOT NULL,
    description TEXT,
    schedule_date TIMESTAMP NOT NULL,
    CONSTRAINT fk_event_community FOREIGN KEY (community_id) REFERENCES community.communities (community_id) ON DELETE CASCADE
);

CREATE TABLE community.announcements (
    announcement_id VARCHAR(50) PRIMARY KEY,
    community_id VARCHAR(50) NOT NULL,
    author_id VARCHAR(50) NOT NULL, -- Logical link to Membership
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    published_at TIMESTAMP NOT NULL,
    CONSTRAINT fk_announcement_community FOREIGN KEY (community_id) REFERENCES community.communities (community_id) ON DELETE CASCADE
);
