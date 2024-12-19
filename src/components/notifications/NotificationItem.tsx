import { Notification } from '@/types/notification';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface NotificationItemProps {
  notification: Notification;
  onRead: (id: string) => void;
}

export function NotificationItem({ notification, onRead }: NotificationItemProps) {
  return (
    <Button
      variant="ghost"
      className={cn(
        "w-full flex items-start space-x-3 rounded-md p-2 text-left",
        notification.unread && "bg-accent/50"
      )}
      onClick={() => onRead(notification.id)}
    >
      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium leading-none">
            {notification.title}
          </p>
          <span className="text-xs text-muted-foreground">
            {notification.time}
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          {notification.description}
        </p>
      </div>
    </Button>
  );
}