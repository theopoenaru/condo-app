import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header';
import { DataTableRowActions } from '@/components/ui/data-table-row-actions';
import { IncidentReport } from '@/types/management';
import { format } from 'date-fns';

export const columns: ColumnDef<IncidentReport>[] = [
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
    accessorKey: 'reportNumber',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Report #" />
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
    accessorKey: 'location',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Location" />
    ),
  },
  {
    accessorKey: 'reportedBy',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Reported By" />
    ),
  },
  {
    accessorKey: 'reportedAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Reported At" />
    ),
    cell: ({ row }) => format(row.getValue('reportedAt'), 'MMM d, yyyy HH:mm'),
  },
  {
    accessorKey: 'severity',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Severity" />
    ),
    cell: ({ row }) => {
      const severity = row.getValue('severity') as string;
      return (
        <Badge
          variant={
            severity === 'high' ? 'destructive' :
            severity === 'medium' ? 'warning' :
            'secondary'
          }
        >
          {severity}
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
            status === 'open' ? 'destructive' :
            status === 'in_progress' ? 'warning' :
            'success'
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