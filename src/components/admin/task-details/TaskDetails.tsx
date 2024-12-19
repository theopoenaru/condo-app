import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import type { Task } from '@/types/admin';
import { TaskHeader } from './TaskHeader';
import { TaskContext } from './TaskContext';
import { TaskStats } from './TaskStats';
import { TaskTimeline } from './TaskTimeline';
import { TaskMessages } from './TaskMessages';

interface TaskDetailsProps {
  task: Task;
}

export function TaskDetails({ task }: TaskDetailsProps) {
  const messages = useSelector((state: RootState) => 
    state.messages.messages[task.id] || []
  );

  return (
    <>
      {/* Content */}
      <div className="px-6 py-6 space-y-6">
        {/* Task Header */}
        <div className="space-y-4">
          <TaskHeader task={task} />
          <TaskContext task={task} />
          <p className="text-muted-foreground">{task.description}</p>
          <TaskStats task={task} />
        </div>

        <div className="space-y-6">
          <TaskTimeline task={task} />
          <div className="space-y-4">
            <h3 className="font-medium">Messages</h3>
            <TaskMessages taskId={task.id} messages={messages} />
          </div>
        </div>
      </div>
    </>
  );
}