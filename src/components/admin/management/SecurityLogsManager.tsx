import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { DataTable } from '@/components/ui/data-table';
import { columns } from './tables/security-logs-columns';
import { useSecurityLogs } from '@/hooks/useSecurityLogs';

export function SecurityLogsManager() {
  const { logs, isLoading, searchTerm, setSearchTerm } = useSecurityLogs();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search security logs..."
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