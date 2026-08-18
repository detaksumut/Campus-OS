import { ActionDescriptor } from '../../../../../../../presentation-kernel/src/contracts/ActionDescriptor';

export const RegistrationActions: ActionDescriptor[] = [
  {
    id: 'auth.login',
    category: 'Authentication',
    idempotent: false,
    retryPolicy: { maxAttempts: 3, backoffMs: 1000 },
    version: '1.0.0',
    permission: 'public', // Open endpoint
    payloadSchema: {
      type: 'object',
      properties: {
        email: { type: 'string', format: 'email' },
        passwordPlaintext: { type: 'string' },
        ipAddress: { type: 'string' }
      },
      required: ['email', 'passwordPlaintext']
    }
  },
  {
    id: 'registration.submit',
    category: 'Enrollment',
    idempotent: false,
    retryPolicy: { maxAttempts: 1, backoffMs: 0 },
    version: '1.0.0',
    permission: 'public', // Open endpoint
    payloadSchema: {
      type: 'object',
      properties: {
        email: { type: 'string', format: 'email' },
        fullName: { type: 'string' },
        dateOfBirth: { type: 'string', format: 'date' },
        gender: { type: 'string' },
        nationality: { type: 'string' },
        passwordPlaintext: { type: 'string' }
      },
      required: ['email', 'fullName', 'dateOfBirth', 'gender', 'nationality', 'passwordPlaintext']
    }
  }
];
