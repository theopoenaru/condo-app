import { AlertCircle, FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Task } from '@/types/admin';
import { cn } from '@/lib/utils';

interface IncidentTaskProps {
  task: Task;
  onClick: () => void;
}

export function IncidentTask({ task, onClick }: IncidentTaskProps) {
  return (
    <div 
      onClick={onClick}
      className="p-4 hover:bg-accent/50 rounded-lg cursor-pointer"
    >
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <AlertCircle className="h-5 w-5 text-orange-500" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className={cn(
                'font-medium',
                task.unread ? 'text-foreground' : 'text-muted-foreground'
              )}>
                {task.sender.name}
              </span>
              <Badge variant="destructive" className="uppercase">
                {task.priority} Priority
              </Badge>
            </div>
            <span className="text-sm text-muted-foreground">{task.time}</span>
          </div>
          <h3 className="mt-1 font-medium">{task.title}</h3>
          <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
            {task.description}
          </p>
          {task.attachments && task.attachments.length > 0 && (
            <div className="mt-2 flex items-center space-x-2 text-sm text-muted-foreground">
              <FileText className="h-4 w-4" />
              <span>{task.attachments.length} attachments</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}