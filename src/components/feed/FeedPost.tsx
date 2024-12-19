import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MessageSquare, Heart, BadgeCheck, Tag as TagIcon, Flag, Archive, MoreVertical } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { FeedComment, type Comment } from './FeedComment';
import { CommentForm } from './CommentForm';
import { AnnouncementPost } from './post-types/AnnouncementPost';
import { PackagePost } from './post-types/PackagePost';
import { MarketplacePost } from './post-types/MarketplacePost';
import { VotePost } from './post-types/VotePost';
import { AmenityPost } from './post-types/AmenityPost';

interface FeedPostProps {
  id: number;
  author: {
    name: string;
    role: string;
    initials: string;
    verified?: boolean;
  };
  time: string;
  content: string;
  type?: 'announcement' | 'package' | 'marketplace' | 'amenity' | 'vote';
  metadata?: Record<string, any>;
  likes?: number;
  images?: string[];
  tags?: string[];
  archived?: boolean;
  comments?: Comment[];
  className?: string;
  onArchive?: () => void;
  onReport?: () => void;
}

export function FeedPost({
  author,
  time,
  content,
  type,
  metadata,
  likes = 0,
  comments: initialComments = [],
  archived,
  onArchive,
  onReport,
  className,
}: FeedPostProps) {
  const [liked, setLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<Comment[]>(initialComments);

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

  const renderPostContent = () => {
    switch (type) {
      case 'announcement':
        return (
          <AnnouncementPost
            content={content}
            priority={metadata?.priority}
          />
        );
      case 'package':
        return (
          <PackagePost
            packageDetails={metadata}
            onMarkAsPickedUp={() => {}}
          />
        );
      case 'marketplace':
        return (
          <MarketplacePost
            content={content}
            marketplaceDetails={metadata}
            onMessageSeller={() => {}}
            onMakeOffer={() => {}}
          />
        );
      case 'vote':
        return (
          <VotePost
            content={content}
            voteDetails={metadata}
            onVote={() => {}}
          />
        );
      case 'amenity':
        return (
          <AmenityPost
            amenityDetails={metadata}
            onCancel={() => {}}
            onModify={() => {}}
          />
        );
      default:
        return (
          <div className="text-gray-700 whitespace-pre-line">
            {content}
          </div>
        );
    }
  };

  const renderImages = () => {
    const images = metadata?.images;
    if (!images?.length) return null;

    return (
      <div className={cn(
        "grid gap-2 mt-4",
        images.length > 1 ? "grid-cols-2" : "grid-cols-1"
      )}>
        {images.map((image, index) => (
          <div
            key={index}
            className="relative aspect-video rounded-lg overflow-hidden bg-muted"
          >
            <img
              src={image}
              alt={`Post image ${index + 1}`}
              className="object-cover w-full h-full"
            />
          </div>
        ))}
      </div>
    );
  };

  const renderTags = () => {
    const tags = metadata?.tags;
    if (!tags?.length) return null;

    return (
      <div className="flex flex-wrap gap-2 mt-4">
        {tags.map((tag) => (
          <div
            key={tag}
            className="flex items-center gap-1 text-xs bg-accent px-2 py-1 rounded-full"
          >
            <TagIcon className="h-3 w-3" />
            <span>{tag}</span>
          </div>
        ))}
      </div>
    );
  };

  const showReactions = !['package', 'vote', 'amenity'].includes(type || '');

  return (
    <Card className={cn('p-6 hover:shadow-lg transition-shadow', className)}>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarFallback className="gradient-bg text-white">
                {author.initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-semibold">{author.name}</h3>
                {author.verified && (
                  <BadgeCheck className="h-4 w-4 text-blue-500" />
                )}
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onReport}>
                <Flag className="mr-2 h-4 w-4" />
                Report
              </DropdownMenuItem>
              {onArchive && (
                <DropdownMenuItem onClick={onArchive}>
                  <Archive className="mr-2 h-4 w-4" />
                  {archived ? 'Unarchive' : 'Archive'}
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {archived && (
          <div className="bg-muted/50 px-3 py-2 rounded-md text-sm text-muted-foreground mt-2">
            This post has been archived
          </div>
        )}

        {renderPostContent()}
        {renderImages()}
        {renderTags()}

        {showReactions && (
          <div className="flex items-center space-x-4 pt-2">
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
              onClick={() => setShowComments(!showComments)}
            >
              <MessageSquare className="h-4 w-4" />
              <span>{comments.length}</span>
            </Button>
          </div>
        )}

        {showReactions && showComments && (
          <div className="space-y-4 pt-4 border-t">
            <CommentForm onSubmit={handleAddComment} />
            <div className="space-y-4">
              {comments.map((comment) => (
                <FeedComment
                  key={comment.id}
                  comment={comment}
                  onReply={handleReply}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}