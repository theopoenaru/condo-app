import { Building2, Calendar, Users } from 'lucide-react';
import { Task } from '@/types/admin';

interface TaskStatsProps {
  task: Task;
}

export function TaskStats({ task }: TaskStatsProps) {
  return (
    <div className="grid grid-cols-3 gap-4 text-sm">
      <div className="flex items-center p-3 bg-muted rounded-lg">
        <Users className="h-4 w-4 text-muted-foreground mr-2" />
        <div>
          <div className="text-muted-foreground">Assigned To</div>
          <div className="font-medium">{task.assignedTo || 'Unassigned'}</div>
        </div>
      </div>
      <div className="flex items-center p-3 bg-muted rounded-lg">
        <Building2 className="h-4 w-4 text-muted-foreground mr-2" />
        <div>
          <div className="text-muted-foreground">Location</div>
          <div className="font-medium">Unit {task.sender.unit}</div>
        </div>
      </div>
      <div className="flex items-center p-3 bg-muted rounded-lg">
        <Calendar className="h-4 w-4 text-muted-foreground mr-2" />
        <div>
          <div className="text-muted-foreground">Due Date</div>
          <div className="font-medium">{task.dueDate || 'Not set'}</div>
        </div>
      </div>
    </div>
  );
}