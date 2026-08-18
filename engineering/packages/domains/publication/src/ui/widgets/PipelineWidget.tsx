import React from 'react';

export const PipelineWidget: React.FC<{ articleId: string }> = ({ articleId }) => {
  return (
    <div className="pipeline-widget">
      <h3>Article Pipeline Tracker</h3>
      <p>Tracking progress for {articleId} via PublicationQueryApplicationService...</p>
      <ul>
        <li>[x] Submitted</li>
        <li>[ ] Under Review</li>
        <li>[ ] Production</li>
        <li>[ ] Published</li>
      </ul>
    </div>
  );
};
