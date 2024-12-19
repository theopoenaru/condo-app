import { useState } from 'react';
import { ParkingSpot } from '@/types/management';

const mockParkingSpots: ParkingSpot[] = [
  {
    id: '1',
    number: 'P101',
    type: 'resident',
    location: 'Level P1',
    assignedTo: 'Unit 1201',
    status: 'occupied',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '2',
    number: 'P102',
    type: 'visitor',
    location: 'Level P1',
    status: 'available',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '3',
    number: 'P201',
    type: 'resident',
    location: 'Level P2',
    assignedTo: 'Unit 1505',
    status: 'occupied',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '4',
    number: 'P202',
    type: 'accessible',
    location: 'Level P2',
    status: 'available',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
];

export function useParking() {
  const [parkingSpots] = useState<ParkingSpot[]>(mockParkingSpots);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading] = useState(false);

  const filteredParkingSpots = parkingSpots.filter(spot =>
    spot.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    spot.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    spot.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    spot.assignedTo?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return {
    parkingSpots: filteredParkingSpots,
    isLoading,
    searchTerm,
    setSearchTerm,
  };
}