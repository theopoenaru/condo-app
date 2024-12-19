import { useState } from 'react';
import { Document } from '@/types/management';

const mockDocuments: Document[] = [
  {
    id: '1',
    title: 'Building Rules and Regulations',
    description: 'Comprehensive guide to building policies and procedures',
    category: 'policies',
    type: 'pdf',
    size: 2500000,
    url: 'https://example.com/docs/rules.pdf',
    permissions: ['all'],
    version: 1,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    title: 'Maintenance Request Form',
    description: 'Standard form for submitting maintenance requests',
    category: 'forms',
    type: 'doc',
    size: 150000,
    url: 'https://example.com/docs/maintenance-form.doc',
    permissions: ['all'],
    version: 2,
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-15'),
  },
  {
    id: '3',
    title: 'Emergency Response Plan',
    description: 'Detailed procedures for emergency situations',
    category: 'manuals',
    type: 'pdf',
    size: 5000000,
    url: 'https://example.com/docs/emergency-plan.pdf',
    permissions: ['staff'],
    version: 3,
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date('2024-03-01'),
  },
];

export function useDocuments() {
  const [documents] = useState<Document[]>(mockDocuments);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading] = useState(false);

  const filteredDocuments = documents.filter(document =>
    document.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    document.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    document.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return {
    documents: filteredDocuments,
    isLoading,
    searchTerm,
    setSearchTerm,
  };
}