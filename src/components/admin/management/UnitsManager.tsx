import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DataTable } from '@/components/ui/data-table';
import { columns } from './tables/units-columns';
import { UnitDialog } from './dialogs/UnitDialog';
import { useUnits } from '@/hooks/useUnits';

export function UnitsManager() {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const { units, isLoading, searchTerm, setSearchTerm } = useUnits();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search units..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-[300px]"
          />
        </div>
        <Button onClick={() => setShowAddDialog(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Unit
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={units}
        isLoading={isLoading}
      />

      <UnitDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
      />
    </div>
  );
}