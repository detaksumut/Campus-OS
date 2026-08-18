import { definePlugin } from '@campus-os/presentation-core';
import { MembershipRoutes } from './routes';
import { DigitalCardWidget } from './widgets/DigitalCardWidget';
import { MemberProfileWidget } from './widgets/MemberProfileWidget';
import { EnrollmentForm } from './forms/EnrollmentForm';
import { VerificationForm } from './forms/VerificationForm';
import { DirectoryGrid } from './grids/DirectoryGrid';

export const MembershipManifest = definePlugin({
  id: 'campus-os-membership',
  version: '1.0.0',
  targetAbi: '1.0',
  capabilities: ['enrollment', 'verification', 'directory'],
  routes: MembershipRoutes,
  widgets: {
    'digital-card': DigitalCardWidget,
    'member-profile': MemberProfileWidget
  },
  forms: {
    'enrollment-form': EnrollmentForm,
    'verification-form': VerificationForm
  },
  grids: {
    'directory-grid': DirectoryGrid
  }
});
