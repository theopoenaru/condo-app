import { NavLink } from 'react-router-dom';
import { navigationItems } from '../../App';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export default function Sidebar() {
  return (
    <div className="hidden md:flex h-full w-64 flex-col border-r bg-card">
      <div className="flex h-14 items-center border-b px-6">
        <span className="text-lg font-semibold">Navigation</span>
      </div>
      <div className="flex-1 overflow-auto py-4">
        <nav className="grid gap-1 px-2">
          {navigationItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
                  'hover:bg-accent hover:text-accent-foreground',
                  isActive 
                    ? 'bg-accent/50 text-accent-foreground font-medium' 
                    : 'text-muted-foreground'
                )
              }
            >
              <item.icon className="h-4 w-4" />
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>
      <div className="border-t p-4">
        <Button variant="outline" className="w-full justify-start gap-2">
          <span className="h-2 w-2 rounded-full bg-green-500" />
          Status: Online
        </Button>
      </div>
    </div>
  );
}