const { Pool, Client } = require('pg');
const fs = require('fs');
const path = require('path');
const https = require('https');

// Direct compute endpoint for DDL migrations without pooler connection drops
const rawUrl = process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_ozyHK8ZBeV2D@ep-bold-wave-ay5www7q-pooler.c-5.us-east-2.aws.neon.tech/neondb?sslmode=require';
const directUrl = rawUrl.replace('-pooler.c-5', '').replace('-pooler', '');

async function runHttpQuery(sql) {
  return new Promise((resolve, reject) => {
    const url = new URL(directUrl);
    const postData = JSON.stringify({ query: sql });

    const options = {
      hostname: url.hostname,
      port: 443,
      path: '/sql',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Neon-Connection-String': directUrl,
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(data ? JSON.parse(data) : {});
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${data}`));
        }
      });
    });

    req.on('error', (e) => reject(e));
    req.write(postData);
    req.end();
  });
}

async function migrate() {
  console.log('🚀 Menghubungkan ke PostgreSQL Neon Cloud Database (Direct Compute)...');

  const sqlPath = path.join(__dirname, '../packages/platforms/database/src/migrations/V1.0.0__master_production_schema.sql');
  console.log(`📄 Membaca Skema SQL dari: ${sqlPath}`);
  const sqlContent = fs.readFileSync(sqlPath, 'utf8');

  // Attempt 1: Direct TCP Client with SSL
  try {
    const client = new Client({
      connectionString: directUrl,
      ssl: {
        rejectUnauthorized: false
      },
      connectionTimeoutMillis: 10000
    });

    await client.connect();
    console.log('✅ BERHASIL TERHUBUNG KE NEON POSTGRESQL (TCP)!');
    console.log('⚡ Mengeksekusi pembuatan seluruh tabel produksi master...');
    
    await client.query(sqlContent);
    console.log('\n🎉 SELURUH TABEL PRODUKSI CAMPUS OS BERHASIL DIMIGRASIKAN KE NEON POSTGRESQL!\n');

    const res = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name;
    `);

    console.log('📊 Daftar Tabel Terverifikasi di Database Neon Anda:');
    res.rows.forEach(r => console.log(`  ✅ 📦 public.${r.table_name}`));

    await client.end();
    return;
  } catch (tcpErr) {
    console.log('⚠️ TCP direct mengalami timeout/reset, beralih ke Neon HTTPS SQL Protocol...');
  }

  // Attempt 2: High-reliability Neon HTTPS SQL API
  try {
    await runHttpQuery(sqlContent);
    console.log('\n🎉 SELURUH TABEL PRODUKSI CAMPUS OS BERHASIL DIMIGRASIKAN VIA HTTPS PROTOCOL!\n');

    const verifyRes = await runHttpQuery(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name;
    `);

    console.log('📊 Daftar Tabel Terverifikasi di Database Neon Anda:');
    if (verifyRes.rows) {
      verifyRes.rows.forEach(r => console.log(`  ✅ 📦 public.${r.table_name}`));
    }
  } catch (httpErr) {
    console.error('❌ Gagal menjalankan migrasi via HTTP:', httpErr.message);
  }
}

migrate();
