import { useState } from 'react';
import { VisitorParking } from '@/types/management';

const mockPermits: VisitorParking[] = [
  {
    id: '1',
    permitNumber: 'VP2024001',
    licensePlate: 'ABC123',
    hostUnit: '1201',
    startDate: new Date('2024-03-10T09:00:00'),
    endDate: new Date('2024-03-10T17:00:00'),
    status: 'active',
  },
  {
    id: '2',
    permitNumber: 'VP2024002',
    licensePlate: 'XYZ789',
    hostUnit: '1505',
    startDate: new Date('2024-03-10T10:00:00'),
    endDate: new Date('2024-03-11T10:00:00'),
    status: 'active',
  },
  {
    id: '3',
    permitNumber: 'VP2024003',
    licensePlate: 'DEF456',
    hostUnit: '1802',
    startDate: new Date('2024-03-09T14:00:00'),
    endDate: new Date('2024-03-10T14:00:00'),
    status: 'expired',
  },
  {
    id: '4',
    permitNumber: 'VP2024004',
    licensePlate: 'GHI789',
    hostUnit: '2001',
    startDate: new Date('2024-03-11T09:00:00'),
    endDate: new Date('2024-03-11T17:00:00'),
    status: 'pending',
  },
];

export function useVisitorParking() {
  const [permits] = useState<VisitorParking[]>(mockPermits);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading] = useState(false);

  const filteredPermits = permits.filter(permit =>
    permit.permitNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    permit.licensePlate.toLowerCase().includes(searchTerm.toLowerCase()) ||
    permit.hostUnit.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return {
    permits: filteredPermits,
    isLoading,
    searchTerm,
    setSearchTerm,
  };
}