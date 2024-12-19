import { useState, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Building2,
  Users,
  UserSquare2,
  Car,
  Lock,
  CalendarDays,
  ClipboardList,
  Shield,
  UserCheck,
  Package,
  CarFront,
  AlertTriangle,
  Truck,
  Wrench,
  FileText,
  Receipt,
  ScrollText,
  GitFork,
  CheckSquare,
  Files,
} from 'lucide-react';
import { AmenitiesManager } from '@/components/admin/management/AmenitiesManager';
import { UnitsManager } from '@/components/admin/management/UnitsManager';
import { ResidentsManager } from '@/components/admin/management/ResidentsManager';
import { GroupsManager } from '@/components/admin/management/GroupsManager';
import { ParkingManager } from '@/components/admin/management/ParkingManager';
import { LockersManager } from '@/components/admin/management/LockersManager';
import { ReservationsManager } from '@/components/admin/management/ReservationsManager';
import { SecurityLogsManager } from '@/components/admin/management/SecurityLogsManager';
import { VisitorLogsManager } from '@/components/admin/management/VisitorLogsManager';
import { PackagesManager } from '@/components/admin/management/PackagesManager';
import { VisitorParkingManager } from '@/components/admin/management/VisitorParkingManager';
import { IncidentReportsManager } from '@/components/admin/management/IncidentReportsManager';
import { DocumentsManager } from '@/components/admin/management/DocumentsManager';
import { WorkflowManager } from '@/components/admin/management/WorkflowManager';
import { ApprovalManager } from '@/components/admin/management/ApprovalManager';
import { VendorsManager } from '@/components/admin/management/VendorsManager';
import { JobsManager } from '@/components/admin/management/JobsManager';
import { PurchaseOrdersManager } from '@/components/admin/management/PurchaseOrdersManager';
import { QuotesManager } from '@/components/admin/management/QuotesManager';
import { InvoicesManager } from '@/components/admin/management/InvoicesManager';

interface Section {
  id: string;
  label: string;
  icon: React.ElementType;
  subsections?: { id: string; label: string; component: React.ReactNode }[];
  component?: React.ReactNode;
};

export default function AdminPage() {
  const [activeSection, setActiveSection] = useState('property');
  const [activeSubsection, setActiveSubsection] = useState('units');

  const sections: Section[] = useMemo(() => [
    {
      id: 'property',
      label: 'Building',
      icon: Building2,
      subsections: [
        { id: 'units', label: 'Units', component: <UnitsManager /> },
        { id: 'residents', label: 'Residents', component: <ResidentsManager /> },
        { id: 'groups', label: 'Groups', component: <GroupsManager /> },
        { id: 'parking', label: 'Parking', component: <ParkingManager /> },
        { id: 'lockers', label: 'Lockers', component: <LockersManager /> },
      ],
    },
    {
      id: 'amenities',
      label: 'Amenities',
      icon: CalendarDays,
      subsections: [
        { id: 'amenities', label: 'Amenities', component: <AmenitiesManager /> },
        { id: 'reservations', label: 'Reservations', component: <ReservationsManager /> },
      ],
    },
    {
      id: 'logs',
      label: 'Logs',
      icon: ClipboardList,
      subsections: [
        { id: 'security-logs', label: 'Security Logs', component: <SecurityLogsManager /> },
        { id: 'visitor-logs', label: 'Visitor Logs', component: <VisitorLogsManager /> },
        { id: 'packages-logs', label: 'Packages', component: <PackagesManager /> },
        { id: 'visitor-parking-logs', label: 'Visitor Parking', component: <VisitorParkingManager /> },
        { id: 'incident-reports', label: 'Incident Reports', component: <IncidentReportsManager /> },
      ],
    },
    {
      id: 'vendors',
      label: 'Vendors',
      icon: Truck,
      subsections: [
        { id: 'vendors', label: 'Vendors', component: <VendorsManager /> },
        { id: 'jobs', label: 'Jobs', component: <JobsManager /> },
        { id: 'purchase-orders', label: 'Purchase Orders', component: <PurchaseOrdersManager /> },
        { id: 'quotes', label: 'Quotes', component: <QuotesManager /> },
        { id: 'invoices', label: 'Invoices', component: <InvoicesManager /> },
      ],
    },
    {
      id: 'tasks',
      label: 'Tasks',
      icon: GitFork,
      subsections: [
        { id: 'workflows', label: 'Workflows', component: <WorkflowManager /> },
        { id: 'approvals', label: 'Approvals', component: <ApprovalManager /> },
      ],
    },
    {
      id: 'documents',
      label: 'Documents',
      icon: FileText,
      component: <DocumentsManager />,
    },
  ], []);

  const currentSection = sections.find(s => s.id === activeSection);
  const currentComponent = currentSection?.subsections
    ? currentSection.subsections.find(s => s.id === activeSubsection)?.component
    : currentSection?.component;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Property Management</h1>
        <p className="text-muted-foreground">
          Manage your property settings, amenities, units, and residents.
        </p>
      </div>
      
      <div className="flex gap-6">
        {/* Vertical Navigation */}
        <div className="w-64 space-y-4">
          {sections.map((section) => (
            <div key={section.id} className="space-y-2">
              <Button
                variant={activeSection === section.id ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start space-x-2",
                  activeSection === section.id && "font-medium"
                )}
                onClick={() => {
                  setActiveSection(section.id);
                  if (section.subsections) {
                    setActiveSubsection(section.subsections[0].id);
                  }
                }}
              >
                <section.icon className="h-4 w-4" />
                {section.label}
              </Button>
              
              {section.subsections && activeSection === section.id && (
                <div className="ml-4 space-y-1">
                  {section.subsections.map((subsection) => (
                    <Button
                      key={subsection.id}
                      variant={activeSubsection === subsection.id ? "secondary" : "ghost"}
                      className={cn(
                        "w-full justify-start text-sm",
                        activeSubsection === subsection.id && "font-medium"
                      )}
                      onClick={() => setActiveSubsection(subsection.id)}
                    >
                      {subsection.label}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1">
          {currentComponent}
        </div>
      </div>
    </div>
  );
}