import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { RootState } from '@/store';
import { setSearchResults, setSearchTerm, setInitialResults } from '@/store/slices/searchSlice';
import { sectionIconMap } from '@/store/slices/searchSlice';
import type { SearchResult } from '@/types/search';
import { mockFeedData } from '@/data/mockFeedData';

const getPostSection = (type: string | undefined): SearchResult['section'] => {
  switch (type) {
    case 'announcement': return 'announcements';
    case 'package': return 'packages';
    case 'marketplace': return 'marketplaces';
    case 'vote': return 'votes';
    case 'amenity': return 'amenities';
    default: return 'discussions';
  }
};

export function useGlobalSearch() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tasks = useSelector((state: RootState) => state.inbox.tasks);
  const feedPosts = mockFeedData;
  const { searchTerm, results, initialResults } = useSelector((state: RootState) => state.search);

  useEffect(() => {
    if (initialResults.length > 0) return; // Only set initial results once
    
    // Convert tasks to search results
    const taskResults = tasks.map(task => ({
      id: task.id.toString(),
      section: 'tasks',
      title: task.title,
      subtitle: `${task.sender.name} · Unit ${task.sender.unit} · ${task.time}`,
      icon: sectionIconMap.tasks,
      url: `/inbox?task=${task.id}`,
      tags: [task.type, task.priority],
      data: task,
    }));

    // Convert feed posts to search results
    const feedResults = feedPosts.map(post => ({
      id: post.id.toString(),
      section: getPostSection(post.type),
      title: post.content,
      subtitle: `${post.author.name} · ${post.time}`,
      icon: sectionIconMap[getPostSection(post.type)],
      url: `/feed?post=${post.id}`,
      tags: post.metadata?.tags || [],
    }));

    dispatch(setInitialResults([...taskResults, ...feedResults]));
  }, [tasks, dispatch, initialResults.length]);

  useEffect(() => {
    if (!searchTerm?.trim()) {
      dispatch(setSearchResults(initialResults));
    } else {
      const term = searchTerm.toLowerCase();
      const filtered = initialResults.filter(result => 
        result.title?.toLowerCase().includes(term) ||
        result.subtitle?.toLowerCase().includes(term) ||
        result.tags?.some(tag => tag.toLowerCase().includes(term))
      );
      dispatch(setSearchResults(filtered));
    }
  }, [searchTerm, initialResults, dispatch]);

  const handleSelect = (result: SearchResult) => {
    navigate(result.url);
    dispatch(setSearchTerm(''));
  };

  return {
    searchTerm,
    results,
    setSearchTerm: (term: string) => {
      dispatch(setSearchTerm(term));
    },
    handleSelect,
  };
}