import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { Task, TaskType } from '@/types/admin';

export function useInboxFilters() {
  const { tasks, activeFilter, searchTerm } = useSelector((state: RootState) => state.inbox);

  const filteredTasks = useMemo(() => {
    let filtered = tasks;

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(term) ||
        task.description.toLowerCase().includes(term) ||
        task.sender.name.toLowerCase().includes(term) ||
        task.sender.unit.toLowerCase().includes(term)
      );
    }

    // Apply type/status filter
    switch (activeFilter) {
      case 'priority':
        filtered = filtered.filter(task => task.priority === 'high' && !task.archived);
        break;
      case 'recent':
        filtered = filtered.filter(task => !task.archived)
          .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
        break;
      case 'starred':
        filtered = filtered.filter(task => task.flagged && !task.archived);
        break;
      case 'archived':
        filtered = filtered.filter(task => task.archived);
        break;
      case TaskType.Maintenance:
      case TaskType.Package:
      case TaskType.Amenity:
      case TaskType.Complaint:
      case TaskType.Payment:
      case TaskType.Access:
        filtered = filtered.filter(task => task.type === activeFilter && !task.archived);
        break;
    }

    return filtered;
  }, [tasks, activeFilter, searchTerm]);

  const unreadCount = useMemo(() => 
    tasks.filter(task => task.unread && !task.archived).length,
  [tasks]);

  return {
    filteredTasks,
    unreadCount,
  };
}