import { useState } from 'react';
import { Resident } from '@/types/management';

const mockResidents: Resident[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '(555) 123-4567',
    unit: '1201',
    moveInDate: new Date('2023-06-01'),
    leaseEnd: new Date('2024-05-31'),
    status: 'active',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    phone: '(555) 234-5678',
    unit: '1505',
    moveInDate: new Date('2023-08-15'),
    leaseEnd: new Date('2024-08-14'),
    status: 'active',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    name: 'Michael Chen',
    email: 'michael.c@example.com',
    phone: '(555) 345-6789',
    unit: 'PH01',
    moveInDate: new Date('2024-03-01'),
    leaseEnd: new Date('2025-02-28'),
    status: 'pending',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export function useResidents() {
  const [residents] = useState<Resident[]>(mockResidents);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading] = useState(false);

  const filteredResidents = residents.filter(resident =>
    resident.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resident.unit.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resident.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return {
    residents: filteredResidents,
    isLoading,
    searchTerm,
    setSearchTerm,
  };
}