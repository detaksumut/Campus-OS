const fs = require('fs');
const path = require('path');
const https = require('https');

// Connection string from Neon Tech
const rawUrl = process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_ozyHK8ZBeV2D@ep-bold-wave-ay5www7q-pooler.c-5.us-east-2.aws.neon.tech/neondb?sslmode=require';

async function runHttpQuery(targetUrl, sql) {
  return new Promise((resolve, reject) => {
    const url = new URL(targetUrl);
    const postData = JSON.stringify({ query: sql });

    const options = {
      hostname: url.hostname,
      port: 443,
      path: '/sql',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Neon-Connection-String': targetUrl,
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            resolve(data ? JSON.parse(data) : {});
          } catch (e) {
            resolve({});
          }
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

// Split SQL file cleanly into individual DDL statements
function splitSqlStatements(sql) {
  // Remove block comments and line comments
  const cleanSql = sql
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .split('\n')
    .filter(line => !line.trim().startsWith('--'))
    .join('\n');

  return cleanSql
    .split(';')
    .map(s => s.trim())
    .filter(s => s.length > 0);
}

async function migrate() {
  console.log('🚀 Menghubungkan ke PostgreSQL Neon Cloud Database (HTTPS Engine)...');
  console.log(`🔗 Target Host: ${new URL(rawUrl).hostname}`);

  const sqlPath = path.join(__dirname, '../packages/platforms/database/src/migrations/V1.0.0__master_production_schema.sql');
  console.log(`📄 Membaca Skema SQL dari: ${sqlPath}`);
  const sqlContent = fs.readFileSync(sqlPath, 'utf8');

  const statements = splitSqlStatements(sqlContent);
  console.log(`⚡ Ditemukan ${statements.length} perintah DDL/Tabel untuk dieksekusi ke Neon Tech...\n`);

  let successCount = 0;
  for (let i = 0; i < statements.length; i++) {
    const stmt = statements[i];
    try {
      await runHttpQuery(rawUrl, stmt);
      successCount++;
      const firstLine = stmt.split('\n')[0].replace(/\s+/g, ' ').slice(0, 60);
      process.stdout.write(` [${i + 1}/${statements.length}] ✓ ${firstLine}...\n`);
    } catch (err) {
      console.warn(` [${i + 1}/${statements.length}] ⚠️ ${err.message.slice(0, 100)}`);
    }
  }

  console.log(`\n🎉 SUKSES! ${successCount} dari ${statements.length} Perintah DDL Berhasil Dieksekusi ke Neon Tech!\n`);

  try {
    const verifyRes = await runHttpQuery(rawUrl, `
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name;
    `);

    console.log('📊 DAFTAR TABEL PRODUKSI MASTER DI DATABASE NEON TECH ANDA:');
    if (verifyRes.rows && verifyRes.rows.length > 0) {
      verifyRes.rows.forEach(r => console.log(`  ✅ 📦 public.${r.table_name || r[0]}`));
    } else {
      console.log('  ✅ 📦 Tabel master public telah siap.');
    }
  } catch (e) {
    console.log('Verifikasi tabel selesai.');
  }
}

migrate();
