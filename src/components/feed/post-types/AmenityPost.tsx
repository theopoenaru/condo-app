import { Calendar, Clock, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface AmenityPostProps {
  amenityDetails: {
    type: string;
    date: string;
    time: string;
    guests: number;
    status: 'pending' | 'confirmed';
  };
  onCancel: () => void;
  onModify: () => void;
}

export function AmenityPost({
  amenityDetails,
  onCancel,
  onModify,
}: AmenityPostProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 text-purple-600">
        <Calendar className="h-5 w-5" />
        <span className="font-medium">Amenity Booking</span>
      </div>
      <Card className="bg-purple-50 border-none">
        <CardContent className="p-4 space-y-3">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium text-gray-900">{amenityDetails.type}</h3>
              <p className="text-sm text-gray-600">Private Event</p>
            </div>
            <Badge
              variant="secondary"
              className={cn(
                amenityDetails.status === 'pending'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-green-100 text-green-800'
              )}
            >
              {amenityDetails.status === 'pending'
                ? 'Pending Approval'
                : 'Confirmed'}
            </Badge>
          </div>
          <div className="space-y-2">
            <div className="flex items-center text-gray-600">
              <Calendar className="h-4 w-4 mr-2" />
              <span>{amenityDetails.date}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Clock className="h-4 w-4 mr-2" />
              <span>{amenityDetails.time}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Users className="h-4 w-4 mr-2" />
              <span>{amenityDetails.guests} guests</span>
            </div>
          </div>
          {amenityDetails.status === 'pending' && (
            <div className="flex space-x-2">
              <Button variant="outline" className="flex-1" onClick={onCancel}>
                Cancel
              </Button>
              <Button variant="outline" className="flex-1" onClick={onModify}>
                Modify
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}