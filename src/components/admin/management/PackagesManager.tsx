import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DataTable } from '@/components/ui/data-table';
import { columns } from './tables/packages-columns';
import { PackageDialog } from './dialogs/PackageDialog';
import { usePackages } from '@/hooks/usePackages';

export function PackagesManager() {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const { packages, isLoading, searchTerm, setSearchTerm } = usePackages();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search packages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-[300px]"
          />
        </div>
        <Button onClick={() => setShowAddDialog(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Package
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={packages}
        isLoading={isLoading}
      />

      <PackageDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
      />
    </div>
  );
}