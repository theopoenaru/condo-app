import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header';
import { DataTableRowActions } from '@/components/ui/data-table-row-actions';
import { Package } from '@/types/management';
import { format } from 'date-fns';

export const columns: ColumnDef<Package>[] = [
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
    accessorKey: 'trackingNumber',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tracking #" />
    ),
  },
  {
    accessorKey: 'carrier',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Carrier" />
    ),
    cell: ({ row }) => (
      <Badge variant="outline">
        {row.getValue('carrier')}
      </Badge>
    ),
  },
  {
    accessorKey: 'recipientUnit',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Unit" />
    ),
  },
  {
    accessorKey: 'deliveryDate',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Delivered" />
    ),
    cell: ({ row }) => format(row.getValue('deliveryDate'), 'MMM d, yyyy HH:mm'),
  },
  {
    accessorKey: 'pickupDate',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Picked Up" />
    ),
    cell: ({ row }) => {
      const pickupDate = row.getValue('pickupDate');
      return pickupDate ? format(pickupDate, 'MMM d, yyyy HH:mm') : '-';
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
            status === 'delivered' ? 'success' :
            status === 'picked_up' ? 'secondary' :
            'destructive'
          }
        >
          {status.replace('_', ' ')}
        </Badge>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];