import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EnhancedDataTable } from '@/components/ui/enhanced-data-table';
import { columns } from './tables/invoices-columns';
import { InvoiceDialog } from './dialogs/InvoiceDialog';
import { useInvoices } from '@/hooks/useInvoices';
import type { Invoice } from '@/types/management';
import { useToast } from '@/hooks/use-toast';

export function InvoicesManager() {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const { invoices, isLoading, updateInvoice, deleteInvoice } = useInvoices();
  const { toast } = useToast();

  const handleEdit = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setShowAddDialog(true);
  };

  const handleDelete = (invoice: Invoice) => {
    deleteInvoice(invoice.id);
    toast({
      title: "Invoice deleted",
      description: `Invoice ${invoice.invoiceNumber} has been deleted.`,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Invoices</h2>
        <Button onClick={() => setShowAddDialog(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Invoice
        </Button>
      </div>

      <EnhancedDataTable
        columns={columns}
        data={invoices}
        isLoading={isLoading}
        onEdit={handleEdit}
        onDelete={handleDelete}
        enableFilters
        enableColumnDragging
        enableExport
      />

      <InvoiceDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        invoice={selectedInvoice}
      />
    </div>
  );
}