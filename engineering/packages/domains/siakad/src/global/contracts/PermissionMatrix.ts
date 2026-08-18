export const PermissionMatrix = {
  'course-offering': {
    read: ['STUDENT', 'LECTURER', 'ADMIN'],
    write: ['ADMIN']
  },
  'study-plan': {
    read: ['STUDENT', 'ACADEMIC_ADVISOR', 'ADMIN'],
    write: ['STUDENT', 'ACADEMIC_ADVISOR']
  },
  'enrollment': {
    read: ['STUDENT', 'ADMIN'],
    write: ['ADMIN']
  },
  'attendance': {
    read: ['STUDENT', 'LECTURER', 'ADMIN'],
    write: ['LECTURER', 'ADMIN']
  },
  'gradebook': {
    read: ['STUDENT', 'LECTURER', 'ADMIN'],
    write: ['LECTURER', 'ADMIN']
  },
  'transcript': {
    read: ['STUDENT', 'ADMIN'],
    write: ['ADMIN']
  }
};
