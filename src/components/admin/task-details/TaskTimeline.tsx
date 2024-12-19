import { CheckCircle2, Clock } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Task } from '@/types/admin';
import { cn } from '@/lib/utils';

interface TaskTimelineProps {
  task: Task;
}

export function TaskTimeline({ task }: TaskTimelineProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <h3 className="font-medium mb-4">Status</h3>
        <div className="relative space-y-6">
          <div className="absolute left-4 top-1 bottom-2 w-0.5 bg-muted" />
          
          {/* Reported */}
          <div className="relative flex items-start">
            <div className={cn(
              "absolute left-0 w-8 h-8 rounded-full flex items-center justify-center",
              task.status === 'pending' ? "bg-primary" : "bg-muted"
            )}>
              <CheckCircle2 className={cn(
                "h-4 w-4",
                task.status === 'pending' ? "text-primary-foreground" : "text-muted-foreground"
              )} />
            </div>
            <div className="ml-12">
              <div className="text-sm font-medium">Reported</div>
              <div className="text-xs text-muted-foreground">{task.time}</div>
            </div>
          </div>

          {/* In Progress */}
          <div className="relative flex items-start">
            <div className={cn(
              "absolute left-0 w-8 h-8 rounded-full flex items-center justify-center",
              task.status === 'in_progress' ? "bg-primary ring-4 ring-primary/10" : "bg-muted"
            )}>
              <Clock className={cn(
                "h-4 w-4",
                task.status === 'in_progress' ? "text-primary-foreground" : "text-muted-foreground"
              )} />
            </div>
            <div className="ml-12">
              <div className="text-sm font-medium">In Progress</div>
              <div className="text-xs text-muted-foreground">
                {task.status === 'in_progress' ? 'Currently working' : 'Pending'}
              </div>
            </div>
          </div>

          {/* Completed */}
          <div className="relative flex items-start">
            <div className={cn(
              "absolute left-0 w-8 h-8 rounded-full flex items-center justify-center",
              task.status === 'completed' ? "bg-primary" : "bg-muted"
            )}>
              <CheckCircle2 className={cn(
                "h-4 w-4",
                task.status === 'completed' ? "text-primary-foreground" : "text-muted-foreground"
              )} />
            </div>
            <div className="ml-12">
              <div className="text-sm font-medium">Completed</div>
              <div className="text-xs text-muted-foreground">Pending verification</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}