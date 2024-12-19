import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DataTable } from '@/components/ui/data-table';
import { columns } from './tables/vendors-columns';
import { VendorDialog } from './dialogs/VendorDialog';
import { useVendors } from '@/hooks/useVendors';

export function VendorsManager() {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const { vendors, isLoading, searchTerm, setSearchTerm } = useVendors();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search vendors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-[300px]"
          />
        </div>
        <Button onClick={() => setShowAddDialog(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Vendor
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={vendors}
        isLoading={isLoading}
      />

      <VendorDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
      />
    </div>
  );
}