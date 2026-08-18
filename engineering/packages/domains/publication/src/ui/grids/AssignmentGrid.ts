import { defineGrid } from '@campus-os/presentation-core';

export const AssignmentGrid = defineGrid({
  id: 'assignment-grid',
  columns: [
    { key: 'articleId', title: 'Article ID' },
    { key: 'title', title: 'Title', filterable: true },
    { key: 'status', title: 'Review Status' },
    { key: 'deadline', title: 'Deadline', sortable: true }
  ],
  pagination: { pageSize: 15 },
  dataSource: 'PublicationQueryApplicationService/listReviewAssignments'
});
