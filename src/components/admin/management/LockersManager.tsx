import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DataTable } from '@/components/ui/data-table';
import { columns } from './tables/lockers-columns';
import { LockerDialog } from './dialogs/LockerDialog';
import { useLockers } from '@/hooks/useLockers';

export function LockersManager() {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const { lockers, isLoading, searchTerm, setSearchTerm } = useLockers();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search lockers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-[300px]"
          />
        </div>
        <Button onClick={() => setShowAddDialog(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Locker
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={lockers}
        isLoading={isLoading}
      />

      <LockerDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
      />
    </div>
  );
}