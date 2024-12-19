import { Bell } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export function AdminHeader() {
  return (
    <header className="border-b bg-card">
      <div className="container mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <h1 className="text-xl font-semibold gradient-text">
              SimpliCondo Admin
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-muted-foreground hover:text-foreground">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full" />
            </button>
            <Avatar>
              <AvatarFallback className="gradient-bg text-white">PM</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  );
}