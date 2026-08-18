import { defineGrid } from '@campus-os/presentation-core';

export const DirectoryGrid = defineGrid({
  id: 'directory-grid',
  columns: [
    { key: 'memberId', title: 'Member ID', sortable: true },
    { key: 'name', title: 'Full Name', filterable: true, sortable: true },
    { key: 'status', title: 'Status', filterable: true },
    { key: 'joinedAt', title: 'Join Date', sortable: true }
  ],
  pagination: {
    pageSize: 20
  },
  // Application Service Binding: Grid queries the Application Query Service directly
  dataSource: 'MembershipQueryApplicationService/listPublicDirectory'
});
