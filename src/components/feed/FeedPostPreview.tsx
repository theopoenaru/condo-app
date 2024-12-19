import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MessageSquare, Heart, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { FeedComment, type Comment } from './FeedComment';
import { CommentForm } from './CommentForm';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { FeedPostDetail } from './FeedPostDetail';

interface FeedPostPreviewProps {
  id: number;
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
  comments?: Comment[];
  className?: string;
}

export function FeedPostPreview(props: FeedPostPreviewProps) {
  const [liked, setLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showFullPost, setShowFullPost] = useState(false);
  const [comments, setComments] = useState<Comment[]>(props.comments || []);

  const visibleComments = comments.slice(0, 2);
  const hasMoreComments = comments.length > 2;

  const handleAddComment = (content: string) => {
    const newComment: Comment = {
      id: Date.now().toString(),
      author: {
        name: 'Current User',
        initials: 'CU',
        role: 'Resident',
      },
      content,
      time: 'Just now',
      likes: 0,
      replies: [],
    };
    setComments([...comments, newComment]);
  };

  const handleReply = (parentId: string, content: string) => {
    const reply: Comment = {
      id: Date.now().toString(),
      author: {
        name: 'Current User',
        initials: 'CU',
        role: 'Resident',
      },
      content,
      time: 'Just now',
      likes: 0,
    };

    setComments(addReply(comments, parentId, reply));
  };

  const addReply = (comments: Comment[], parentId: string, reply: Comment): Comment[] => {
    return comments.map(comment => {
      if (comment.id === parentId) {
        return {
          ...comment,
          replies: [...(comment.replies || []), reply],
        };
      }
      if (comment.replies) {
        return {
          ...comment,
          replies: addReply(comment.replies, parentId, reply),
        };
      }
      return comment;
    });
  };

  return (
    <>
      <Card className={cn('p-6 hover:shadow-lg transition-shadow', props.className)}>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarFallback className="gradient-bg text-white">
                  {props.author.initials}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold">{props.author.name}</h3>
                  {props.type && (
                    <span className="rounded-full gradient-bg px-2.5 py-0.5 text-xs font-medium text-white shadow-sm">
                      {props.type}
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {props.author.role} · {props.time}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-sm">{props.content}</p>
          </div>

          <div className="flex items-center space-x-4 pt-2">
            <Button
              variant="ghost"
              size="sm"
              className="space-x-2 hover:text-primary"
              onClick={() => setLiked(!liked)}
            >
              <Heart className={cn("h-4 w-4", liked && "fill-primary text-primary")} />
              <span>{(props.likes || 0) + (liked ? 1 : 0)}</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="space-x-2 hover:text-primary"
              onClick={() => setShowComments(!showComments)}
            >
              <MessageSquare className="h-4 w-4" />
              <span>{comments.length}</span>
            </Button>
          </div>

          {showComments && (
            <div className="space-y-4 pt-4 border-t">
              <CommentForm onSubmit={handleAddComment} />
              <div className="space-y-4">
                {visibleComments.map((comment) => (
                  <FeedComment
                    key={comment.id}
                    comment={comment}
                    onReply={handleReply}
                  />
                ))}
                {hasMoreComments && (
                  <Button
                    variant="ghost"
                    className="w-full justify-center text-primary"
                    onClick={() => setShowFullPost(true)}
                  >
                    <MoreHorizontal className="h-4 w-4 mr-2" />
                    See all {comments.length} comments
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </Card>

      <Dialog open={showFullPost} onOpenChange={setShowFullPost}>
        <DialogContent className="max-w-3xl h-[90vh]">
          <FeedPostDetail
            {...props}
            comments={comments}
            onAddComment={handleAddComment}
            onReply={handleReply}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}