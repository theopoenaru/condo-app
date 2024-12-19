import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { MessageSquare, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { FeedComment, type Comment } from './FeedComment';
import { CommentForm } from './CommentForm';
import { ScrollArea } from '@/components/ui/scroll-area';

interface FeedPostDetailProps {
  author: {
    name: string;
    role: string;
    initials: string;
  };
  time: string;
  content: string;
  type?: 'announcement' | 'package' | 'marketplace' | 'amenity' | 'vote';
  metadata?: Record<string, any>;
  likes?: number;
  comments: Comment[];
  onAddComment: (content: string) => void;
  onReply: (parentId: string, content: string) => void;
}

export function FeedPostDetail({
  author,
  time,
  content,
  type,
  likes = 0,
  comments,
  onAddComment,
  onReply,
}: FeedPostDetailProps) {
  const [liked, setLiked] = useState(false);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center space-x-4 p-4">
        <Avatar>
          <AvatarFallback className="gradient-bg text-white">
            {author.initials}
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="font-semibold">{author.name}</h3>
            {type && (
              <span className="rounded-full gradient-bg px-2.5 py-0.5 text-xs font-medium text-white shadow-sm">
                {type}
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground">
            {author.role} · {time}
          </p>
        </div>
      </div>

      <div className="p-4 border-y">
        <p className="text-sm">{content}</p>
      </div>

      <div className="flex items-center space-x-4 p-4">
        <Button
          variant="ghost"
          size="sm"
          className="space-x-2 hover:text-primary"
          onClick={() => setLiked(!liked)}
        >
          <Heart className={cn("h-4 w-4", liked && "fill-primary text-primary")} />
          <span>{likes + (liked ? 1 : 0)}</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="space-x-2 hover:text-primary"
        >
          <MessageSquare className="h-4 w-4" />
          <span>{comments.length}</span>
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="space-y-4 p-4">
          {comments.map((comment) => (
            <FeedComment
              key={comment.id}
              comment={comment}
              onReply={onReply}
            />
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t">
        <CommentForm onSubmit={onAddComment} />
      </div>
    </div>
  );
}