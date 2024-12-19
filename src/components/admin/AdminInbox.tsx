import { Star } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { TaskType, type Task } from '@/types/admin';
import { IncidentTask } from './task-categories/IncidentTask';
import { ServiceTask } from './task-categories/ServiceTask';
import { VendorTask } from './task-categories/VendorTask';
import { AmenityBookingTask } from './task-categories/AmenityBookingTask';
import { ReportedPostTask } from './task-categories/ReportedPostTask';
import { TaskDetailsSheet } from './TaskDetailsSheet';
import { useToast } from '@/hooks/use-toast';

const mockTasks: Task[] = [
  {
    id: 1,
    type: TaskType.Incident,
    priority: 'high',
    status: 'pending',
    title: 'Security Breach - Unauthorized Access',
    description: 'Unidentified person attempted to access the building through emergency exit...',
    sender: {
      name: 'Security Team',
      unit: 'N/A',
      role: 'Security',
    },
    time: '10 mins ago',
    unread: true,
    flagged: true,
    assignedTo: 'Building Manager',
    dueDate: '2024-03-15',
  },
  {
    id: 2,
    type: TaskType.Service,
    priority: 'high',
    status: 'pending',
    title: 'Elevator #2 Service Request',
    description: 'Elevator making unusual noise and stopping between floors. Requires immediate inspection.',
    sender: {
      name: 'Building Operations',
      unit: 'N/A',
      role: 'Maintenance Staff',
    },
    time: '1 hour ago',
    unread: true,
    flagged: false,
    assignedTo: 'Otis Elevator Co.',
    dueDate: '2024-03-14',
  },
  {
    id: 3,
    type: TaskType.Vendor,
    priority: 'normal',
    status: 'pending',
    title: 'Annual HVAC Maintenance Contract Renewal',
    description: 'Review and approval needed for HVAC maintenance contract renewal. Updated pricing and terms attached.',
    sender: {
      name: 'ABC HVAC Services',
      unit: 'N/A',
      role: 'Vendor',
    },
    time: '2 hours ago',
    unread: false,
    flagged: false,
    dueDate: '2024-03-25',
    attachments: ['contract_2024.pdf', 'pricing_sheet.pdf'],
  },
  {
    id: 4,
    type: TaskType.Vendor,
    priority: 'normal',
    status: 'in_progress',
    title: 'Pool Maintenance Quote Review',
    description: 'Competitive quote received from Blue Wave Pool Services for monthly maintenance and chemical treatment.',
    sender: {
      name: 'Blue Wave Pools',
      unit: 'N/A',
      role: 'Vendor',
    },
    time: '3 hours ago',
    unread: false,
    flagged: false,
    dueDate: '2024-03-18',
    attachments: ['service_quote_march2024.pdf'],
  },
  {
    id: 5,
    type: TaskType.Service,
    priority: 'normal',
    status: 'pending',
    title: 'Common Area Deep Cleaning Schedule',
    description: 'Quarterly deep cleaning service scheduling for all common areas and amenity spaces.',
    sender: {
      name: 'CleanPro Services',
      unit: 'N/A',
      role: 'Vendor',
    },
    time: '4 hours ago',
    unread: true,
    flagged: false,
    dueDate: '2024-03-20',
  },
  {
    id: 6,
    type: TaskType.Incident,
    priority: 'high',
    status: 'in_progress',
    title: 'Fire Alarm System Malfunction',
    description: 'False alarm triggered in north wing. Fire department responded. System diagnostic required.',
    sender: {
      name: 'Fire Safety Team',
      unit: 'N/A',
      role: 'Security',
    },
    time: '5 hours ago',
    unread: true,
    flagged: true,
    assignedTo: 'FireTech Systems',
    dueDate: '2024-03-13',
    attachments: ['incident_report.pdf', 'fire_dept_response.pdf'],
  },
  {
    id: 7,
    type: TaskType.AmenityBooking,
    priority: 'normal',
    status: 'pending',
    title: 'Party Room Booking Request',
    description: 'Booking request for the party room.',
    sender: {
      name: 'Emily Johnson',
      unit: '1505',
      role: 'Resident',
    },
    time: '30 mins ago',
    unread: true,
    flagged: false,
    bookingDetails: {
      amenity: 'Party Room',
      date: 'March 20, 2024',
      time: '6:00 PM - 10:00 PM',
      guests: 25,
    },
  },
  {
    id: 8,
    type: TaskType.ReportedPost,
    priority: 'high',
    status: 'pending',
    title: 'Inappropriate Content in Community Discussion',
    description: 'Post contains offensive language and personal attacks.',
    sender: {
      name: 'Community Moderator',
      unit: 'N/A',
      role: 'Staff',
    },
    time: '45 mins ago',
    unread: true,
    flagged: true,
    reportDetails: {
      postId: '12345',
      reason: 'Harassment/Bullying',
      reportedBy: 'Multiple Residents',
    },
  },
];

export function AdminInbox() {
  const [tasks] = useState<Task[]>(mockTasks);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const { toast } = useToast();

  const handleApproveBooking = (taskId: number) => {
    toast({
      title: "Booking Approved",
      description: "The amenity booking has been approved and the resident has been notified.",
    });
  };

  const handleRejectBooking = (taskId: number) => {
    toast({
      title: "Booking Rejected",
      description: "The amenity booking has been rejected and the resident has been notified.",
    });
  };

  const handleRemovePost = (taskId: number) => {
    toast({
      title: "Post Removed",
      description: "The reported post has been removed and the author has been notified.",
    });
  };

  const handleDismissReport = (taskId: number) => {
    toast({
      title: "Report Dismissed",
      description: "The report has been dismissed and will be archived.",
    });
  };

  const renderTask = (task: Task) => {
    const props = {
      task,
      onClick: () => setSelectedTask(task),
    };

    switch (task.type) {
      case TaskType.Incident:
        return <IncidentTask {...props} />;
      case TaskType.Service:
        return <ServiceTask {...props} />;
      case TaskType.Vendor:
        return <VendorTask {...props} />;
      case TaskType.AmenityBooking:
        return (
          <AmenityBookingTask 
            {...props} 
            onApprove={() => handleApproveBooking(task.id)}
            onReject={() => handleRejectBooking(task.id)}
          />
        );
      case TaskType.ReportedPost:
        return (
          <ReportedPostTask 
            {...props} 
            onApprove={() => handleRemovePost(task.id)}
            onReject={() => handleDismissReport(task.id)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-2 pb-16 md:pb-0">
      {tasks.map((task) => (
        <Card
          key={task.id}
          className={cn(
            'hover:shadow-md transition-shadow cursor-pointer touch-manipulation',
            task.unread ? 'bg-card' : 'bg-muted/50'
          )}
        >
          {renderTask(task)}
        </Card>
      ))}
      <TaskDetailsSheet 
        task={selectedTask} 
        onClose={() => setSelectedTask(null)} 
      />
    </div>
  );
}