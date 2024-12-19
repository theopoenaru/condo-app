import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface FeedFiltersProps {
  selectedType: string | null;
  onSelectType: (type: string | null) => void;
}

const postTypes = [
  { label: 'All', value: null },
  { label: 'Announcements', value: 'announcement' },
  { label: 'Marketplace', value: 'marketplace' },
  { label: 'Discussions', value: 'discussion' },
  { label: 'Packages', value: 'package' },
  { label: 'Votes', value: 'vote' },
];

export function FeedFilters({ selectedType, onSelectType }: FeedFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {postTypes.map((type) => (
        <Button
          key={type.label}
          variant="outline"
          size="sm"
          onClick={() => onSelectType(type.value)}
          className={cn(
            'rounded-full',
            selectedType === type.value && 'bg-primary text-primary-foreground'
          )}
        >
          {type.label}
        </Button>
      ))}
    </div>
  );
}