import { Task } from './admin';
import { sectionIconMap } from '@/store/slices/searchSlice';

export interface SearchResult {
  id: string;
  section: 'tasks' | 'announcements' | 'marketplaces' | 'discussions' | 'packages' | 'votes' | 'amenities';
  title: string;
  subtitle?: string;
  icon: keyof typeof sectionIconMap;
  url: string;
  tags?: string[];
  data?: Task;
}