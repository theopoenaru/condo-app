import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Heart, Reply } from 'lucide-react';
import { useState } from 'react';
import { CommentForm } from './CommentForm';
import { cn } from '@/lib/utils';

export interface Comment {
  id: string;
  author: {
    name: string;
    initials: string;
    role?: string;
  };
  content: string;
  time: string;
  likes: number;
  replies?: Comment[];
}

interface FeedCommentProps {
  comment: Comment;
  level?: number;
  onReply: (parentId: string, content: string) => void;
}

export function FeedComment({ comment, level = 0, onReply }: FeedCommentProps) {
  const [isReplying, setIsReplying] = useState(false);
  const [liked, setLiked] = useState(false);

  const handleReply = (content: string) => {
    onReply(comment.id, content);
    setIsReplying(false);
  };

  return (
    <div className={cn("space-y-3", level > 0 && "ml-8 pt-3")}>
      <div className="flex gap-3">
        <Avatar className="h-8 w-8">
          <AvatarFallback className="gradient-bg text-white text-xs">
            {comment.author.initials}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-medium text-sm">{comment.author.name}</span>
              {comment.author.role && (
                <span className="text-xs text-muted-foreground ml-2">
                  {comment.author.role}
                </span>
              )}
              <span className="text-xs text-muted-foreground ml-2">
                {comment.time}
              </span>
            </div>
          </div>
          <p className="text-sm">{comment.content}</p>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              className="h-auto p-0 text-muted-foreground hover:text-primary"
              onClick={() => setLiked(!liked)}
            >
              <Heart
                className={cn("h-4 w-4 mr-1", liked && "fill-primary text-primary")}
              />
              <span className="text-xs">{comment.likes + (liked ? 1 : 0)}</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-auto p-0 text-muted-foreground hover:text-primary"
              onClick={() => setIsReplying(!isReplying)}
            >
              <Reply className="h-4 w-4 mr-1" />
              <span className="text-xs">Reply</span>
            </Button>
          </div>
          {isReplying && (
            <div className="mt-3">
              <CommentForm
                onSubmit={handleReply}
                onCancel={() => setIsReplying(false)}
                placeholder="Write a reply..."
              />
            </div>
          )}
        </div>
      </div>
      {comment.replies?.map((reply) => (
        <FeedComment
          key={reply.id}
          comment={reply}
          level={level + 1}
          onReply={onReply}
        />
      ))}
    </div>
  );
}