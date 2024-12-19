import { useState } from 'react';
import { Group } from '@/types/management';

const mockGroups: Group[] = [
  {
    id: '1',
    name: 'Board Members',
    type: 'governance',
    members: [
      { id: '1', name: 'John Smith', role: 'President' },
      { id: '2', name: 'Sarah Chen', role: 'Treasurer' },
    ],
    status: 'active',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '2',
    name: 'Social Committee',
    type: 'committee',
    members: [
      { id: '3', name: 'Mike Wilson', role: 'Chair' },
      { id: '4', name: 'Emily Johnson', role: 'Member' },
      { id: '5', name: 'David Lee', role: 'Member' },
    ],
    status: 'active',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
];

export function useGroups() {
  const [groups] = useState<Group[]>(mockGroups);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading] = useState(false);

  const filteredGroups = groups.filter(group =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return {
    groups: filteredGroups,
    isLoading,
    searchTerm,
    setSearchTerm,
  };
}