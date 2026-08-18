export const RegistrationRoutes = [
  {
    path: '/registration/dashboard',
    title: 'Registration Dashboard',
    layout: 'RegistrationWorkbench',
    icon: 'Users',
    permissions: ['registration:view']
  },
  {
    path: '/registration/new',
    title: 'New Registration',
    formId: 'StudentRegistrationForm',
    permissions: ['registration:create']
  },
  {
    path: '/registration/queue',
    title: 'Registration Queue',
    gridId: 'RegistrationQueueGrid',
    permissions: ['registration:view_queue']
  }
];
