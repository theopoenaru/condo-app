import { useState } from 'react';
import { Invoice } from '@/types/management';

const mockInvoices: Invoice[] = [
  {
    id: '1',
    invoiceNumber: 'INV-2024-001',
    vendor: 'ABC Maintenance',
    jobNumber: 'JOB-2024-001',
    poNumber: 'PO-2024-001',
    description: 'Q1 HVAC maintenance service',
    amount: 3000,
    status: 'pending',
    dueDate: new Date('2024-04-15'),
    notes: 'First quarter maintenance payment',
    attachments: ['invoice.pdf'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    invoiceNumber: 'INV-2024-002',
    vendor: 'SecureGuard Solutions',
    jobNumber: 'JOB-2024-004',
    poNumber: 'PO-2024-002',
    description: 'Security system upgrade - Phase 1',
    amount: 4500,
    status: 'paid',
    dueDate: new Date('2024-03-30'),
    paymentDate: new Date('2024-03-28'),
    paymentMethod: 'bank_transfer',
    notes: 'Payment completed via wire transfer',
    attachments: ['invoice.pdf', 'payment_receipt.pdf'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    invoiceNumber: 'INV-2024-003',
    vendor: 'GreenScape',
    jobNumber: 'JOB-2024-003',
    description: 'March landscaping services',
    amount: 2000,
    status: 'overdue',
    dueDate: new Date('2024-03-15'),
    notes: 'Payment reminder sent',
    attachments: ['invoice.pdf', 'service_report.pdf'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export function useInvoices() {
  const [invoices] = useState<Invoice[]>(mockInvoices);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading] = useState(false);

  const filteredInvoices = invoices.filter(invoice =>
    invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.jobNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return {
    invoices: filteredInvoices,
    isLoading,
    searchTerm,
    setSearchTerm,
  };
}