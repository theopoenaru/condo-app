export enum TaskType {
  Maintenance = 'maintenance',
  Package = 'package',
  Amenity = 'amenity', 
  Complaint = 'complaint',
  Payment = 'payment',
  Incident = 'incident',
  Service = 'service',
  Vendor = 'vendor',
  AmenityBooking = 'amenity_booking',
  ReportedPost = 'reported_post'
}

export type TaskPriority = 'high' | 'normal' | 'low';

export type TaskStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled';

export interface TaskSender {
  name: string;
  unit: string;
  role?: string;
}

export interface Task {
  id: number;
  type: TaskType;
  priority: TaskPriority;
  status: TaskStatus;
  title: string;
  description: string;
  sender: TaskSender;
  time: string;
  unread: boolean;
  flagged: boolean;
  assignedTo?: string;
  dueDate?: string;
  attachments?: string[];
  bookingDetails?: {
    amenity: string;
    date: string;
    time: string;
    guests: number;
  };
  reportDetails?: {
    postId: string;
    reason: string;
    reportedBy: string;
  };
  comments?: number;
  archived?: boolean;
}