import { useState } from 'react';
import { Vendor } from '@/types/management';

const mockVendors: Vendor[] = [
  {
    id: '1',
    name: 'ABC Maintenance Services',
    category: 'maintenance',
    description: 'General building maintenance and repairs',
    contactName: 'John Smith',
    email: 'john@abcmaintenance.com',
    phone: '(555) 123-4567',
    address: '123 Service St, City, ST 12345',
    taxId: '12-3456789',
    insurance: 'Policy #INS123456',
    status: 'active',
    notes: 'Preferred vendor for emergency repairs',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    name: 'SecureGuard Solutions',
    category: 'security',
    description: '24/7 security services and monitoring',
    contactName: 'Sarah Johnson',
    email: 'sarah@secureguard.com',
    phone: '(555) 234-5678',
    address: '456 Security Ave, City, ST 12345',
    taxId: '23-4567890',
    insurance: 'Policy #INS234567',
    status: 'active',
    notes: 'Current security contract expires in 6 months',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    name: 'GreenScape Landscaping',
    category: 'landscaping',
    description: 'Professional landscaping and grounds maintenance',
    contactName: 'Mike Wilson',
    email: 'mike@greenscape.com',
    phone: '(555) 345-6789',
    address: '789 Garden Rd, City, ST 12345',
    taxId: '34-5678901',
    insurance: 'Policy #INS345678',
    status: 'pending',
    notes: 'Seasonal contract under review',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export function useVendors() {
  const [vendors] = useState<Vendor[]>(mockVendors);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading] = useState(false);

  const filteredVendors = vendors.filter(vendor =>
    vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendor.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendor.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendor.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return {
    vendors: filteredVendors,
    isLoading,
    searchTerm,
    setSearchTerm,
  };
}