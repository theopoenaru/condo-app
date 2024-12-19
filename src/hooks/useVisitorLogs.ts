import { useState } from 'react';
import { VisitorLog } from '@/types/management';

const mockLogs: VisitorLog[] = [
  {
    id: '1',
    checkIn: new Date('2024-03-10T09:00:00'),
    checkOut: new Date('2024-03-10T11:00:00'),
    visitorName: 'James Smith',
    hostUnit: '1201',
    purpose: 'guest',
    status: 'checked_out',
  },
  {
    id: '2',
    checkIn: new Date('2024-03-10T10:00:00'),
    visitorName: 'Sarah Wilson',
    hostUnit: '1505',
    purpose: 'contractor',
    status: 'checked_in',
  },
  {
    id: '3',
    checkIn: new Date('2024-03-10T11:30:00'),
    checkOut: new Date('2024-03-10T12:45:00'),
    visitorName: 'Mike Johnson',
    hostUnit: '1802',
    purpose: 'delivery',
    status: 'checked_out',
  },
  {
    id: '4',
    checkIn: new Date('2024-03-10T13:00:00'),
    visitorName: 'Lisa Brown',
    hostUnit: '2001',
    purpose: 'guest',
    status: 'checked_in',
  },
];

export function useVisitorLogs() {
  const [logs] = useState<VisitorLog[]>(mockLogs);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading] = useState(false);

  const filteredLogs = logs.filter(log =>
    log.visitorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.hostUnit.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.purpose.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return {
    logs: filteredLogs,
    isLoading,
    searchTerm,
    setSearchTerm,
  };
}