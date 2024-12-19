import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header';
import { DataTableRowActions } from '@/components/ui/data-table-row-actions';
import { Quote } from '@/types/management';
import { format } from 'date-fns';
import { FileText } from 'lucide-react';

export const columns: ColumnDef<Quote>[] = [
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
    accessorKey: 'quoteNumber',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Quote #" />
    ),
  },
  {
    accessorKey: 'vendor',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Vendor" />
    ),
  },
  {
    accessorKey: 'jobNumber',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Job #" />
    ),
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount" />
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('amount'));
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount);
      return formatted;
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
            status === 'approved' ? 'success' :
            status === 'pending' ? 'warning' :
            status === 'draft' ? 'secondary' :
            'destructive'
          }
        >
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'validUntil',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Valid Until" />
    ),
    cell: ({ row }) => format(row.getValue('validUntil'), 'MMM d, yyyy'),
  },
  {
    accessorKey: 'attachments',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Attachments" />
    ),
    cell: ({ row }) => {
      const attachments = row.getValue('attachments') as string[];
      return attachments?.length ? (
        <div className="flex items-center">
          <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
          <span>{attachments.length}</span>
        </div>
      ) : null;
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];