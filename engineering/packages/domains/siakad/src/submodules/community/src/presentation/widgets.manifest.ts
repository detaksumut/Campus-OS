import { WidgetDescriptor } from '../../../../../../../presentation-kernel/src/contracts/WidgetDescriptor';

export const CommunityWidgets: WidgetDescriptor[] = [
  {
    id: 'widget.community.directory',
    name: 'Community Directory',
    description: 'Browse academic and special interest communities.',
    zone: 'Dashboard',
    priority: 1,
    lazy: false,
    version: '1.0.0',
    actions: ['community.create', 'community.request_join']
  },
  {
    id: 'widget.community.dashboard',
    name: 'Community Dashboard',
    description: 'Internal view of a community, showing active discussions and announcements.',
    zone: 'Community',
    priority: 2,
    lazy: true,
    version: '1.0.0',
    actions: ['community.post_discussion', 'community.publish_announcement']
  },
  {
    id: 'widget.community.event_calendar',
    name: 'Community Event Calendar',
    description: 'Upcoming events, webinars, and meetings hosted by the community.',
    zone: 'Community',
    priority: 3,
    lazy: true,
    version: '1.0.0',
    actions: ['community.organize_event']
  },
  {
    id: 'widget.community.management',
    name: 'Community Management',
    description: 'Admin portal for managing membership requests and moderation.',
    zone: 'CommunityAdmin',
    priority: 4,
    lazy: true,
    version: '1.0.0',
    actions: ['community.approve_member', 'community.reject_member']
  }
];
