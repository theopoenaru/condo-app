import { useState } from 'react';
import { PurchaseOrder } from '@/types/management';

const mockPurchaseOrders: PurchaseOrder[] = [
  {
    id: '1',
    poNumber: 'PO-2024-001',
    vendor: 'ABC Maintenance',
    jobNumber: 'JOB-2024-001',
    description: 'HVAC system maintenance supplies and labor',
    amount: 2500,
    status: 'approved',
    dueDate: new Date('2024-03-30'),
    terms: 'Net 30',
    notes: 'Quarterly maintenance contract',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    poNumber: 'PO-2024-002',
    vendor: 'ABC Maintenance',
    jobNumber: 'JOB-2024-002',
    description: 'Emergency plumbing repair parts and labor',
    amount: 1500,
    status: 'pending',
    dueDate: new Date('2024-03-15'),
    terms: 'Net 15',
    notes: 'Emergency repair authorization',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    poNumber: 'PO-2024-003',
    vendor: 'GreenScape',
    jobNumber: 'JOB-2024-003',
    description: 'Spring landscaping materials and labor',
    amount: 3500,
    status: 'draft',
    dueDate: new Date('2024-04-15'),
    terms: 'Net 30',
    notes: 'Seasonal maintenance work',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export function usePurchaseOrders() {
  const [purchaseOrders] = useState<PurchaseOrder[]>(mockPurchaseOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading] = useState(false);

  const filteredPurchaseOrders = purchaseOrders.filter(po =>
    po.poNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    po.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    po.jobNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return {
    purchaseOrders: filteredPurchaseOrders,
    isLoading,
    searchTerm,
    setSearchTerm,
  };
}