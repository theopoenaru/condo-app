import { useState } from 'react';
import { Workflow } from '@/types/management';

const mockWorkflows: Workflow[] = [
  {
    id: '1',
    name: 'Maintenance Request',
    description: 'Standard workflow for handling maintenance requests',
    category: 'maintenance',
    sla: 24,
    status: 'active',
    steps: [
      {
        name: 'Initial Review',
        type: 'approval',
        assignee: 'manager',
        duration: '2',
      },
      {
        name: 'Assign Maintenance Staff',
        type: 'task',
        assignee: 'maintenance',
        duration: '4',
      },
      {
        name: 'Complete Work',
        type: 'task',
        assignee: 'maintenance',
        duration: '16',
      },
      {
        name: 'Quality Check',
        type: 'approval',
        assignee: 'manager',
        duration: '2',
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    name: 'Incident Report',
    description: 'Workflow for handling security incidents',
    category: 'incident',
    sla: 4,
    status: 'active',
    steps: [
      {
        name: 'Security Assessment',
        type: 'task',
        assignee: 'security',
        duration: '1',
      },
      {
        name: 'Manager Review',
        type: 'approval',
        assignee: 'manager',
        duration: '1',
      },
      {
        name: 'Resident Notification',
        type: 'notification',
        assignee: 'admin',
        duration: '1',
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    name: 'Vendor Contract Review',
    description: 'Process for reviewing and approving vendor contracts',
    category: 'vendor',
    sla: 72,
    status: 'draft',
    steps: [
      {
        name: 'Initial Review',
        type: 'task',
        assignee: 'manager',
        duration: '8',
      },
      {
        name: 'Legal Review',
        type: 'approval',
        assignee: 'admin',
        duration: '24',
      },
      {
        name: 'Financial Approval',
        type: 'approval',
        assignee: 'manager',
        duration: '8',
      },
      {
        name: 'Contract Finalization',
        type: 'task',
        assignee: 'admin',
        duration: '4',
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export function useWorkflows() {
  const [workflows] = useState<Workflow[]>(mockWorkflows);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading] = useState(false);

  const filteredWorkflows = workflows.filter(workflow =>
    workflow.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    workflow.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    workflow.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return {
    workflows: filteredWorkflows,
    isLoading,
    searchTerm,
    setSearchTerm,
  };
}