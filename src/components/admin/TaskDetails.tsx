import { 
  AlertCircle,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  History,
  Paperclip,
  Tag,
  X,
  Users
} from 'lucide-react';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Task } from '@/types/admin';
import { cn } from '@/lib/utils';

interface TaskDetailsProps {
  task: Task;
}

export function TaskDetails({ task }: TaskDetailsProps) {
  return (
    <>
      {/* Header */}
      <div className="px-6 py-4 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Tag className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">TASK-{task.id}</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="border-2">
              Due in 24h
            </Badge>
            <Button variant="outline" size="sm">
              <History className="h-4 w-4 mr-2" />
              History
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6 space-y-6">
      {/* Task Header */}
      <div className="space-y-4">
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

        {/* Smart Context */}
        <Card className="bg-blue-50 border-blue-100">
          <CardContent className="p-3">
            <div className="flex items-center space-x-4 text-sm text-blue-700">
              <AlertCircle className="h-4 w-4" />
              <span>
                <strong>Similar Issue:</strong> 2 {task.type.toLowerCase()} issues reported in the last month
              </span>
            </div>
          </CardContent>
        </Card>

        <p className="text-muted-foreground">
          {task.description}
        </p>

        {/* Key Stats */}
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
      </div>

      {/* Status Timeline */}
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

      {/* Comments Section */}
      <div className="space-y-4">
        <h3 className="font-medium">Comments</h3>
        <div className="flex space-x-3">
          <Avatar>
            <AvatarFallback>PM</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <textarea 
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
              placeholder="Add a comment..."
              rows={1}
            />
            <div className="mt-2 flex items-center justify-between">
              <Button variant="outline" size="sm">
                <Paperclip className="h-4 w-4 mr-2" />
                Attach
              </Button>
              <Button size="sm">Send</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}