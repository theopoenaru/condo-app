import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DataTable } from '@/components/ui/data-table';
import { columns } from './tables/parking-columns';
import { ParkingDialog } from './dialogs/ParkingDialog';
import { useParking } from '@/hooks/useParking';

export function ParkingManager() {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const { parkingSpots, isLoading, searchTerm, setSearchTerm } = useParking();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search parking spots..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-[300px]"
          />
        </div>
        <Button onClick={() => setShowAddDialog(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Parking Spot
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={parkingSpots}
        isLoading={isLoading}
      />

      <ParkingDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
      />
    </div>
  );
}