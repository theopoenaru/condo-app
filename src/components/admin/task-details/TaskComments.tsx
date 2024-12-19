import { Paperclip } from 'lucide-react';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export function TaskComments() {
  return (
    <div className="space-y-4">
      <h3 className="font-medium">Comments</h3>
      <div className="flex space-x-3">
        <Avatar>
          <AvatarFallback>PM</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <textarea 
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
            placeholder="Add a comment..."
            rows={1}
          />
          <div className="mt-2 flex items-center justify-between">
            <Button variant="outline" size="sm">
              <Paperclip className="h-4 w-4 mr-2" />
              Attach
            </Button>
            <Button size="sm">Send</Button>
          </div>
        </div>
      </div>
    </div>
  );
}