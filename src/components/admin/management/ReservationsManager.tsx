import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DataTable } from '@/components/ui/data-table';
import { columns } from './tables/reservations-columns';
import { ReservationDialog } from './dialogs/ReservationDialog';
import { useReservations } from '@/hooks/useReservations';

export function ReservationsManager() {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const { reservations, isLoading, searchTerm, setSearchTerm } = useReservations();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search reservations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-[300px]"
          />
        </div>
        <Button onClick={() => setShowAddDialog(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Reservation
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={reservations}
        isLoading={isLoading}
      />

      <ReservationDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
      />
    </div>
  );
}