-- ==============================================================================
-- CAMPUS OS - MIGRATION V1.1.0: MASTER DATA IMPORT TABLES
-- Entitas: Mahasiswa, Dosen, Pegawai (Tendik), Yayasan (Badan Penyelenggara)
-- ==============================================================================

-- 1. TABEL PEGAWAI & TENAGA KEPENDIDIKAN (TENDIK)
CREATE TABLE IF NOT EXISTS staff_employees (
    staff_id VARCHAR(50) PRIMARY KEY, -- NIP / NIK Pegawai
    tenant_id VARCHAR(50) NOT NULL REFERENCES tenant_profiles(tenant_id),
    full_name VARCHAR(150) NOT NULL,
    nik VARCHAR(20),
    email VARCHAR(150) NOT NULL,
    phone VARCHAR(30),
    unit_division VARCHAR(100) NOT NULL, -- 'BAAK', 'Keuangan & Akuntansi', 'UPT Komputer / IT', 'Perpustakaan', 'Laboratorium', 'Kepegawaian & SDM', 'Sarpras & Umum'
    job_title VARCHAR(100) NOT NULL, -- 'Kepala Bagian', 'Staf Administrasi', 'Pranata Laboratorium', 'Pustakawan', 'Teknisi IT'
    employment_status VARCHAR(50) DEFAULT 'TETAP_YAYASAN' CHECK (employment_status IN ('PNS_DPK', 'TETAP_YAYASAN', 'KONTRAK', 'HONORER', 'OUTSOURCING')),
    education_level VARCHAR(20) DEFAULT 'S1', -- 'SMA/SMK', 'D3', 'D4', 'S1', 'S2'
    join_date DATE NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. TABEL PENGURUS YAYASAN / BADAN PENYELENGGARA
CREATE TABLE IF NOT EXISTS foundation_boards (
    member_id VARCHAR(50) PRIMARY KEY, -- ID Pengurus
    tenant_id VARCHAR(50) NOT NULL REFERENCES tenant_profiles(tenant_id),
    full_name VARCHAR(150) NOT NULL,
    nik VARCHAR(20),
    position VARCHAR(100) NOT NULL, -- 'Ketua Dewan Pembina', 'Anggota Pembina', 'Ketua Pengawas', 'Ketua Pengurus Yayasan', 'Sekretaris Yayasan', 'Bendahara Yayasan'
    phone VARCHAR(30),
    email VARCHAR(150),
    sk_appointment_number VARCHAR(100), -- Nomor SK Pengangkatan Akta Notaris
    start_period DATE NOT NULL,
    end_period DATE NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- SEED DATA AWAL PEGAWAI (TENDIK)
INSERT INTO staff_employees (
    staff_id, tenant_id, full_name, nik, email, phone, unit_division, job_title, employment_status, education_level, join_date
) VALUES 
('PEG-001', 'kampus-utama', 'Hendra Gunawan, S.Kom.', '3201021405880001', 'hendra.it@kampus-anda.ac.id', '081234560001', 'UPT Komputer / IT', 'Kepala UPT Komputer', 'TETAP_YAYASAN', 'S1', '2018-03-01'),
('PEG-002', 'kampus-utama', 'Siti Rahmawati, S.E.', '3201021405900002', 'siti.keuangan@kampus-anda.ac.id', '081234560002', 'Keuangan & Akuntansi', 'Kasubag Keuangan & Kasir', 'TETAP_YAYASAN', 'S1', '2019-06-15'),
('PEG-003', 'kampus-utama', 'Bambang Irawan, S.Sos.', '3201021405850003', 'bambang.baak@kampus-anda.ac.id', '081234560003', 'BAAK', 'Koordinator Layanan Akademik', 'TETAP_YAYASAN', 'S1', '2016-09-01'),
('PEG-004', 'kampus-utama', 'Nurul Aini, A.Md.', '3201021405920004', 'nurul.lib@kampus-anda.ac.id', '081234560004', 'Perpustakaan', 'Pustakawan Pelaksana', 'TETAP_YAYASAN', 'D3', '2020-01-10')
ON CONFLICT (staff_id) DO NOTHING;

-- SEED DATA AWAL PENGURUS YAYASAN
INSERT INTO foundation_boards (
    member_id, tenant_id, full_name, nik, position, phone, email, sk_appointment_number, start_period, end_period
) VALUES
('YAY-001', 'kampus-utama', 'Drs. H. Syarifuddin Lubis, M.M.', '1271011508600001', 'Ketua Dewan Pembina Yayasan', '08116001001', 'syarifuddin.yayasan@gmail.com', 'AHU-00124.AH.01.04.Tahun 2020', '2020-01-01', '2025-12-31'),
('YAY-002', 'kampus-utama', 'Ir. H. Muhammad Ridwan, M.T.', '1271011508650002', 'Ketua Pengurus Yayasan', '08116001002', 'ridwan.yayasan@gmail.com', 'AHU-00124.AH.01.04.Tahun 2020', '2020-01-01', '2025-12-31'),
('YAY-003', 'kampus-utama', 'Hj. Fatimah Zahra, S.E., M.Si.', '1271011508680003', 'Bendahara Umum Yayasan', '08116001003', 'fatimah.yayasan@gmail.com', 'AHU-00124.AH.01.04.Tahun 2020', '2020-01-01', '2025-12-31')
ON CONFLICT (member_id) DO NOTHING;
