import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DataTable } from '@/components/ui/data-table';
import { columns } from './tables/purchase-orders-columns';
import { PurchaseOrderDialog } from './dialogs/PurchaseOrderDialog';
import { usePurchaseOrders } from '@/hooks/usePurchaseOrders';

export function PurchaseOrdersManager() {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const { purchaseOrders, isLoading, searchTerm, setSearchTerm } = usePurchaseOrders();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search purchase orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-[300px]"
          />
        </div>
        <Button onClick={() => setShowAddDialog(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create PO
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={purchaseOrders}
        isLoading={isLoading}
      />

      <PurchaseOrderDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
      />
    </div>
  );
}