import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DataTable } from '@/components/ui/data-table';
import { columns } from './tables/groups-columns';
import { GroupDialog } from './dialogs/GroupDialog';
import { useGroups } from '@/hooks/useGroups';

export function GroupsManager() {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const { groups, isLoading, searchTerm, setSearchTerm } = useGroups();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search groups..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-[300px]"
          />
        </div>
        <Button onClick={() => setShowAddDialog(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Group
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={groups}
        isLoading={isLoading}
      />

      <GroupDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
      />
    </div>
  );
}