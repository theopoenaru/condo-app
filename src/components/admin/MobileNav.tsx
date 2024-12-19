import { 
  AlertCircle,
  Archive, 
  Bell, 
  FileText,
  Home, 
  Inbox, 
  Settings,
  Truck 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link, useLocation } from 'react-router-dom';

const items = [
  { icon: AlertCircle, label: 'Incidents', href: '/inbox?type=incident' },
  { icon: FileText, label: 'Services', href: '/inbox?type=service' },
  { icon: Truck, label: 'Vendors', href: '/inbox?type=vendor' },
  { icon: Bell, label: 'Notifications', href: '/notifications' },
  { icon: Settings, label: 'Settings', href: '/settings' }
];

export function MobileNav() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const type = searchParams.get('type');

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 border-t bg-background z-40">
      <nav className="flex items-center">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href.split('?')[0] && 
            (!type || item.href.includes(type));
          
          return (
            <Link
              key={item.href}
              to={item.href}
              className="flex-1"
            >
              <Button
                variant="ghost"
                className={cn(
                  'w-full flex flex-col items-center py-2 gap-1 rounded-none h-auto',
                  isActive && 'text-primary'
                )}
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs">{item.label}</span>
              </Button>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}