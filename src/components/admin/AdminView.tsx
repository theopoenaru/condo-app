import { AdminSidebar } from './AdminSidebar';
import { AdminToolbar } from './AdminToolbar';
import { AdminInbox } from './AdminInbox';
import { MobileHeader } from './MobileHeader';
import { MobileNav } from './MobileNav';

export function AdminView() {
  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      <div className="md:hidden">
        <MobileHeader />
      </div>
      <div className="hidden md:block">
        <AdminSidebar className="w-60 shrink-0 sticky top-0 h-screen" />
      </div>
      <div className="flex-1 p-4 md:p-6">
        <div className="max-w-5xl mx-auto space-y-4">
          <div className="flex-1 space-y-4">
            <AdminToolbar />
            <AdminInbox />
          </div>
        </div>
      </div>
      <MobileNav />
    </div>
  );
}