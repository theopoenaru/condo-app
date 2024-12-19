import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header';
import { DataTableRowActions } from '@/components/ui/data-table-row-actions';
import { Reservation } from '@/types/management';
import { format } from 'date-fns';

export const columns: ColumnDef<Reservation>[] = [
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
    accessorKey: 'reservationNumber',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Reservation #" />
    ),
  },
  {
    accessorKey: 'amenity',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amenity" />
    ),
    cell: ({ row }) => (
      <Badge variant="outline">
        {row.getValue('amenity')}
      </Badge>
    ),
  },
  {
    accessorKey: 'residentUnit',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Unit" />
    ),
  },
  {
    accessorKey: 'startTime',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Start Time" />
    ),
    cell: ({ row }) => format(row.getValue('startTime'), 'MMM d, yyyy HH:mm'),
  },
  {
    accessorKey: 'endTime',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="End Time" />
    ),
    cell: ({ row }) => format(row.getValue('endTime'), 'MMM d, yyyy HH:mm'),
  },
  {
    accessorKey: 'guests',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Guests" />
    ),
    cell: ({ row }) => {
      const guests = row.getValue('guests') as number;
      return (
        <Badge variant="secondary">
          {guests} {guests === 1 ? 'guest' : 'guests'}
        </Badge>
      );
    },
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
            status === 'confirmed' ? 'success' :
            status === 'pending' ? 'warning' :
            status === 'cancelled' ? 'destructive' :
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