import { useState } from 'react';
import { Quote } from '@/types/management';

const mockQuotes: Quote[] = [
  {
    id: '1',
    quoteNumber: 'QT-2024-001',
    vendor: 'ABC Maintenance',
    jobNumber: 'JOB-2024-001',
    description: 'Annual HVAC maintenance service contract',
    amount: 12000,
    status: 'pending',
    validUntil: new Date('2024-04-30'),
    terms: 'Quarterly payments of $3,000',
    notes: 'Includes all parts and labor for routine maintenance',
    attachments: ['quote_details.pdf', 'service_schedule.pdf'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    quoteNumber: 'QT-2024-002',
    vendor: 'SecureGuard Solutions',
    jobNumber: 'JOB-2024-004',
    description: 'Security system upgrade and monitoring',
    amount: 8500,
    status: 'approved',
    validUntil: new Date('2024-04-15'),
    terms: 'Payment due within 30 days',
    notes: 'Includes new cameras and monitoring equipment',
    attachments: ['security_proposal.pdf'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    quoteNumber: 'QT-2024-003',
    vendor: 'GreenScape',
    jobNumber: 'JOB-2024-003',
    description: 'Annual landscaping and maintenance contract',
    amount: 24000,
    status: 'draft',
    validUntil: new Date('2024-05-15'),
    terms: 'Monthly payments of $2,000',
    notes: 'Includes seasonal plantings and weekly maintenance',
    attachments: ['landscape_proposal.pdf', 'planting_schedule.pdf'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export function useQuotes() {
  const [quotes] = useState<Quote[]>(mockQuotes);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading] = useState(false);

  const filteredQuotes = quotes.filter(quote =>
    quote.quoteNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    quote.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    quote.jobNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return {
    quotes: filteredQuotes,
    isLoading,
    searchTerm,
    setSearchTerm,
  };
}