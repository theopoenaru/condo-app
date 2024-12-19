import { useState } from 'react';
import { Package } from '@/types/management';

const mockPackages: Package[] = [
  {
    id: '1',
    trackingNumber: '1Z999AA1234567890',
    carrier: 'UPS',
    recipientUnit: '1201',
    deliveryDate: new Date('2024-03-10T09:00:00'),
    status: 'delivered',
  },
  {
    id: '2',
    trackingNumber: '9405511234567890123456',
    carrier: 'USPS',
    recipientUnit: '1505',
    deliveryDate: new Date('2024-03-10T10:30:00'),
    pickupDate: new Date('2024-03-10T14:15:00'),
    status: 'picked_up',
  },
  {
    id: '3',
    trackingNumber: '7196999999',
    carrier: 'FedEx',
    recipientUnit: '1802',
    deliveryDate: new Date('2024-03-10T11:45:00'),
    status: 'delivered',
  },
  {
    id: '4',
    trackingNumber: '1Z999AA1234567891',
    carrier: 'UPS',
    recipientUnit: '2001',
    deliveryDate: new Date('2024-03-10T13:20:00'),
    pickupDate: new Date('2024-03-10T17:30:00'),
    status: 'picked_up',
  },
];

export function usePackages() {
  const [packages] = useState<Package[]>(mockPackages);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading] = useState(false);

  const filteredPackages = packages.filter(pkg =>
    pkg.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pkg.carrier.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pkg.recipientUnit.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return {
    packages: filteredPackages,
    isLoading,
    searchTerm,
    setSearchTerm,
  };
}