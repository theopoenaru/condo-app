import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DataTable } from '@/components/ui/data-table';
import { columns } from './tables/approvals-columns';
import { ApprovalDialog } from './dialogs/ApprovalDialog';
import { useApprovals } from '@/hooks/useApprovals';

export function ApprovalManager() {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const { approvals, isLoading, searchTerm, setSearchTerm } = useApprovals();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search approval rules..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-[300px]"
          />
        </div>
        <Button onClick={() => setShowAddDialog(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Approval Rule
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={approvals}
        isLoading={isLoading}
      />

      <ApprovalDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
      />
    </div>
  );
}