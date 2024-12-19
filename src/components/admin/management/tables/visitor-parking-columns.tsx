import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header';
import { DataTableRowActions } from '@/components/ui/data-table-row-actions';
import { VisitorParking } from '@/types/management';
import { format } from 'date-fns';

export const columns: ColumnDef<VisitorParking>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'permitNumber',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Permit #" />
    ),
  },
  {
    accessorKey: 'licensePlate',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="License Plate" />
    ),
  },
  {
    accessorKey: 'hostUnit',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Host Unit" />
    ),
  },
  {
    accessorKey: 'startDate',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Start Date" />
    ),
    cell: ({ row }) => format(row.getValue('startDate'), 'MMM d, yyyy HH:mm'),
  },
  {
    accessorKey: 'endDate',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="End Date" />
    ),
    cell: ({ row }) => format(row.getValue('endDate'), 'MMM d, yyyy HH:mm'),
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.getValue('status') as string;
      return (
        <Badge
          variant={
            status === 'active' ? 'success' :
            status === 'expired' ? 'destructive' :
            'secondary'
          }
        >
          {status}
        </Badge>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];