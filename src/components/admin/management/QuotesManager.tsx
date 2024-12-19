import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DataTable } from '@/components/ui/data-table';
import { columns } from './tables/quotes-columns';
import { QuoteDialog } from './dialogs/QuoteDialog';
import { useQuotes } from '@/hooks/useQuotes';

export function QuotesManager() {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const { quotes, isLoading, searchTerm, setSearchTerm } = useQuotes();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search quotes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-[300px]"
          />
        </div>
        <Button onClick={() => setShowAddDialog(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create Quote
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={quotes}
        isLoading={isLoading}
      />

      <QuoteDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
      />
    </div>
  );
}