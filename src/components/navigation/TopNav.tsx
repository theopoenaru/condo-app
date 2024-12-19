import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import UserNav from './UserNav';
import NotificationsPopover from './NotificationsPopover';
import { Link, NavLink } from 'react-router-dom';
import { navigationItems } from '../../App';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { SearchDialog } from '../search/SearchDialog';

export default function TopNav() {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <div className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto">
        <div className="flex h-16 items-center">
          <Link to="/" className="flex items-center gap-2 mr-8">
            <div className="h-8 w-8 rounded-xl gradient-bg flex items-center justify-center shadow-lg">
              <span className="text-white font-bold">SC</span>
            </div>
            <span className="font-semibold hidden md:inline-block gradient-text text-lg">
              SimpleCondo
            </span>
          </Link>

          <nav className="flex items-center space-x-1">
            {navigationItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    'inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                    isActive ? 'bg-primary text-primary-foreground shadow-md' : 'text-muted-foreground'
                  )
                }
              >
                <item.icon className="h-4 w-4 mr-2" />
                {item.name}
              </NavLink>
            ))}
          </nav>
          
          <div className="ml-auto flex items-center space-x-4">
            <div className="relative hidden md:block">
              <Button
                variant="outline"
                className="w-[300px] justify-start text-muted-foreground"
                onClick={() => setShowSearch(true)}
              >
                <Search className="mr-2 h-4 w-4" />
                Search anything...
              </Button>
            </div>
            <NotificationsPopover />
            <UserNav />
          </div>
        </div>
      </div>
      <SearchDialog open={showSearch} onOpenChange={setShowSearch} />
    </div>
  );
}