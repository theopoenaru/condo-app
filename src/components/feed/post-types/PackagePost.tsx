import { Clock, MapPin, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface PackagePostProps {
  packageDetails: {
    unit: string;
    carrier: string;
    deliveryTime: string;
    location: string;
  };
  onMarkAsPickedUp: () => void;
}

export function PackagePost({ packageDetails, onMarkAsPickedUp }: PackagePostProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 text-blue-600">
        <Package className="h-5 w-5" />
        <span className="font-medium">Package Delivery</span>
      </div>
      <Card className="bg-blue-50 border-none">
        <CardContent className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Unit {packageDetails.unit}</span>
            <Badge variant="secondary" className="bg-blue-100">
              {packageDetails.carrier}
            </Badge>
          </div>
          <div className="space-y-2">
            <div className="flex items-center text-gray-600">
              <Clock className="h-4 w-4 mr-2" />
              <span>Delivered at {packageDetails.deliveryTime}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <MapPin className="h-4 w-4 mr-2" />
              <span>{packageDetails.location}</span>
            </div>
          </div>
          <Button className="w-full" onClick={onMarkAsPickedUp}>
            Mark as Picked Up
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}