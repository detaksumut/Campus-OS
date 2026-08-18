import React from 'react';

// A naive declarative data table interpreter reading from the ABI
export const ReactGridRuntime: React.FC<{ gridId: string; config?: any }> = ({ gridId, config }) => {
  // Queries GridService for CompiledGrid ABI
  const abi = config?.abi || {
    columns: [
      { key: 'id', title: 'ID', sortable: true },
      { key: 'name', title: 'Name', filterable: true }
    ],
    pagination: { pageSize: 10 }
  };

  return (
    <div className="react-grid-runtime">
      <div className="grid-toolbar">Toolbar (Filter/Export)</div>
      <table>
        <thead>
          <tr>
            {abi.columns.map((col: any) => (
              <th key={col.key}>{col.title} {col.sortable && '↕'}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr><td colSpan={abi.columns.length}>Data rows fetched via ABI capabilities...</td></tr>
        </tbody>
      </table>
      <div className="grid-pagination">Page 1 of 10 ({abi.pagination.pageSize} per page)</div>
    </div>
  );
};
