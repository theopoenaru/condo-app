import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DataTable } from '@/components/ui/data-table';
import { columns } from './tables/incident-reports-columns';
import { IncidentReportDialog } from './dialogs/IncidentReportDialog';
import { useIncidentReports } from '@/hooks/useIncidentReports';

export function IncidentReportsManager() {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const { reports, isLoading, searchTerm, setSearchTerm } = useIncidentReports();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search incident reports..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-[300px]"
          />
        </div>
        <Button onClick={() => setShowAddDialog(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Report
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={reports}
        isLoading={isLoading}
      />

      <IncidentReportDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
      />
    </div>
  );
}