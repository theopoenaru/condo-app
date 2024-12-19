import { useState } from 'react';
import { Reservation } from '@/types/management';

const mockReservations: Reservation[] = [
  {
    id: '1',
    reservationNumber: 'RES2024001',
    amenity: 'Party Room',
    residentUnit: '1201',
    startTime: new Date('2024-03-15T18:00:00'),
    endTime: new Date('2024-03-15T22:00:00'),
    guests: 20,
    status: 'confirmed',
  },
  {
    id: '2',
    reservationNumber: 'RES2024002',
    amenity: 'Tennis Court',
    residentUnit: '1505',
    startTime: new Date('2024-03-16T10:00:00'),
    endTime: new Date('2024-03-16T12:00:00'),
    guests: 4,
    status: 'pending',
  },
  {
    id: '3',
    reservationNumber: 'RES2024003',
    amenity: 'BBQ Area',
    residentUnit: '1802',
    startTime: new Date('2024-03-17T17:00:00'),
    endTime: new Date('2024-03-17T20:00:00'),
    guests: 8,
    status: 'confirmed',
  },
  {
    id: '4',
    reservationNumber: 'RES2024004',
    amenity: 'Party Room',
    residentUnit: '2001',
    startTime: new Date('2024-03-18T19:00:00'),
    endTime: new Date('2024-03-18T23:00:00'),
    guests: 15,
    status: 'cancelled',
  },
];

export function useReservations() {
  const [reservations] = useState<Reservation[]>(mockReservations);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading] = useState(false);

  const filteredReservations = reservations.filter(reservation =>
    reservation.reservationNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reservation.amenity.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reservation.residentUnit.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return {
    reservations: filteredReservations,
    isLoading,
    searchTerm,
    setSearchTerm,
  };
}