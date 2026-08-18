import { defineGrid } from '@campus-os/presentation-core';

export const ExamSessionGrid = defineGrid({
  id: 'exam-session-grid',
  columns: [
    { key: 'sessionId', title: 'Session ID' },
    { key: 'schemeName', title: 'Scheme', filterable: true },
    { key: 'date', title: 'Date', sortable: true },
    { key: 'status', title: 'Status' }
  ],
  pagination: { pageSize: 20 },
  dataSource: 'CertificationQueryApplicationService/listExamSessions'
});
