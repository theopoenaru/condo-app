import { useState } from 'react';
import { ApprovalRule } from '@/types/management';

const mockApprovals: ApprovalRule[] = [
  {
    id: '1',
    name: 'Purchase Order Approval',
    description: 'Approval chain for purchase orders based on amount',
    type: 'financial',
    threshold: 5000,
    status: 'active',
    approvers: [
      {
        role: 'property_manager',
        order: '1',
        backup: 'operations_manager',
      },
      {
        role: 'financial_manager',
        order: '2',
        backup: 'board_member',
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    name: 'Maintenance Contract Review',
    description: 'Approval process for maintenance service contracts',
    type: 'maintenance',
    threshold: 10000,
    status: 'active',
    approvers: [
      {
        role: 'operations_manager',
        order: '1',
        backup: 'property_manager',
      },
      {
        role: 'financial_manager',
        order: '2',
      },
      {
        role: 'board_member',
        order: '3',
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    name: 'Vendor Onboarding',
    description: 'Approval chain for new vendor registration',
    type: 'vendor',
    status: 'active',
    approvers: [
      {
        role: 'property_manager',
        order: '1',
      },
      {
        role: 'operations_manager',
        order: '2',
        backup: 'financial_manager',
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export function useApprovals() {
  const [approvals] = useState<ApprovalRule[]>(mockApprovals);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading] = useState(false);

  const filteredApprovals = approvals.filter(approval =>
    approval.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    approval.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    approval.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return {
    approvals: filteredApprovals,
    isLoading,
    searchTerm,
    setSearchTerm,
  };
}