import { AlertCircle, Megaphone } from 'lucide-react';

interface AnnouncementPostProps {
  content: string;
  priority?: 'high' | 'normal';
}

export function AnnouncementPost({ content, priority }: AnnouncementPostProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 text-amber-600">
        <Megaphone className="h-5 w-5" />
        <span className="font-medium">Building Announcement</span>
      </div>
      <div className="text-gray-700 whitespace-pre-line">
        {content}
      </div>
      {priority === 'high' && (
        <div className="flex items-center space-x-2 p-3 bg-red-50 text-red-700 rounded-lg">
          <AlertCircle className="h-5 w-5" />
          <span className="text-sm font-medium">Important: Please read and acknowledge</span>
        </div>
      )}
    </div>
  );
}