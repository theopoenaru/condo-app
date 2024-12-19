import {
  AlertCircle,
  Archive,
  Clock,
  FileText,
  HardHat,
  Package,
  Plus,
  Star,
  Wrench,
  Truck,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useDispatch, useSelector } from 'react-redux';
import { TaskType } from '@/types/admin';
import { setFilter } from '@/store/slices/inboxSlice';
import type { RootState } from '@/store';
import { MessageSquare, CalendarRange } from 'lucide-react';

interface AdminSidebarProps {
  className?: string;
}

export function AdminSidebar({ className }: AdminSidebarProps) {
  const dispatch = useDispatch();
  const activeFilter = useSelector(
    (state: RootState) => state.inbox.activeFilter
  );

  const filters = [
    { id: 'priority', name: 'Priority', icon: AlertCircle },
    { id: 'recent', name: 'Recent', icon: Clock },
    { id: 'starred', name: 'Starred', icon: Star },
    { id: 'archived', name: 'Archived', icon: Archive },
  ];

  const labels = [
    {
      id: TaskType.Maintenance,
      name: 'Maintenance',
      icon: Wrench,
      color: 'text-red-500',
    },
    {
      id: TaskType.Package,
      name: 'Packages',
      icon: Package,
      color: 'text-blue-500',
    },
    {
      id: TaskType.Amenity,
      name: 'Amenities',
      icon: HardHat,
      color: 'text-green-500',
    },
    {
      id: TaskType.Incident,
      name: 'Incidents',
      icon: AlertCircle,
      color: 'text-orange-500',
    },
    {
      id: TaskType.Service,
      name: 'Services',
      icon: FileText,
      color: 'text-purple-500',
    },
    {
      id: TaskType.Vendor,
      name: 'Vendors',
      icon: Truck,
      color: 'text-indigo-500'
    },
    {
      id: TaskType.AmenityBooking,
      name: 'Bookings',
      icon: CalendarRange,
      color: 'text-emerald-500'
    },
    {
      id: TaskType.ReportedPost,
      name: 'Reported',
      icon: MessageSquare,
      color: 'text-rose-500'
    }
  ];

  return (
    <div className={cn("flex flex-col border-r bg-card overflow-hidden", className)}>
      <div className="flex h-14 items-center border-b px-6">
        <span className="text-lg font-semibold">Filters</span>
      </div>
      <div className="flex-1 overflow-y-auto py-4">
        <Button className="w-full justify-start space-x-2">
          <Plus className="h-4 w-4" />
          <span>New Task</span>
        </Button>

        <nav className="mt-8 space-y-1">
          {filters.map((item) => (
            <a
              key={item.id}
              onClick={() =>
                dispatch(setFilter(activeFilter === item.id ? null : item.id))
              }
              className={cn(
                'flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg',
                activeFilter === item.id
                  ? 'text-primary bg-primary/10'
                  : 'text-muted-foreground hover:bg-accent cursor-pointer'
              )}
            >
              <div className="flex items-center space-x-3">
                <item.icon className="h-4 w-4" />
                <span>{item.name}</span>
              </div>
            </a>
          ))}
        </nav>

        <div className="mt-8 space-y-4">
          <h3 className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Labels
          </h3>
          <nav className="space-y-1">
            {labels.map((label) => (
              <a
                key={label.id}
                onClick={() =>
                  dispatch(setFilter(activeFilter === label.id ? null : label.id))
                }
                className={cn(
                  'flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg cursor-pointer',
                  activeFilter === label.id
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground hover:bg-accent'
                )}
              >
                <div className="flex items-center space-x-3">
                  <label.icon className={cn('h-4 w-4', label.color)} />
                  <span>{label.name}</span>
                </div>
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}