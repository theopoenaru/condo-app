import { Archive, ChevronDown, Filter, Search, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useInboxFilters } from '@/hooks/useInboxFilters';
import { useGlobalSearch } from '@/hooks/useGlobalSearch';

export function AdminToolbar() {
  const { unreadCount } = useInboxFilters();
  const { setOpen } = useGlobalSearch();

  return (
    <Card className="p-2 md:p-3">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex-1 md:flex-none justify-start space-x-1"
            onClick={() => setOpen(true)}
          >
            <Search className="h-4 w-4" />
            <span>Search</span>
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex-1 md:flex-none justify-start space-x-1"
          >
            <Filter className="h-4 w-4" />
            <span>Filter</span>
            <ChevronDown className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="flex-1 md:flex-none justify-start">
            <Archive className="h-4 w-4" />
            <span className="ml-2 md:hidden">Archive</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex-1 md:flex-none justify-start">
            <Star className="h-4 w-4" />
            <span className="ml-2 md:hidden">Star</span>
          </Button>
        </div>
        <div className="text-sm text-muted-foreground">
          {unreadCount} unread {unreadCount === 1 ? 'task' : 'tasks'}
        </div>
      </div>
    </Card>
  );
}