import { TaskType } from '@/types/admin';

export const taskTypeStyles: Record<TaskType, string> = {
  [TaskType.Maintenance]: 'bg-red-100 text-red-800',
  [TaskType.Package]: 'bg-blue-100 text-blue-800',
  [TaskType.Amenity]: 'bg-green-100 text-green-800',
  [TaskType.Incident]: 'bg-orange-100 text-orange-800',
  [TaskType.Service]: 'bg-purple-100 text-purple-800',
  [TaskType.Vendor]: 'bg-indigo-100 text-indigo-800',
};