import { useState } from 'react';
import { Locker } from '@/types/management';

const mockLockers: Locker[] = [
  {
    id: '1',
    number: 'L101',
    size: 'small',
    location: 'Level P1',
    assignedTo: 'Unit 1201',
    status: 'occupied',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '2',
    number: 'L102',
    size: 'medium',
    location: 'Level P1',
    status: 'available',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '3',
    number: 'L201',
    size: 'large',
    location: 'Level P2',
    assignedTo: 'Unit 1505',
    status: 'occupied',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '4',
    number: 'L202',
    size: 'small',
    location: 'Level P2',
    status: 'maintenance',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
];

export function useLockers() {
  const [lockers] = useState<Locker[]>(mockLockers);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading] = useState(false);

  const filteredLockers = lockers.filter(locker =>
    locker.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    locker.size.toLowerCase().includes(searchTerm.toLowerCase()) ||
    locker.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    locker.assignedTo?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return {
    lockers: filteredLockers,
    isLoading,
    searchTerm,
    setSearchTerm,
  };
}