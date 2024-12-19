import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DataTable } from '@/components/ui/data-table';
import { columns } from './tables/residents-columns';
import { ResidentDialog } from './dialogs/ResidentDialog';
import { useResidents } from '@/hooks/useResidents';

export function ResidentsManager() {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const { residents, isLoading, searchTerm, setSearchTerm } = useResidents();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search residents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-[300px]"
          />
        </div>
        <Button onClick={() => setShowAddDialog(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Resident
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={residents}
        isLoading={isLoading}
      />

      <ResidentDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
      />
    </div>
  );
}