import { useState, useEffect, useCallback } from 'react';
import { Command } from 'cmdk';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Search, MessageSquare, Package, Calendar, AlertCircle, Tag } from 'lucide-react';
import { cn, highlightText } from '@/lib/utils';
import { useGlobalSearch } from '@/hooks/useGlobalSearch';

const iconComponents = {
  AlertCircle,
  MessageSquare,
  Package,
  Calendar,
  Tag,
} as const;

const sectionStyles = {
  tasks: {
    bg: 'bg-blue-100',
    text: 'text-blue-600'
  },
  announcements: {
    bg: 'bg-green-100',
    text: 'text-green-600'
  },
  marketplaces: {
    bg: 'bg-yellow-100',
    text: 'text-yellow-600'
  },
  discussions: {
    bg: 'bg-purple-100',
    text: 'text-purple-600'
  },
  packages: {
    bg: 'bg-orange-100',
    text: 'text-orange-600'
  },
  votes: {
    bg: 'bg-red-100',
    text: 'text-red-600'
  },
  amenities: {
    bg: 'bg-indigo-100',
    text: 'text-indigo-600'
  }
} as const;


export function SearchDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { 
    searchTerm,
    results,
    setSearchTerm,
    handleSelect,
  } = useGlobalSearch();
  
  const [selectedIndex, setSelectedIndex] = useState(-1);

  useEffect(() => {
    setSelectedIndex(-1);
  }, [results]);

  const handleOpenChange = (newOpen: boolean) => {
    onOpenChange(newOpen);
    if (!newOpen) {
      setTimeout(() => setSearchTerm(''), 100);
    }
  };

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, -1));
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      handleSelect(results[selectedIndex]);
    }
  }, [results, selectedIndex, handleSelect]);

  const sections = {
    tasks: 'TASKS',
    announcements: 'ANNOUNCEMENTS',
    marketplaces: 'MARKETPLACE',
    discussions: 'DISCUSSIONS',
    packages: 'PACKAGES',
    votes: 'VOTES',
    amenities: 'AMENITIES',
  };

  const groupedResults = results.reduce((acc, result) => {
    if (!acc[result.section]) {
      acc[result.section] = [];
    }
    acc[result.section].push(result);
    return acc;
  }, {} as Record<string, typeof results>);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 gap-0 max-w-2xl">
        <DialogTitle className="sr-only">Search SimpliCondo</DialogTitle>
        <Command className="rounded-lg border shadow-md overflow-hidden" onKeyDown={handleKeyDown}>
          <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <Command.Input
              value={searchTerm}
              onValueChange={setSearchTerm}
              placeholder="Search anything..."
              className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <Command.List className="max-h-[60vh] overflow-y-auto overflow-x-hidden">
            <div>
              {results.length === 0 && searchTerm && (
                <div className="py-6 text-center text-sm text-muted-foreground">
                  No results found
                </div>
              )}
              {results.length > 0 && Object.entries(groupedResults)
                    .filter(([_, sectionResults]) => sectionResults.length > 0)
                    .map(([section, sectionResults]) => (
                      <Command.Group
                        key={section}
                        heading={
                          <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                            {sections[section as keyof typeof sections]}
                          </div>
                        }
                      >
                        {sectionResults.map((result, index) => {
                          const Icon = result.icon;
                          const IconComponent = iconComponents[Icon];
                          const globalIndex = results.findIndex(r => r.id === result.id);
                          
                          return (
                            <Command.Item
                              key={result.id}
                              onSelect={() => handleSelect(result)}
                              className={cn(
                                "px-4 py-2 cursor-pointer hover:bg-accent/50",
                                globalIndex === selectedIndex && "bg-accent"
                              )}>
                              <div className="flex items-center gap-3">
                                <div className={cn(
                                  "p-1 rounded-md",
                                  sectionStyles[section as keyof typeof sectionStyles]?.bg
                                )}>
                                  <IconComponent className={cn(
                                    "h-4 w-4",
                                    sectionStyles[section as keyof typeof sectionStyles]?.text
                                  )} />
                                </div>
                                <div className="flex flex-col min-w-0">
                                  <span className="text-sm font-medium truncate">
                                    {highlightText(result.title, searchTerm)}
                                  </span>
                                  {result.subtitle && (
                                    <span className="text-xs text-muted-foreground truncate">
                                      {highlightText(result.subtitle, searchTerm)}
                                    </span>
                                  )}
                                </div>
                              </div>
                              {result.tags && result.tags.length > 0 && (
                                <div className="flex gap-1 mt-1 ml-7">
                                  {result.tags.map(tag => (
                                    <span
                                      key={tag}
                                      className="px-1.5 py-0.5 text-xs bg-accent/50 rounded-full"
                                    > 
                                      {highlightText(tag, searchTerm)}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </Command.Item>
                          );
                        })}
                      </Command.Group>
                    ))}
            </div>
         </Command.List>
        </Command>
      </DialogContent>
    </Dialog>
  );
}