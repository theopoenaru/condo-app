import { useState } from 'react';
import { FeedPost } from '@/components/feed/FeedPost';
import { Button } from '@/components/ui/button';
import { FeedFilters } from '@/components/feed/FeedFilters';
import { CreatePostDialog } from '@/components/feed/CreatePostDialog';
import { Plus } from 'lucide-react';
import { mockFeedData, type Post } from '@/data/mockFeedData';
import { useToast } from '@/hooks/use-toast';

interface PostFormData {
  type: string;
  content: string;
  title?: string;
  price?: number;
  tags?: string[];
  images?: File[];
  author: {
    name: string;
    role: string;
    initials: string;
  };
  time: string;
  likes: number;
  comments: [];
}

export default function FeedPage() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [posts, setPosts] = useState<Post[]>(mockFeedData);
  const { toast } = useToast();

  const filteredPosts = selectedType
    ? posts.filter((post) => post.type === selectedType)
    : posts;

  const handleCreatePost = (postData: PostFormData) => {
    const newPost: Post = {
      id: Date.now(),
      ...postData,
    };
    setPosts([newPost, ...posts]);
    toast({
      title: 'Post created',
      description: 'Your post has been published successfully.',
    });
  };

  const handleArchivePost = (postId: number) => {
    setPosts(posts.map(post =>
      post.id === postId
        ? { ...post, archived: !post.archived }
        : post
    ));
    toast({
      title: 'Post updated',
      description: 'Post has been archived.',
    });
  };

  const handleReportPost = (postId: number) => {
    toast({
      title: 'Post reported',
      description: 'Thank you for your report. We will review it shortly.',
    });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Community Feed</h1>
          <p className="text-muted-foreground">Stay connected with your community</p>
        </div>
        <Button className="gap-2" onClick={() => setShowCreatePost(true)}>
          <Plus className="h-4 w-4" />
          New Post
        </Button>
      </div>

      <FeedFilters selectedType={selectedType} onSelectType={setSelectedType} />

      <div className="space-y-6">
        {filteredPosts.map((post) => (
          <FeedPost
            key={post.id}
            {...post}
            onArchive={() => handleArchivePost(post.id)}
            onReport={() => handleReportPost(post.id)}
          />
        ))}
      </div>

      <CreatePostDialog
        open={showCreatePost}
        onOpenChange={setShowCreatePost}
        onSubmit={handleCreatePost}
      />
    </div>
  );
}