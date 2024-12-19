import { useState } from 'react';
import { SecurityLog } from '@/types/management';

const mockLogs: SecurityLog[] = [
  {
    id: '1',
    timestamp: new Date('2024-03-10T08:30:00'),
    type: 'access',
    location: 'Main Entrance',
    description: 'Unauthorized access attempt',
    officer: 'John Wilson',
    severity: 'high',
  },
  {
    id: '2',
    timestamp: new Date('2024-03-10T09:15:00'),
    type: 'alarm',
    location: 'Level 2 Fire Exit',
    description: 'Fire alarm triggered - false alarm',
    officer: 'Sarah Chen',
    severity: 'medium',
  },
  {
    id: '3',
    timestamp: new Date('2024-03-10T10:00:00'),
    type: 'patrol',
    location: 'Parking Level P1',
    description: 'Routine patrol completed - all clear',
    officer: 'Mike Brown',
    severity: 'low',
  },
  {
    id: '4',
    timestamp: new Date('2024-03-10T11:30:00'),
    type: 'incident',
    location: 'Pool Area',
    description: 'Minor injury reported - first aid administered',
    officer: 'Lisa Martinez',
    severity: 'medium',
  },
];

export function useSecurityLogs() {
  const [logs] = useState<SecurityLog[]>(mockLogs);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading] = useState(false);

  const filteredLogs = logs.filter(log =>
    log.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.officer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return {
    logs: filteredLogs,
    isLoading,
    searchTerm,
    setSearchTerm,
  };
}