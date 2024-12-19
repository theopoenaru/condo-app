import { History, Tag } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Task } from '@/types/admin';
import { TaskDetails } from './task-details/TaskDetails';

interface TaskDetailsSheetProps {
  task: Task | null;
  onClose: () => void;
}

export function TaskDetailsSheet({ task, onClose }: TaskDetailsSheetProps) {
  if (!task) return null;

  return (
    <Dialog open={!!task} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-4xl h-[90vh] p-0 overflow-hidden">
        <DialogTitle className="sr-only">Task Details - {task.title}</DialogTitle>
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
        
        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1 h-[calc(90vh-5rem)]">
        <TaskDetails task={task} />
        </div>
      </DialogContent>
    </Dialog>
  );
}