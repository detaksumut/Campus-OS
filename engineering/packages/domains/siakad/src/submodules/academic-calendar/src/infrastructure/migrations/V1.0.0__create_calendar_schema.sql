-- Flyway Migration V1.0.0
-- Creation of Academic Calendar Schema

CREATE SCHEMA IF NOT EXISTS siakad_calendar;

CREATE TABLE siakad_calendar.academic_calendars (
    academic_year_id VARCHAR(50) NOT NULL,
    semester_id VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL,
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NOT NULL,
    PRIMARY KEY (academic_year_id, semester_id)
);

CREATE TABLE siakad_calendar.academic_periods (
    period_id VARCHAR(50) PRIMARY KEY,
    academic_year_id VARCHAR(50) NOT NULL,
    semester_id VARCHAR(50) NOT NULL,
    type VARCHAR(50) NOT NULL,
    name VARCHAR(255) NOT NULL,
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NOT NULL,
    CONSTRAINT fk_period_calendar FOREIGN KEY (academic_year_id, semester_id) 
      REFERENCES siakad_calendar.academic_calendars (academic_year_id, semester_id) ON DELETE CASCADE
);
