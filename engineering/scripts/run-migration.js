import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function loadPG() {
  const possiblePaths = [
    'pg',
    '../packages/platforms/database/node_modules/pg/lib/index.js',
    '../../node_modules/pg/lib/index.js',
    '../node_modules/pg/lib/index.js'
  ];

  for (const p of possiblePaths) {
    try {
      const mod = await import(p);
      return mod.default || mod;
    } catch {
      // try next
    }
  }
  throw new Error('Module pg tidak ditemukan. Silakan jalankan `npm install` terlebih dahulu.');
}

async function migrate() {
  console.log('🚀 Menghubungkan ke PostgreSQL Neon Cloud Database...');
  
  let pg;
  try {
    pg = await loadPG();
  } catch {
    console.log('📦 Menginstall dependensi pg secara cepat...');
    const { execSync } = await import('child_process');
    execSync('npm install pg', { stdio: 'inherit', cwd: path.join(__dirname, '..') });
    const mod = await import('pg');
    pg = mod.default || mod;
  }

  const { Pool } = pg;
  const connectionString = process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_ozyHK8ZBeV2D@ep-bold-wave-ay5www7q-pooler.c-5.us-east-2.aws.neon.tech/neondb?sslmode=require';

  const pool = new Pool({
    connectionString,
    ssl: { rejectUnauthorized: false }
  });

  try {
    const client = await pool.connect();
    console.log('✅ Berhasil terhubung ke Neon PostgreSQL Database!');

    const sqlPath = path.join(__dirname, '../packages/platforms/database/src/migrations/V1.0.0__master_production_schema.sql');
    console.log(`📄 Membaca Skema SQL dari: ${sqlPath}`);
    const sqlContent = fs.readFileSync(sqlPath, 'utf8');

    console.log('⚡ Mengeksekusi pembuatan tabel produksi master...');
    await client.query(sqlContent);

    console.log('🎉 SELURUH TABEL PRODUKSI CAMPUS OS BERHASIL DIMIGRASIKAN KE NEON POSTGRESQL!\n');

    // Verify created tables
    const res = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name;
    `);

    console.log('📊 Daftar Tabel Terverifikasi di Database Neon Anda:');
    res.rows.forEach(r => console.log(`  ✅ 📦 public.${r.table_name}`));

    client.release();
  } catch (err) {
    console.error('❌ Gagal menjalankan migrasi:', err);
  } finally {
    await pool.end();
  }
}

migrate();
