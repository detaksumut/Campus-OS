-- ==============================================================================
-- CAMPUS OS v2.0.0 - MASTER PRODUCTION DATABASE SCHEMA (POSTGRESQL 16)
-- Standards: Kemendikbudristek RI (SN-Dikti, PDDIKTI, PIN, SIVIL, BKD) & PKP OJS 3.x
-- Flyway Convention: V1.0.0__master_production_schema.sql
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ------------------------------------------------------------------------------
-- 1. MULTI-TENANT PROFILES & WHITE-LABEL CONFIGURATION
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS tenant_profiles (
    tenant_id VARCHAR(50) PRIMARY KEY,
    institution_code VARCHAR(20) NOT NULL, -- Kode PT di PDDIKTI (contoh: 001023)
    institution_name VARCHAR(255) NOT NULL, -- Nama Kampus
    institution_type VARCHAR(50) NOT NULL CHECK (institution_type IN ('UNIVERSITAS', 'POLITEKNIK', 'INSTITUT', 'SEKOLAH_TINGGI', 'AKADEMI')),
    tagline VARCHAR(255) DEFAULT 'Highly Advanced and Competitive',
    logo_url TEXT,
    favicon_url TEXT,
    hero_image_url TEXT,
    primary_color VARCHAR(20) DEFAULT '#2563eb',
    accent_color VARCHAR(20) DEFAULT '#3b82f6',
    dark_surface VARCHAR(20) DEFAULT '#0f172a',
    executive_title VARCHAR(50) DEFAULT 'Direktur', -- 'Direktur' | 'Rektor' | 'Ketua'
    executive_name VARCHAR(150) DEFAULT 'Pak Direktur',
    executive_nip VARCHAR(50),
    sso_provider VARCHAR(50) DEFAULT 'google',
    sso_organization_domain VARCHAR(150) DEFAULT 'kampus-anda.ac.id',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ------------------------------------------------------------------------------
-- 2. AKADEMIK: TAHUN AKADEMIK & PROGRAM STUDI (OBE & BAN-PT/LAM)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS academic_years (
    year_id VARCHAR(20) PRIMARY KEY, -- '2023/2024', '2024/2025'
    name VARCHAR(50) NOT NULL,
    is_active BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS academic_terms (
    term_id VARCHAR(30) PRIMARY KEY, -- '2024-GASAL', '2024-GENAP'
    year_id VARCHAR(20) NOT NULL REFERENCES academic_years(year_id),
    name VARCHAR(50) NOT NULL, -- 'Semester Ganjil 2024/2025'
    term_type VARCHAR(20) NOT NULL CHECK (term_type IN ('GASAL', 'GENAP', 'ANTARA')),
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    is_active BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS study_programs (
    program_id VARCHAR(50) PRIMARY KEY,
    tenant_id VARCHAR(50) NOT NULL REFERENCES tenant_profiles(tenant_id),
    pddikti_code VARCHAR(20) NOT NULL, -- Kode Prodi di PDDIKTI
    name VARCHAR(150) NOT NULL, -- 'Usaha Perjalanan Wisata', 'Perhotelan', 'Kuliner'
    degree_level VARCHAR(20) NOT NULL CHECK (degree_level IN ('D3', 'D4', 'S1', 'S2', 'S3', 'PROFESI')),
    accreditation_grade VARCHAR(10) DEFAULT 'UNGGUL' CHECK (accreditation_grade IN ('UNGGUL', 'BAIK_SEKALI', 'BAIK', 'A', 'B', 'C', 'INTERNASIONAL')),
    accreditation_expiry DATE,
    head_of_program VARCHAR(150),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ------------------------------------------------------------------------------
-- 3. MAHASISWA & PENERIMAAN (PMB ➔ REGISTRASI NIM)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS students (
    student_id VARCHAR(50) PRIMARY KEY, -- NIM Mahasiswa
    tenant_id VARCHAR(50) NOT NULL REFERENCES tenant_profiles(tenant_id),
    program_id VARCHAR(50) NOT NULL REFERENCES study_programs(program_id),
    full_name VARCHAR(150) NOT NULL,
    nik VARCHAR(20),
    email VARCHAR(150) NOT NULL,
    phone VARCHAR(30),
    admission_year INT NOT NULL,
    admission_term VARCHAR(30) REFERENCES academic_terms(term_id),
    admission_type VARCHAR(50) DEFAULT 'MANDIRI' CHECK (admission_type IN ('SNBP', 'SNBT', 'MANDIRI', 'PRESTASI', 'KERJASAMA')),
    academic_status VARCHAR(20) DEFAULT 'ACTIVE' CHECK (academic_status IN ('ACTIVE', 'LEAVE', 'GRADUATED', 'DROPOUT', 'NON_ACTIVE')),
    current_semester INT DEFAULT 1,
    cumulative_gpa DECIMAL(3,2) DEFAULT 0.00, -- IPK
    total_credits_passed INT DEFAULT 0, -- Total SKS Lulus
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS pmb_applications (
    application_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id VARCHAR(50) NOT NULL REFERENCES tenant_profiles(tenant_id),
    program_id VARCHAR(50) NOT NULL REFERENCES study_programs(program_id),
    applicant_name VARCHAR(150) NOT NULL,
    applicant_email VARCHAR(150) NOT NULL,
    applicant_phone VARCHAR(30) NOT NULL,
    previous_school VARCHAR(150),
    selection_score DECIMAL(5,2),
    application_status VARCHAR(30) DEFAULT 'SUBMITTED' CHECK (application_status IN ('SUBMITTED', 'DOCUMENT_VERIFIED', 'ACADEMIC_TEST', 'ACCEPTED', 'REJECTED', 'REGISTERED')),
    payment_status VARCHAR(20) DEFAULT 'UNPAID' CHECK (payment_status IN ('UNPAID', 'PAID', 'EXPIRED')),
    registration_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ------------------------------------------------------------------------------
-- 4. DOSEN & TENAGA KEPENDIDIKAN (BKD 12-16 SKS & SISTER)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS lecturers (
    lecturer_id VARCHAR(50) PRIMARY KEY, -- NIP / ID
    tenant_id VARCHAR(50) NOT NULL REFERENCES tenant_profiles(tenant_id),
    program_id VARCHAR(50) REFERENCES study_programs(program_id),
    nidn_nup VARCHAR(30) UNIQUE, -- Nomor Induk Dosen Nasional
    full_name VARCHAR(150) NOT NULL,
    academic_rank VARCHAR(50) DEFAULT 'ASISTEN_AHLI' CHECK (academic_rank IN ('TENAGA_PENGAJAR', 'ASISTEN_AHLI', 'LEKTOR', 'LEKTOR_KEPALA', 'GURU_BESAR')),
    highest_education VARCHAR(10) DEFAULT 'S2' CHECK (highest_education IN ('S2', 'S3', 'SPESIALIS')),
    status_bkd VARCHAR(20) DEFAULT 'MEMENUHI' CHECK (status_bkd IN ('MEMENUHI', 'TIDAK_MEMENUHI', 'BELUM_EVALUASI')),
    total_bkd_credits DECIMAL(4,2) DEFAULT 14.00, -- Standar 12 s/d 16 SKS
    email VARCHAR(150) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ------------------------------------------------------------------------------
-- 5. KURIKULUM, MATA KULIAH & CAPAIAN PEMBELAJARAN (OBE & MBKM)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS courses (
    course_id VARCHAR(50) PRIMARY KEY,
    program_id VARCHAR(50) NOT NULL REFERENCES study_programs(program_id),
    code VARCHAR(30) NOT NULL, -- 'MKW-101'
    name VARCHAR(150) NOT NULL, -- 'Manajemen Usaha Perjalanan'
    credits_theory INT DEFAULT 2,
    credits_practical INT DEFAULT 1,
    total_credits INT NOT NULL, -- Total SKS (Teori + Praktik)
    semester_recommended INT NOT NULL,
    is_mbkm BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ------------------------------------------------------------------------------
-- 6. PERKULIAHAN, JADWAL & STANDAR 16 MINGGU PERTEMUAN (BAP)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS course_classes (
    class_id VARCHAR(50) PRIMARY KEY, -- 'CLS-2024-UPW-101-A'
    term_id VARCHAR(30) NOT NULL REFERENCES academic_terms(term_id),
    course_id VARCHAR(50) NOT NULL REFERENCES courses(course_id),
    lecturer_id VARCHAR(50) NOT NULL REFERENCES lecturers(lecturer_id),
    class_name VARCHAR(20) NOT NULL, -- 'Kelas A'
    quota INT DEFAULT 40,
    total_enrolled INT DEFAULT 0,
    is_online BOOLEAN DEFAULT FALSE,
    meeting_link TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS lecture_meetings (
    meeting_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    class_id VARCHAR(50) NOT NULL REFERENCES course_classes(class_id),
    meeting_number INT NOT NULL CHECK (meeting_number BETWEEN 1 AND 16), -- Standar 16 Sesi
    topic_bap TEXT NOT NULL, -- Berita Acara Perkuliahan (BAP)
    meeting_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    status VARCHAR(20) DEFAULT 'SCHEDULED' CHECK (status IN ('SCHEDULED', 'COMPLETED', 'CANCELLED')),
    lecturer_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ------------------------------------------------------------------------------
-- 7. KARTU RENCANA STUDI (KRS) & ATURAN BATAS SKS KEMENDIKBUD
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS study_plans (
    plan_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id VARCHAR(50) NOT NULL REFERENCES students(student_id),
    term_id VARCHAR(30) NOT NULL REFERENCES academic_terms(term_id),
    previous_gpa DECIMAL(3,2) NOT NULL DEFAULT 3.00, -- IPS Semester Lalu
    max_credits_allowed INT NOT NULL, -- 24 SKS jika IPS >= 3.00
    total_credits_taken INT NOT NULL DEFAULT 0,
    status VARCHAR(20) DEFAULT 'APPROVED' CHECK (status IN ('DRAFT', 'SUBMITTED', 'APPROVED', 'REJECTED')),
    academic_advisor_approval BOOLEAN DEFAULT TRUE,
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS study_plan_items (
    item_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    plan_id UUID NOT NULL REFERENCES study_plans(plan_id),
    class_id VARCHAR(50) NOT NULL REFERENCES course_classes(class_id),
    grade_letter VARCHAR(5), -- 'A', 'B+', 'B', 'C+', 'C', 'D', 'E'
    grade_point DECIMAL(3,2), -- 4.00, 3.50, 3.00, dst.
    grade_status VARCHAR(20) DEFAULT 'IN_PROGRESS' CHECK (grade_status IN ('IN_PROGRESS', 'SUBMITTED', 'PUBLISHED')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ------------------------------------------------------------------------------
-- 8. KELULUSAN, WISUDA & PENOMORAN IJAZAH NASIONAL (PIN / SIVIL / SKPI)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS graduation_records (
    graduation_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id VARCHAR(50) NOT NULL REFERENCES students(student_id),
    national_diploma_number VARCHAR(100) UNIQUE NOT NULL, -- Format PIN Dikti
    sivil_verification_status VARCHAR(20) DEFAULT 'VERIFIED' CHECK (sivil_verification_status IN ('PENDING', 'VERIFIED', 'INVALID')),
    yudisium_date DATE NOT NULL,
    graduation_date DATE NOT NULL,
    final_gpa DECIMAL(3,2) NOT NULL,
    predicate VARCHAR(50) NOT NULL, -- 'DENGAN PUJIAN (CUMLAUDE)', 'SANGAT MEMUASKAN'
    skpi_document_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ------------------------------------------------------------------------------
-- 9. SINKRONISASI PDDIKTI NEO FEEDER KEMENDIKBUDRISTEK
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS pddikti_sync_logs (
    log_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id VARCHAR(50) NOT NULL REFERENCES tenant_profiles(tenant_id),
    term_id VARCHAR(30) NOT NULL REFERENCES academic_terms(term_id),
    sync_module VARCHAR(50) NOT NULL, -- 'MAHASISWA', 'KRS', 'NILAI', 'AKM', 'DOSEN', 'LULUSAN'
    status VARCHAR(20) NOT NULL CHECK (status IN ('SUCCESS', 'IN_PROGRESS', 'FAILED', 'PARTIAL')),
    total_records INT NOT NULL,
    synced_records INT NOT NULL,
    error_message TEXT,
    sync_timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ------------------------------------------------------------------------------
-- 10. JURNAL SISTEM (OJS / PKP OPEN JOURNAL SYSTEMS 3.x & ARJUNA)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS ojs_journals (
    journal_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id VARCHAR(50) NOT NULL REFERENCES tenant_profiles(tenant_id),
    title VARCHAR(255) NOT NULL,
    acronym VARCHAR(30) NOT NULL,
    p_issn VARCHAR(30),
    e_issn VARCHAR(30),
    editor_in_chief VARCHAR(150) NOT NULL,
    sinta_grade VARCHAR(20) DEFAULT 'SINTA 2' CHECK (sinta_grade IN ('SINTA 1', 'SINTA 2', 'SINTA 3', 'SINTA 4', 'SINTA 5', 'SINTA 6', 'NON_SINTA')),
    doi_prefix VARCHAR(50) DEFAULT '10.31294',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS ojs_issues (
    issue_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    journal_id UUID NOT NULL REFERENCES ojs_journals(journal_id),
    volume INT NOT NULL,
    number INT NOT NULL,
    year INT NOT NULL,
    title VARCHAR(255),
    status VARCHAR(20) DEFAULT 'PUBLISHED' CHECK (status IN ('DRAFT', 'SCHEDULED', 'PUBLISHED')),
    published_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS ojs_submissions (
    submission_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    journal_id UUID NOT NULL REFERENCES ojs_journals(journal_id),
    issue_id UUID REFERENCES ojs_issues(issue_id),
    title TEXT NOT NULL,
    abstract TEXT NOT NULL,
    keywords VARCHAR(255),
    primary_author_name VARCHAR(150) NOT NULL,
    primary_author_email VARCHAR(150) NOT NULL,
    primary_author_orcid VARCHAR(50),
    current_stage VARCHAR(30) DEFAULT 'REVIEW' CHECK (current_stage IN ('SUBMISSION', 'REVIEW', 'COPYEDITING', 'PRODUCTION', 'PUBLISHED', 'DECLINED')),
    doi VARCHAR(100),
    galley_pdf_url TEXT,
    similarity_score DECIMAL(5,2) DEFAULT 12.50, -- Turnitin index %
    pages VARCHAR(50) DEFAULT '1-14',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS ojs_review_assignments (
    assignment_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    submission_id UUID NOT NULL REFERENCES ojs_submissions(submission_id),
    reviewer_name VARCHAR(150) NOT NULL,
    reviewer_affiliation VARCHAR(200) NOT NULL,
    review_round INT DEFAULT 1,
    review_type VARCHAR(30) DEFAULT 'DOUBLE_BLIND',
    recommendation VARCHAR(30) DEFAULT 'ACCEPT' CHECK (recommendation IN ('ACCEPT', 'REVISIONS_REQUIRED', 'RESUBMIT', 'DECLINE')),
    comments_for_author TEXT,
    due_date DATE NOT NULL,
    completed_at TIMESTAMP WITH TIME ZONE
);

-- ------------------------------------------------------------------------------
-- 11. ANTREAN TUGAS PIMPINAN (EXECUTIVE TASK INBOX)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS system_tasks (
    task_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id VARCHAR(50) NOT NULL REFERENCES tenant_profiles(tenant_id),
    title VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL, -- 'RAB_FAKULTAS', 'LAPORAN_PENELITIAN', 'VALIDASI_DOSEN', 'EVALUASI_KINERJA'
    item_count INT DEFAULT 1,
    unit_name VARCHAR(50) DEFAULT 'tugas',
    status VARCHAR(20) DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'APPROVED', 'REJECTED', 'COMPLETED')),
    action_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ==============================================================================
-- INITIAL SEED: POLITEKNIK / UNIVERSITAS DEFAULT TENANT PROFILE
-- ==============================================================================
INSERT INTO tenant_profiles (
    tenant_id, institution_code, institution_name, institution_type, tagline,
    executive_title, executive_name, executive_nip, sso_provider, sso_organization_domain
) VALUES (
    'kampus-utama', '005012', 'UNIVERSITAS/POLITEKNIK (KAMPUS ANDA)', 'POLITEKNIK',
    'Highly Advanced and Competitive', 'Direktur', 'Pak Direktur', '197508152002121001',
    'google', 'politeknik-anda.ac.id'
) ON CONFLICT (tenant_id) DO NOTHING;

INSERT INTO academic_years (year_id, name, is_active) 
VALUES ('2023/2024', 'Tahun Akademik 2023/2024', TRUE) 
ON CONFLICT (year_id) DO NOTHING;

INSERT INTO academic_terms (term_id, year_id, name, term_type, start_date, end_date, is_active)
VALUES ('2024-GENAP', '2023/2024', 'Semester Genap 2023/2024', 'GENAP', '2024-02-01', '2024-07-31', TRUE)
ON CONFLICT (term_id) DO NOTHING;

INSERT INTO study_programs (program_id, tenant_id, pddikti_code, name, degree_level, accreditation_grade) VALUES
('PRODI-UPW', 'kampus-utama', '93401', 'Usaha Perjalanan Wisata', 'D4', 'UNGGUL'),
('PRODI-HTL', 'kampus-utama', '93402', 'Perhotelan', 'D4', 'UNGGUL'),
('PRODI-KLN', 'kampus-utama', '93403', 'Kuliner', 'D3', 'BAIK_SEKALI'),
('PRODI-MICE', 'kampus-utama', '93404', 'Event & MICE', 'D4', 'UNGGUL'),
('PRODI-OTH', 'kampus-utama', '93405', 'Lainnya', 'S1', 'BAIK_SEKALI')
ON CONFLICT (program_id) DO NOTHING;

INSERT INTO system_tasks (tenant_id, title, category, item_count, unit_name, status) VALUES
('kampus-utama', 'Persetujuan Pengajuan RAB Fakultas', 'RAB_FAKULTAS', 2, 'tugas', 'PENDING'),
('kampus-utama', 'Review Laporan Penelitian', 'LAPORAN_PENELITIAN', 5, 'laporan', 'PENDING'),
('kampus-utama', 'Validasi Data Dosen', 'VALIDASI_DOSEN', 12, 'data', 'PENDING'),
('kampus-utama', 'Evaluasi Kinerja Bulanan', 'EVALUASI_KINERJA', 1, 'evaluasi', 'PENDING')
ON CONFLICT DO NOTHING;

INSERT INTO pddikti_sync_logs (tenant_id, term_id, sync_module, status, total_records, synced_records) VALUES
('kampus-utama', '2024-GENAP', 'KRS & AKADEMIK', 'SUCCESS', 2860, 2860)
ON CONFLICT DO NOTHING;
