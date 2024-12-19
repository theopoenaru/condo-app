import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { setPosts, toggleLike, addComment, addReply } from '@/store/slices/feedSlice';
import { Comment } from '@/components/feed/FeedComment';

export function useFeed() {
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector((state: RootState) => state.feed);

  const handleToggleLike = (postId: number) => {
    dispatch(toggleLike(postId));
  };

  const handleAddComment = (postId: number, content: string) => {
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
    dispatch(addComment({ postId, comment: newComment }));
  };

  const handleAddReply = (postId: number, commentId: string, content: string) => {
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
    dispatch(addReply({ postId, commentId, reply }));
  };

  return {
    posts,
    loading,
    error,
    handleToggleLike,
    handleAddComment,
    handleAddReply,
  };
}