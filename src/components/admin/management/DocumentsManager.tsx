import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DataTable } from '@/components/ui/data-table';
import { columns } from './tables/documents-columns';
import { DocumentDialog } from './dialogs/DocumentDialog';
import { useDocuments } from '@/hooks/useDocuments';

export function DocumentsManager() {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const { documents, isLoading, searchTerm, setSearchTerm } = useDocuments();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search documents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-[300px]"
          />
        </div>
        <Button onClick={() => setShowAddDialog(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Document
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={documents}
        isLoading={isLoading}
      />

      <DocumentDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
      />
    </div>
  );
}