import { AlertCircle } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Task } from '@/types/admin';

interface TaskContextProps {
  task: Task;
}

export function TaskContext({ task }: TaskContextProps) {
  return (
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
  );
}