import { Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface MarketplacePostProps {
  content: string;
  marketplaceDetails: {
    price: number;
    category: string;
    condition: string;
    negotiable: boolean;
  };
  onMessageSeller: () => void;
  onMakeOffer: () => void;
}

export function MarketplacePost({
  content,
  marketplaceDetails,
  onMessageSeller,
  onMakeOffer,
}: MarketplacePostProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 text-green-600">
        <Tag className="h-5 w-5" />
        <span className="font-medium">Marketplace Listing</span>
      </div>
      <div className="text-gray-700">
        {content}
      </div>
      <Card className="bg-gray-50 border-none">
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="text-2xl font-bold text-gray-900">
              ${marketplaceDetails.price}
            </div>
            <Badge variant="secondary">
              {marketplaceDetails.category}
            </Badge>
          </div>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center justify-between">
              <span>Condition</span>
              <span className="font-medium">{marketplaceDetails.condition}</span>
            </div>
            {marketplaceDetails.negotiable && (
              <div className="flex items-center justify-between">
                <span>Price</span>
                <span className="font-medium">Negotiable</span>
              </div>
            )}
          </div>
          <div className="mt-4 flex space-x-2">
            <Button className="flex-1" onClick={onMessageSeller}>
              Message Seller
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={onMakeOffer}
            >
              Make Offer
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}