import { useLocation } from 'react-router-dom';
import { AdminView } from '@/components/admin/AdminView';
import { TaskDetailsView } from '@/components/admin/TaskDetailsView';

export default function InboxPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const taskId = searchParams.get('task');

  return taskId ? <TaskDetailsView taskId={taskId} /> : <AdminView />;
}