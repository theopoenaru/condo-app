import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { AdminSidebar } from './AdminSidebar';

export function MobileHeader() {
  return (
    <div className="h-14 border-b bg-card px-4 flex items-center justify-between sticky top-0 z-40">
      <h1 className="text-lg font-semibold gradient-text">SimpliCondo</h1>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-72">
          <AdminSidebar className="h-full" />
        </SheetContent>
      </Sheet>
    </div>
  );
}