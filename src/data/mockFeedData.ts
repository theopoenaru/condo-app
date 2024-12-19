import { FeedPost } from '@/components/feed/FeedPost';

export interface Post extends Omit<Parameters<typeof FeedPost>[0], 'className'> {
  id: number;
}

export const mockFeedData: Post[] = [
  {
    id: 1,
    author: {
      name: 'Building Management',
      role: 'Property Manager',
      initials: 'BM',
      verified: true,
    },
    type: 'announcement',
    time: '1 hour ago',
    content: 'Important: The pool will be closed for maintenance this weekend. We will be upgrading the filtration system.',
    metadata: {
      priority: 'high',
      images: [
        'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=800&auto=format&fit=crop&q=60',
      ],
    },
    likes: 15,
    comments: [],
  },
  {
    id: 2,
    author: {
      name: 'Building Management',
      role: 'Property Manager',
      initials: 'BM',
      verified: true,
    },
    type: 'announcement',
    time: '2 hours ago',
    content: 'Annual fire alarm testing will take place next Tuesday. All units will be tested. Please ensure someone is home or leave a key with management.',
    metadata: {
      priority: 'high',
      images: [
        'https://images.unsplash.com/photo-1582139329536-e7284fece509?w=800&auto=format&fit=crop&q=60',
      ],
    },
    likes: 12,
    comments: [],
  },
  {
    id: 3,
    author: {
      name: 'Front Desk',
      role: 'Building Staff',
      initials: 'FD',
      verified: true,
    },
    type: 'package',
    time: '3 hours ago',
    content: 'Package delivered for Unit 2505',
    metadata: {
      unit: '2505',
      carrier: 'FedEx',
      deliveryTime: '2:15 PM',
      location: 'Package Room',
    },
    likes: 0,
    comments: [],
  },
  {
    id: 4,
    author: {
      name: 'Concierge',
      role: 'Building Staff',
      initials: 'CO',
      verified: true,
    },
    type: 'package',
    time: '4 hours ago',
    content: 'Large package arrived for Unit 1202',
    metadata: {
      unit: '1202',
      carrier: 'UPS',
      deliveryTime: '1:30 PM',
      location: 'Package Room',
    },
    likes: 0,
    comments: [],
  },
  {
    id: 5,
    author: {
      name: 'Sarah Chen',
      role: 'Resident (2505)',
      initials: 'SC',
    },
    type: 'marketplace',
    time: '5 hours ago',
    content: 'Selling my barely used Peloton bike. Perfect condition, only 6 months old. Includes mat and weights.',
    metadata: {
      price: 1200,
      category: 'Fitness',
      condition: 'Like New',
      negotiable: true,
      images: [
        'https://images.unsplash.com/photo-1591291621164-2c6367723315?w=800&auto=format&fit=crop&q=60',
        'https://images.unsplash.com/photo-1591291621208-7d4081314c17?w=800&auto=format&fit=crop&q=60',
      ],
    },
    likes: 8,
    comments: [],
  },
  {
    id: 6,
    author: {
      name: 'Michael Rodriguez',
      role: 'Resident (1505)',
      initials: 'MR',
    },
    type: 'marketplace',
    time: '1 day ago',
    content: 'Moving sale! Beautiful dining table set, perfect for 6 people. Solid wood, minimal wear.',
    metadata: {
      price: 800,
      category: 'Furniture',
      condition: 'Good',
      negotiable: true,
      images: [
        'https://images.unsplash.com/photo-1577140917170-285929fb55b7?w=800&auto=format&fit=crop&q=60',
      ],
    },
    likes: 12,
    comments: [],
  },
  {
    id: 7,
    author: {
      name: 'Condo Board',
      role: 'Building Management',
      initials: 'CB',
      verified: true,
    },
    type: 'vote',
    time: '2 days ago',
    content: 'Should we replace the lobby furniture this year?',
    metadata: {
      options: [
        { id: 1, text: 'Yes, proceed with replacement', votes: 45 },
        { id: 2, text: 'No, wait another year', votes: 32 },
      ],
      totalVotes: 77,
      endDate: 'March 15, 2024',
      myVote: null,
    },
    likes: 5,
    comments: [],
  },
  {
    id: 8,
    author: {
      name: 'Building Committee',
      role: 'Building Management',
      initials: 'BC',
      verified: true,
    },
    type: 'vote',
    time: '3 days ago',
    content: 'Proposal to extend gym hours to 24/7 access',
    metadata: {
      options: [
        { id: 1, text: 'Yes, extend hours', votes: 89 },
        { id: 2, text: 'No, keep current hours', votes: 34 },
      ],
      totalVotes: 123,
      endDate: 'March 20, 2024',
      myVote: null,
    },
    likes: 15,
    comments: [],
  },
  {
    id: 9,
    author: {
      name: 'John Smith',
      role: 'Resident (1202)',
      initials: 'JS',
    },
    type: 'amenity',
    time: '1 day ago',
    content: '',
    metadata: {
      type: 'Party Room',
      date: 'March 25, 2024',
      time: '6:00 PM - 10:00 PM',
      guests: 20,
      status: 'pending',
    },
    likes: 0,
    comments: [],
  },
  {
    id: 10,
    author: {
      name: 'Emma Wilson',
      role: 'Resident (2301)',
      initials: 'EW',
    },
    type: 'amenity',
    time: '2 days ago',
    content: '',
    metadata: {
      type: 'Tennis Court',
      date: 'March 18, 2024',
      time: '2:00 PM - 4:00 PM',
      guests: 4,
      status: 'confirmed',
    },
    likes: 2,
    comments: [],
  },
  {
    id: 11,
    author: {
      name: 'Lisa Thompson',
      role: 'Resident (1801)',
      initials: 'LT',
    },
    type: 'discussion',
    time: '1 day ago',
    content: 'Has anyone used the new bike repair station in the garage? Looking for tips on basic maintenance.',
    metadata: {
      tags: ['Amenities', 'Bikes', 'Help'],
    },
    likes: 5,
    comments: [
      {
        id: '1',
        author: {
          name: 'David Chen',
          initials: 'DC',
          role: 'Resident (2204)',
        },
        content: 'Yes! Its great for basic maintenance. I can show you how to use it this weekend if youd like.',
        time: '20 hours ago',
        likes: 2,
      },
    ],
  },
  {
    id: 12,
    author: {
      name: 'Mark Davis',
      role: 'Resident (901)',
      initials: 'MD',
    },
    type: 'discussion',
    time: '2 days ago',
    content: 'Looking to start a weekly board game night in the common room. Anyone interested in joining?',
    metadata: {
      tags: ['Social', 'Events', 'Community'],
    },
    likes: 15,
    comments: [
      {
        id: '1',
        author: {
          name: 'Sarah Chen',
          initials: 'SC',
          role: 'Resident (2505)',
        },
        content: 'Count me in! I have several games we could play.',
        time: '1 day ago',
        likes: 3,
      },
    ],
  },
];