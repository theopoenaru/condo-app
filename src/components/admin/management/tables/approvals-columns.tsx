import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header';
import { DataTableRowActions } from '@/components/ui/data-table-row-actions';
import { ApprovalRule } from '@/types/management';
import { format } from 'date-fns';

export const columns: ColumnDef<ApprovalRule>[] = [
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
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: 'type',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
    cell: ({ row }) => (
      <Badge variant="outline">
        {row.getValue('type')}
      </Badge>
    ),
  },
  {
    accessorKey: 'threshold',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Threshold" />
    ),
    cell: ({ row }) => {
      const threshold = row.getValue('threshold') as number;
      return threshold ? `$${threshold.toLocaleString()}` : 'N/A';
    },
  },
  {
    accessorKey: 'approvers',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Approvers" />
    ),
    cell: ({ row }) => {
      const approvers = row.original.approvers;
      return (
        <Badge variant="secondary">
          {approvers.length} {approvers.length === 1 ? 'approver' : 'approvers'}
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
            status === 'active' ? 'success' :
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
    accessorKey: 'updatedAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last Updated" />
    ),
    cell: ({ row }) => format(row.getValue('updatedAt'), 'MMM d, yyyy'),
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];