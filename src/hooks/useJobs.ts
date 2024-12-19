import { useState } from 'react';
import { Job } from '@/types/management';

const mockJobs: Job[] = [
  {
    id: '1',
    jobNumber: 'JOB-2024-001',
    title: 'HVAC System Maintenance',
    description: 'Quarterly maintenance and inspection of building HVAC systems',
    vendor: 'ABC Maintenance',
    category: 'maintenance',
    priority: 'medium',
    status: 'in_progress',
    location: 'All Floors',
    dueDate: new Date('2024-03-30'),
    budget: 2500,
    notes: 'Include filter replacement and duct cleaning',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    jobNumber: 'JOB-2024-002',
    title: 'Emergency Plumbing Repair',
    description: 'Fix water leak in basement mechanical room',
    vendor: 'ABC Maintenance',
    category: 'emergency',
    priority: 'high',
    status: 'completed',
    location: 'Basement',
    dueDate: new Date('2024-03-15'),
    budget: 1500,
    notes: 'After-hours emergency repair required',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    jobNumber: 'JOB-2024-003',
    title: 'Landscape Spring Cleanup',
    description: 'Spring cleanup of property grounds including pruning and mulching',
    vendor: 'GreenScape',
    category: 'maintenance',
    priority: 'low',
    status: 'pending',
    location: 'Exterior',
    dueDate: new Date('2024-04-15'),
    budget: 3500,
    notes: 'Include replacement of damaged plants',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export function useJobs() {
  const [jobs] = useState<Job[]>(mockJobs);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading] = useState(false);

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.jobNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return {
    jobs: filteredJobs,
    isLoading,
    searchTerm,
    setSearchTerm,
  };
}