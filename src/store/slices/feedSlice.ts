import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '@/components/feed/FeedComment';

interface Post {
  id: number;
  author: {
    name: string;
    role: string;
    initials: string;
    verified?: boolean;
  };
  type?: 'announcement' | 'package' | 'marketplace' | 'amenity' | 'vote';
  time: string;
  content: string;
  metadata?: Record<string, any>;
  likes: number;
  comments: Comment[];
  liked?: boolean;
}

interface FeedState {
  posts: Post[];
  loading: boolean;
  error: string | null;
}

const initialState: FeedState = {
  posts: [],
  loading: false,
  error: null,
};

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
    toggleLike: (state, action: PayloadAction<number>) => {
      const post = state.posts.find(p => p.id === action.payload);
      if (post) {
        post.liked = !post.liked;
        post.likes += post.liked ? 1 : -1;
      }
    },
    addComment: (state, action: PayloadAction<{ postId: number; comment: Comment }>) => {
      const post = state.posts.find(p => p.id === action.payload.postId);
      if (post) {
        post.comments.push(action.payload.comment);
      }
    },
    addReply: (state, action: PayloadAction<{ 
      postId: number; 
      commentId: string; 
      reply: Comment;
    }>) => {
      const post = state.posts.find(p => p.id === action.payload.postId);
      if (!post) return;

      const addReplyToComment = (comments: Comment[]): boolean => {
        for (const comment of comments) {
          if (comment.id === action.payload.commentId) {
            if (!comment.replies) comment.replies = [];
            comment.replies.push(action.payload.reply);
            return true;
          }
          if (comment.replies && addReplyToComment(comment.replies)) {
            return true;
          }
        }
        return false;
      };

      addReplyToComment(post.comments);
    },
  },
});

export const { setPosts, toggleLike, addComment, addReply } = feedSlice.actions;

export default feedSlice.reducer;