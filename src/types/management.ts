export type AmenityStatus = 'available' | 'maintenance' | 'reserved';

export interface Amenity {
  id: string;
  name: string;
  location: string;
  capacity: number;
  description?: string;
  status: AmenityStatus;
  rules?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Unit {
  id: string;
  number: string;
  type: string;
  floor: number;
  sqft: number;
  bedrooms: number;
  bathrooms: number;
  status: 'available' | 'occupied' | 'maintenance';
  features: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Resident {
  id: string;
  name: string;
  email: string;
  phone: string;
  unit: string;
  moveInDate: Date;
  leaseEnd: Date;
  status: 'active' | 'pending' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
}

export interface Vendor {
  id: string;
  name: string;
  category: string;
  description?: string;
  contactName: string;
  email: string;
  phone: string;
  address: string;
  taxId?: string;
  insurance?: string;
  status: 'active' | 'pending' | 'inactive';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Job {
  id: string;
  jobNumber: string;
  title: string;
  description: string;
  vendor: string;
  category: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  location: string;
  dueDate: Date;
  budget?: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PurchaseOrder {
  id: string;
  poNumber: string;
  vendor: string;
  jobNumber: string;
  description: string;
  amount: number;
  status: 'draft' | 'pending' | 'approved' | 'rejected';
  dueDate: Date;
  terms?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Quote {
  id: string;
  quoteNumber: string;
  vendor: string;
  jobNumber: string;
  description: string;
  amount: number;
  status: 'draft' | 'pending' | 'approved' | 'rejected';
  validUntil: Date;
  terms?: string;
  notes?: string;
  attachments?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  vendor: string;
  jobNumber: string;
  poNumber?: string;
  description: string;
  amount: number;
  status: 'pending' | 'paid' | 'overdue' | 'cancelled';
  dueDate: Date;
  paymentDate?: Date;
  paymentMethod?: string;
  notes?: string;
  attachments?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Document {
  id: string;
  title: string;
  description?: string;
  category: string;
  type: string;
  size: number;
  url: string;
  permissions: string[];
  version: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface WorkflowStep {
  name: string;
  type: 'approval' | 'notification' | 'task' | 'automation';
  assignee: string;
  duration: string;
}

export interface Workflow {
  id: string;
  name: string;
  description?: string;
  category: string;
  sla: number;
  status: 'active' | 'draft' | 'disabled';
  steps: WorkflowStep[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Approver {
  role: string;
  order: string;
  backup?: string;
}

export interface ApprovalRule {
  id: string;
  name: string;
  description?: string;
  type: string;
  threshold?: number;
  status: 'active' | 'draft' | 'disabled';
  approvers: Approver[];
  createdAt: Date;
  updatedAt: Date;
}

// Building Management Types
export interface GroupMember {
  id: string;
  name: string;
  role: string;
}

export interface Group {
  id: string;
  name: string;
  type: string;
  members: GroupMember[];
  status: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
}

export interface ParkingSpot {
  id: string;
  number: string;
  type: 'resident' | 'visitor' | 'accessible';
  location: string;
  assignedTo?: string;
  status: 'available' | 'occupied' | 'maintenance';
  createdAt: Date;
  updatedAt: Date;
}

export interface Locker {
  id: string;
  number: string;
  size: 'small' | 'medium' | 'large';
  location: string;
  assignedTo?: string;
  status: 'available' | 'occupied' | 'maintenance';
  createdAt: Date;
  updatedAt: Date;
}

// Logs Types
export interface SecurityLog {
  id: string;
  timestamp: Date;
  type: 'access' | 'alarm' | 'patrol' | 'incident';
  location: string;
  description: string;
  officer: string;
  severity: 'high' | 'medium' | 'low';
}

export interface VisitorLog {
  id: string;
  checkIn: Date;
  checkOut?: Date;
  visitorName: string;
  hostUnit: string;
  purpose: 'guest' | 'contractor' | 'delivery';
  status: 'checked_in' | 'checked_out';
}

export interface Package {
  id: string;
  trackingNumber: string;
  carrier: string;
  recipientUnit: string;
  deliveryDate: Date;
  pickupDate?: Date;
  status: 'delivered' | 'picked_up';
}

export interface VisitorParking {
  id: string;
  permitNumber: string;
  licensePlate: string;
  hostUnit: string;
  startDate: Date;
  endDate: Date;
  status: 'active' | 'expired' | 'pending';
}

export interface IncidentReport {
  id: string;
  reportNumber: string;
  type: string;
  location: string;
  reportedBy: string;
  reportedAt: Date;
  severity: 'high' | 'medium' | 'low';
  status: 'open' | 'in_progress' | 'closed';
  description: string;
}

// Amenity Types
export interface Reservation {
  id: string;
  reservationNumber: string;
  amenity: string;
  residentUnit: string;
  startTime: Date;
  endTime: Date;
  guests: number;
  status: 'confirmed' | 'pending' | 'cancelled';
}

export interface AmenityBookingDuration {
  reservationPeriodType: 'hours' | 'days';
  minimumReservation: string;
  maximumReservation: string;
  bookingTimeOptions: '15' | '30' | '60';
}

export interface AmenityBookingLimits {
  simultaneousLimit: string;
  accessLevel: 'all' | 'residents' | 'owners';
  minAdvanceBooking: number;
  advanceBookingDuration: 'days' | 'months';
  advanceBookingLimit: number;
  dailyLimit: string;
  weeklyLimit: string;
  monthlyLimit: string;
  consecutiveBookings: string;
}

export interface AmenityBilling {
  requirePayment: 'yes' | 'no';
  damageDeposit: {
    required: 'yes' | 'no';
    amount?: string;
  };
  cleaningFee: {
    required: 'yes' | 'no';
    amount?: string;
  };
  cancellationPenalty: {
    enabled: 'yes' | 'no';
    amount?: string;
  };
  cancellationPolicy: {
    time: number;
    unit: 'minutes' | 'hours' | 'days';
  };
}

export interface AmenitySecurity {
  securityRequired: 'yes' | 'no';
  alcoholSecurityRequired: 'yes' | 'no';
  autoCalculateHours: 'yes' | 'no';
  chargeResidents: 'yes' | 'no';
}

export interface AmenityHours {
  operatingHours: {
    [key in 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday']: {
      enabled: boolean;
      start: string;
      end: string;
    };
  };
  holidayHours: {
    useSpecialHours: boolean;
    start: string;
    end: string;
  };
}