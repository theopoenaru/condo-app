import { useState } from 'react';
import { Amenity } from '@/types/management';

const mockAmenities: Amenity[] = [
  {
    id: '1',
    name: 'Swimming Pool',
    location: 'Ground Floor',
    capacity: 50,
    description: 'Heated indoor pool with lap lanes',
    status: 'available',
    rules: 'No diving. Children must be supervised.',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    name: 'Fitness Center',
    location: 'Level 2',
    capacity: 30,
    description: '24/7 access gym with cardio and weight equipment',
    status: 'available',
    rules: 'Wipe equipment after use. No outside trainers.',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    name: 'Party Room',
    location: 'Level 3',
    capacity: 100,
    description: 'Large event space with kitchen',
    status: 'maintenance',
    rules: 'Booking required. No loud music after 10 PM.',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export function useAmenities() {
  const [amenities, setAmenities] = useState<Amenity[]>(mockAmenities);
  const [isLoading] = useState(false);

  const updateAmenity = (updatedAmenity: Amenity) => {
    setAmenities(prev => prev.map(amenity => 
      amenity.id === updatedAmenity.id 
        ? { ...updatedAmenity, updatedAt: new Date() }
        : amenity
    ));
  };

  const deleteAmenity = (id: string) => {
    setAmenities(prev => prev.filter(amenity => amenity.id !== id));
  };

  const addAmenity = (newAmenity: Omit<Amenity, 'id' | 'createdAt' | 'updatedAt'>) => {
    const amenity: Amenity = {
      ...newAmenity,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setAmenities(prev => [...prev, amenity]);
  };

  return {
    amenities,
    isLoading,
    updateAmenity,
    deleteAmenity,
    addAmenity,
  };
}