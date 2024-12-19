import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header';
import { DataTableRowActions } from '@/components/ui/data-table-row-actions';
import { Workflow } from '@/types/management';
import { format } from 'date-fns';

export const columns: ColumnDef<Workflow>[] = [
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
    accessorKey: 'category',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
    cell: ({ row }) => (
      <Badge variant="outline">
        {row.getValue('category')}
      </Badge>
    ),
  },
  {
    accessorKey: 'steps',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Steps" />
    ),
    cell: ({ row }) => {
      const steps = row.original.steps;
      return (
        <Badge variant="secondary">
          {steps.length} steps
        </Badge>
      );
    },
  },
  {
    accessorKey: 'sla',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="SLA" />
    ),
    cell: ({ row }) => (
      <span>{row.getValue('sla')} hours</span>
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