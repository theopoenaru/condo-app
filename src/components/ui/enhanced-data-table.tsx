import { useState } from 'react';
import { Filter, Download, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { DataTable } from '@/components/ui/data-table';
import { AdvancedFilterDialog } from '@/components/ui/advanced-filter-dialog';
import type { FilterField, TableMeta } from '@/types/table';
import { downloadTableData } from '@/lib/export-utils';

interface EnhancedDataTableProps<TData extends object> {
  columns: any[];
  data: TData[];
  isLoading?: boolean;
  filterFields?: FilterField[];
  enableFilters?: boolean;
  enableColumnDragging?: boolean;
  enableExport?: boolean;
  meta?: TableMeta<TData>;
}

export function EnhancedDataTable<TData extends object>({
  columns,
  data,
  isLoading,
  filterFields,
  enableFilters,
  enableColumnDragging,
  enableExport,
  meta,
}: EnhancedDataTableProps<TData>) {
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleExport = () => {
    downloadTableData(data, 'export');
  };

  const filteredData = data.filter((item) => {
    if (!searchTerm) return true;
    const searchString = searchTerm.toLowerCase();
    return Object.values(item).some((value) =>
      String(value).toLowerCase().includes(searchString)
    );
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative w-72">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <div className="flex gap-2">
          <TooltipProvider>
            {enableFilters && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setShowFilters(true)}
                  >
                    <Filter className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Filter data</TooltipContent>
              </Tooltip>
            )}
            {enableExport && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleExport}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Export data</TooltipContent>
              </Tooltip>
            )}
          </TooltipProvider>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={filteredData}
        isLoading={isLoading}
        enableColumnDragging={enableColumnDragging}
        meta={meta}
      />

      {enableFilters && filterFields && (
        <AdvancedFilterDialog
          open={showFilters}
          onOpenChange={setShowFilters}
          fields={filterFields}
          onFilter={() => {}}
        />
      )}
    </div>
  );
}