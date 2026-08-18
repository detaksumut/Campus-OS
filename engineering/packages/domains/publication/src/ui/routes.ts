export const PublicationRoutes = [
  { path: '/publication/submit', pageId: 'submission-page', layout: 'sidebar' },
  { path: '/publication/assignments', pageId: 'assignments-page', layout: 'sidebar', capabilities: ['review'] },
  { path: '/publication/review', pageId: 'blind-review-page', layout: 'sidebar', capabilities: ['review'] },
  { path: '/publication/production', pageId: 'production-page', layout: 'sidebar', capabilities: ['production'] }
];
