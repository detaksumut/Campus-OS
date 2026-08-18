export const MembershipRoutes = [
  {
    path: '/membership/enroll',
    pageId: 'enrollment-page',
    layout: 'sidebar'
  },
  {
    path: '/membership/verification',
    pageId: 'verification-page',
    layout: 'sidebar',
    capabilities: ['verification']
  },
  {
    path: '/membership/profile',
    pageId: 'profile-page',
    layout: 'sidebar'
  },
  {
    path: '/membership/card',
    pageId: 'digital-card-page',
    layout: 'flat'
  },
  {
    path: '/membership/directory',
    pageId: 'directory-page',
    layout: 'header-only'
  }
];
