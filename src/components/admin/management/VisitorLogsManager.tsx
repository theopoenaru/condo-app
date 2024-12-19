import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { DataTable } from '@/components/ui/data-table';
import { columns } from './tables/visitor-logs-columns';
import { useVisitorLogs } from '@/hooks/useVisitorLogs';

export function VisitorLogsManager() {
  const { logs, isLoading, searchTerm, setSearchTerm } = useVisitorLogs();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search visitor logs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-[300px]"
          />
        </div>
      </div>

      <DataTable
        columns={columns}
        data={logs}
        isLoading={isLoading}
      />
    </div>
  );
}