import { useState } from 'react';
import { IncidentReport } from '@/types/management';

const mockReports: IncidentReport[] = [
  {
    id: '1',
    reportNumber: 'IR2024001',
    type: 'security',
    location: 'Main Entrance',
    reportedBy: 'John Wilson',
    reportedAt: new Date('2024-03-10T08:30:00'),
    severity: 'high',
    status: 'open',
    description: 'Unauthorized access attempt at main entrance',
  },
  {
    id: '2',
    reportNumber: 'IR2024002',
    type: 'maintenance',
    location: 'Level 2 Hallway',
    reportedBy: 'Sarah Chen',
    reportedAt: new Date('2024-03-10T09:15:00'),
    severity: 'medium',
    status: 'in_progress',
    description: 'Water leak from ceiling',
  },
  {
    id: '3',
    reportNumber: 'IR2024003',
    type: 'noise',
    location: 'Unit 1505',
    reportedBy: 'Mike Brown',
    reportedAt: new Date('2024-03-10T22:00:00'),
    severity: 'low',
    status: 'closed',
    description: 'Loud music complaint',
  },
  {
    id: '4',
    reportNumber: 'IR2024004',
    type: 'facility',
    location: 'Pool Area',
    reportedBy: 'Lisa Martinez',
    reportedAt: new Date('2024-03-10T11:30:00'),
    severity: 'medium',
    status: 'open',
    description: 'Pool equipment malfunction',
  },
];

export function useIncidentReports() {
  const [reports] = useState<IncidentReport[]>(mockReports);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading] = useState(false);

  const filteredReports = reports.filter(report =>
    report.reportNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.reportedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return {
    reports: filteredReports,
    isLoading,
    searchTerm,
    setSearchTerm,
  };
}