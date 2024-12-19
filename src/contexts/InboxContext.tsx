import { createContext, useContext, useState, useCallback, useMemo, ReactNode } from 'react';
import { Task, TaskType } from '@/types/admin';

type FilterType = 'priority' | 'recent' | 'starred' | 'archived' | TaskType | null;

interface InboxContextType {
  tasks: Task[];
  filteredTasks: Task[];
  activeFilter: FilterType;
  setFilter: (filter: FilterType) => void;
  toggleFlag: (taskId: number) => void;
  toggleArchive: (taskId: number) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  unreadCount: number;
}

const mockTasks: Task[] = [
  {
    id: 1,
    type: TaskType.Maintenance,
    priority: 'high',
    status: 'pending',
    title: 'Water Leak in Unit 1204',
    description: 'There appears to be water leaking from the ceiling in the master bathroom...',
    sender: {
      name: 'John Smith',
      unit: '1204',
      role: 'Resident'
    },
    time: '10 mins ago',
    unread: true,
    flagged: true,
    archived: false,
    assignedTo: 'Mike Thompson',
    dueDate: '2024-03-15',
    comments: 2
  },
  {
    id: 2,
    type: TaskType.Package,
    priority: 'normal',
    status: 'pending',
    title: 'Package Delivery Notification',
    description: 'A package has arrived for Unit 805. Ready for pickup at the front desk.',
    sender: {
      name: 'Front Desk',
      unit: '805',
      role: 'Staff'
    },
    time: '1 hour ago',
    unread: false,
    flagged: false,
    archived: false
  },
  {
    id: 3,
    type: TaskType.Amenity,
    priority: 'normal',
    status: 'in_progress',
    title: 'Gym Equipment Maintenance Request',
    description: 'The treadmill in the fitness center is making an unusual noise...',
    sender: {
      name: 'Sarah Johnson',
      unit: '502',
      role: 'Resident'
    },
    time: '2 hours ago',
    unread: true,
    flagged: false,
    archived: false
  },
  {
    id: 4,
    type: TaskType.Complaint,
    priority: 'high',
    status: 'pending',
    title: 'Noise Complaint - Unit 1505',
    description: 'Excessive noise coming from the unit above during quiet hours...',
    sender: {
      name: 'Emma Wilson',
      unit: '1405',
      role: 'Resident'
    },
    time: '4 hours ago',
    unread: true,
    flagged: false,
    archived: false,
    dueDate: '2024-03-14',
    comments: 1
  },
];

const InboxContext = createContext<InboxContextType | undefined>(undefined);

export function InboxProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [activeFilter, setActiveFilter] = useState<FilterType>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleFlag = useCallback((taskId: number) => {
    setTasks(prev => prev.map(task =>
      task.id === taskId ? { ...task, flagged: !task.flagged } : task
    ));
  }, []);

  const toggleArchive = useCallback((taskId: number) => {
    setTasks(prev => prev.map(task =>
      task.id === taskId ? { ...task, archived: !task.archived } : task
    ));
  }, []);

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
        filtered = filtered.filter(task => task.type === activeFilter && !task.archived);
        break;
    }

    return filtered;
  }, [tasks, activeFilter, searchTerm]);

  const unreadCount = useMemo(() => 
    tasks.filter(task => task.unread && !task.archived).length,
  [tasks]);

  const value = {
    tasks,
    filteredTasks,
    activeFilter,
    setFilter: setActiveFilter,
    toggleFlag,
    toggleArchive,
    searchTerm,
    setSearchTerm,
    unreadCount,
  };

  return (
    <InboxContext.Provider value={value}>
      {children}
    </InboxContext.Provider>
  );
}

export function useInbox() {
  const context = useContext(InboxContext);
  if (context === undefined) {
    throw new Error('useInbox must be used within an InboxProvider');
  }
  return context;
}