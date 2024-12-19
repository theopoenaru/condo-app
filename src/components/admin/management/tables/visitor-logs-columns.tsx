import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header';
import { VisitorLog } from '@/types/management';
import { format } from 'date-fns';

export const columns: ColumnDef<VisitorLog>[] = [
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
    accessorKey: 'checkIn',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Check In" />
    ),
    cell: ({ row }) => format(row.getValue('checkIn'), 'MMM d, yyyy HH:mm'),
  },
  {
    accessorKey: 'checkOut',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Check Out" />
    ),
    cell: ({ row }) => {
      const checkOut = row.getValue('checkOut');
      return checkOut ? format(checkOut, 'MMM d, yyyy HH:mm') : 'Still Present';
    },
  },
  {
    accessorKey: 'visitorName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Visitor" />
    ),
  },
  {
    accessorKey: 'hostUnit',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Host Unit" />
    ),
  },
  {
    accessorKey: 'purpose',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Purpose" />
    ),
    cell: ({ row }) => (
      <Badge variant="outline">
        {row.getValue('purpose')}
      </Badge>
    ),
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
            status === 'checked_in' ? 'success' :
            status === 'checked_out' ? 'secondary' :
            'destructive'
          }
        >
          {status.replace('_', ' ')}
        </Badge>
      );
    },
  },
];