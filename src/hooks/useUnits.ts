import { useState } from 'react';
import { Unit } from '@/types/management';

const mockUnits: Unit[] = [
  {
    id: '1',
    number: '1201',
    type: '2br',
    floor: 12,
    sqft: 1200,
    bedrooms: 2,
    bathrooms: 2,
    status: 'available',
    features: ['Corner Unit', 'City View', 'Updated Kitchen'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    number: '1202',
    type: '1br',
    floor: 12,
    sqft: 850,
    bedrooms: 1,
    bathrooms: 1,
    status: 'occupied',
    features: ['Mountain View', 'Balcony'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    number: 'PH01',
    type: 'penthouse',
    floor: 15,
    sqft: 2500,
    bedrooms: 3,
    bathrooms: 3.5,
    status: 'maintenance',
    features: ['Panoramic Views', 'Private Elevator', 'Wine Cellar'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export function useUnits() {
  const [units] = useState<Unit[]>(mockUnits);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading] = useState(false);

  const filteredUnits = units.filter(unit =>
    unit.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    unit.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return {
    units: filteredUnits,
    isLoading,
    searchTerm,
    setSearchTerm,
  };
}