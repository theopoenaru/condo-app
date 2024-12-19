import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DataTable } from '@/components/ui/data-table';
import { columns } from './tables/workflows-columns';
import { WorkflowDialog } from './dialogs/WorkflowDialog';
import { useWorkflows } from '@/hooks/useWorkflows';

export function WorkflowManager() {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const { workflows, isLoading, searchTerm, setSearchTerm } = useWorkflows();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search workflows..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-[300px]"
          />
        </div>
        <Button onClick={() => setShowAddDialog(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Workflow
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={workflows}
        isLoading={isLoading}
      />

      <WorkflowDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
      />
    </div>
  );
}