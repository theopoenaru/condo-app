import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Task } from '@/types/admin';

interface TaskHeaderProps {
  task: Task;
}

export function TaskHeader({ task }: TaskHeaderProps) {
  return (
    <div className="flex items-start space-x-4">
      <Avatar>
        <AvatarFallback className="bg-amber-100 text-amber-600">
          {task.sender.name[0]}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <h2 className="text-lg font-semibold">{task.title}</h2>
        <div className="flex items-center space-x-2 mt-1 text-sm text-muted-foreground">
          <span>{task.sender.name}</span>
          <span>•</span>
          <span>Unit {task.sender.unit}</span>
          <span>•</span>
          <time>{task.time}</time>
        </div>
      </div>
      <Badge 
        variant={task.priority === 'high' ? 'destructive' : 'secondary'}
        className="uppercase"
      >
        {task.priority} Priority
      </Badge>
    </div>
  );
}