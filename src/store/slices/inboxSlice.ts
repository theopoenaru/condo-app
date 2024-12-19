import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task, TaskType, TaskStatus } from '@/types/admin';

interface InboxState {
  tasks: Task[];
  activeFilter: 'priority' | 'recent' | 'starred' | 'archived' | TaskType | null;
  searchTerm: string;
}

const initialTasks: Task[] = [
  {
    id: 1,
    type: TaskType.Incident,
    priority: 'high',
    status: 'pending' as TaskStatus,
    title: 'Security Breach - Unauthorized Access',
    description: 'Unidentified person attempted to access the building through emergency exit...',
    sender: {
      name: 'Security Team',
      unit: 'N/A',
      role: 'Security'
    },
    time: '10 mins ago',
    unread: true,
    flagged: true,
    archived: false,
    assignedTo: 'Building Manager',
    dueDate: '2024-03-15',
  },
  {
    id: 2,
    type: TaskType.Service,
    priority: 'high',
    status: 'pending' as TaskStatus,
    title: 'Elevator #2 Service Request',
    description: 'Elevator making unusual noise and stopping between floors. Requires immediate inspection.',
    sender: {
      name: 'Building Operations',
      unit: 'N/A',
      role: 'Maintenance Staff'
    },
    time: '1 hour ago',
    unread: true,
    flagged: false,
    assignedTo: 'Otis Elevator Co.',
    dueDate: '2024-03-14'
  },
  {
    id: 3,
    type: TaskType.Vendor,
    priority: 'normal',
    status: 'pending' as TaskStatus,
    title: 'Annual HVAC Maintenance Contract Renewal',
    description: 'Review and approval needed for HVAC maintenance contract renewal. Updated pricing and terms attached.',
    sender: {
      name: 'ABC HVAC Services',
      unit: 'N/A',
      role: 'Vendor'
    },
    time: '2 hours ago',
    unread: false,
    flagged: false,
    dueDate: '2024-03-25',
    attachments: ['contract_2024.pdf', 'pricing_sheet.pdf']
  }
];

const initialState: InboxState = {
  tasks: initialTasks,
  activeFilter: null,
  searchTerm: '',
};

export const inboxSlice = createSlice({
  name: 'inbox',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<InboxState['activeFilter']>) => {
      state.activeFilter = action.payload;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    toggleFlag: (state, action: PayloadAction<number>) => {
      const task = state.tasks.find(t => t.id === action.payload);
      if (task) {
        task.flagged = !task.flagged;
      }
    },
    toggleArchive: (state, action: PayloadAction<number>) => {
      const task = state.tasks.find(t => t.id === action.payload);
      if (task) {
        task.archived = !task.archived;
      }
    },
  },
});

export const { setFilter, setSearchTerm, toggleFlag, toggleArchive } = inboxSlice.actions;

export default inboxSlice.reducer;