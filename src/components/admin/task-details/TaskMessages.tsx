import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Paperclip, MoreVertical } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { addMessage, deleteMessage } from '@/store/slices/messagesSlice';
import type { Message } from '@/types/messages';

interface TaskMessagesProps {
  taskId: number;
  messages?: Message[];
}

export function TaskMessages({ taskId, messages = [] }: TaskMessagesProps) {
  const [newMessage, setNewMessage] = useState('');
  const dispatch = useDispatch();

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: {
        name: 'Property Manager',
        role: 'Admin',
        initials: 'PM',
      },
      timestamp: new Date().toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
    };

    dispatch(addMessage({ taskId, message }));
    setNewMessage('');
  };

  const handleDeleteMessage = (messageId: string) => {
    dispatch(deleteMessage({ taskId, messageId }));
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {messages.map((message) => (
          <div key={message.id} className="flex gap-4">
            <Avatar className="h-8 w-8 flex-shrink-0">
              <AvatarFallback className="bg-primary/10 text-primary">
                {message.sender.initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-medium">{message.sender.name}</span>
                  <span className="text-muted-foreground text-sm ml-2">
                    {message.sender.role}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    {message.timestamp}
                  </span>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem 
                        className="text-destructive"
                        onClick={() => handleDeleteMessage(message.id)}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <p className="text-sm">{message.content}</p>
              {message.attachments && message.attachments.length > 0 && (
                <div className="flex gap-2">
                  {message.attachments.map((attachment) => (
                    <Button
                      key={attachment}
                      variant="outline"
                      size="sm"
                      className="h-8"
                    >
                      <Paperclip className="h-4 w-4 mr-2" />
                      {attachment}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-4 pt-4 border-t">
        <Avatar className="h-8 w-8 flex-shrink-0">
          <AvatarFallback>PM</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-4">
          <Textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="min-h-[100px]"
          />
          <div className="flex justify-between items-center">
            <Button variant="outline" size="sm">
              <Paperclip className="h-4 w-4 mr-2" />
              Attach Files
            </Button>
            <Button 
              size="sm"
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
            >
              Send Message
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}