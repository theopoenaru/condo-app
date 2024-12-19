import { Calendar, Users, Check, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Task } from '@/types/admin';
import { cn } from '@/lib/utils';

interface AmenityBookingTaskProps {
  task: Task;
  onClick: () => void;
  onApprove: () => void;
  onReject: () => void;
}

export function AmenityBookingTask({ task, onClick, onApprove, onReject }: AmenityBookingTaskProps) {
  const handleApprove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onApprove();
  };

  const handleReject = (e: React.MouseEvent) => {
    e.stopPropagation();
    onReject();
  };

  return (
    <div 
      onClick={onClick}
      className="p-4 hover:bg-accent/50 rounded-lg cursor-pointer"
    >
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <Calendar className="h-5 w-5 text-green-500" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className={cn(
                'font-medium',
                task.unread ? 'text-foreground' : 'text-muted-foreground'
              )}>
                {task.sender.name}
              </span>
              <Badge variant="outline">
                {task.bookingDetails?.amenity}
              </Badge>
            </div>
            <div className="flex items-center space-x-2">
              <Button 
                size="sm" 
                variant="ghost" 
                className="text-green-600 hover:text-green-700 hover:bg-green-50"
                onClick={handleApprove}
              >
                <Check className="h-4 w-4 mr-1" />
                Approve
              </Button>
              <Button 
                size="sm" 
                variant="ghost" 
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={handleReject}
              >
                <X className="h-4 w-4 mr-1" />
                Reject
              </Button>
              <span className="text-sm text-muted-foreground">{task.time}</span>
            </div>
          </div>
          <h3 className="mt-1 font-medium">{task.title}</h3>
          <div className="mt-2 flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>{task.bookingDetails?.date} at {task.bookingDetails?.time}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="h-4 w-4" />
              <span>{task.bookingDetails?.guests} guests</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}