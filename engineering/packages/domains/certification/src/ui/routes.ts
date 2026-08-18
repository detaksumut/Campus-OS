export const CertificationRoutes = [
  { path: '/certification/scheme', pageId: 'scheme-page', layout: 'sidebar' },
  { path: '/certification/apply', pageId: 'application-page', layout: 'sidebar' },
  { path: '/certification/exam', pageId: 'exam-page', layout: 'flat', capabilities: ['exam'] },
  { path: '/certification/interview', pageId: 'interview-page', layout: 'sidebar', capabilities: ['interview'] },
  { path: '/certification/certificate', pageId: 'certificate-page', layout: 'header-only' }
];
