import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DataTable } from '@/components/ui/data-table';
import { columns } from './tables/visitor-parking-columns';
import { VisitorParkingDialog } from './dialogs/VisitorParkingDialog';
import { useVisitorParking } from '@/hooks/useVisitorParking';

export function VisitorParkingManager() {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const { permits, isLoading, searchTerm, setSearchTerm } = useVisitorParking();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search visitor parking..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-[300px]"
          />
        </div>
        <Button onClick={() => setShowAddDialog(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Permit
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={permits}
        isLoading={isLoading}
      />

      <VisitorParkingDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
      />
    </div>
  );
}