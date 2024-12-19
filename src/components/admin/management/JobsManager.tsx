import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DataTable } from '@/components/ui/data-table';
import { columns } from './tables/jobs-columns';
import { JobDialog } from './dialogs/JobDialog';
import { useJobs } from '@/hooks/useJobs';

export function JobsManager() {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const { jobs, isLoading, searchTerm, setSearchTerm } = useJobs();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search jobs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-[300px]"
          />
        </div>
        <Button onClick={() => setShowAddDialog(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create Job
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={jobs}
        isLoading={isLoading}
      />

      <JobDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
      />
    </div>
  );
}