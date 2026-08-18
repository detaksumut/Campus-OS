import { TemplateRenderer } from '../application/TemplateEngine';

async function runTest() {
  console.log('=== Template Engine Test ===');
  const renderer = new TemplateRenderer();

  // 1. Template Rendering Test
  const renderedId = renderer.render('welcome-email', 'id-ID', { name: 'Budi' });
  if (!renderedId.body.includes('Selamat datang di Campus OS, Budi!')) throw new Error('ID render failed');

  // 2. Locale Resolution Test (Fallback to en-US)
  const renderedFallback = renderer.render('password-reset', 'es-ES', { name: 'Juan' });
  if (!renderedFallback.body.includes('Hello Juan, click this link to reset your password.')) throw new Error('Fallback resolution failed');

  console.log('✅ Template Rendering & Locale Resolution tests passed.');
}
runTest().catch(console.error);
