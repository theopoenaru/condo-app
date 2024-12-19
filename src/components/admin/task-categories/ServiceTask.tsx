import { Wrench, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Task } from '@/types/admin';
import { cn } from '@/lib/utils';

interface ServiceTaskProps {
  task: Task;
  onClick: () => void;
}

export function ServiceTask({ task, onClick }: ServiceTaskProps) {
  return (
    <div
      onClick={onClick}
      className="p-4 hover:bg-accent/50 rounded-lg cursor-pointer"
    >
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <Wrench className="h-5 w-5 text-purple-500" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span
                className={cn(
                  'font-medium',
                  task.unread ? 'text-foreground' : 'text-muted-foreground'
                )}
              >
                {task.sender.name}
              </span>
              <Badge
                variant={task.priority === 'high' ? 'destructive' : 'secondary'}
              >
                {task.priority}
              </Badge>
            </div>
            <span className="text-sm text-muted-foreground">{task.time}</span>
          </div>
          <h3 className="mt-1 font-medium">{task.title}</h3>
          <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
            {task.description}
          </p>
          {task.dueDate && (
            <div className="mt-2 flex items-center space-x-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Due {task.dueDate}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
