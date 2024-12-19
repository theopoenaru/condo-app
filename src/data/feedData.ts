export const feedData = [
  {
    id: 1,
    author: {
      name: 'Building Management',
      role: 'Property Manager',
      initials: 'B',
    },
    type: 'announcement',
    time: '2 hours ago',
    content: 'Annual fire alarm testing will take place next Tuesday. All units will be tested. Please ensure someone is home or leave a key with management.',
    likes: 12,
    comments: [
      {
        id: '1',
        author: {
          name: 'John Smith',
          initials: 'JS',
          role: 'Resident (1204)',
        },
        content: 'What time will the testing start?',
        time: '1 hour ago',
        likes: 2,
        replies: [
          {
            id: '2',
            author: {
              name: 'Building Management',
              initials: 'B',
              role: 'Property Manager',
            },
            content: 'Testing will begin at 9 AM and continue throughout the day.',
            time: '45 minutes ago',
            likes: 1,
          },
        ],
      },
    ],
  },
  {
    id: 2,
    author: {
      name: 'Front Desk',
      role: 'Building Staff',
      initials: 'F',
    },
    type: 'package',
    time: '3 hours ago',
    content: 'Package delivered for Unit 2505',
    metadata: {
      unit: '2505',
      location: 'Package Room',
      courier: 'FedEx',
      deliveredAt: '2:15 PM',
    },
    likes: 0,
    comments: [],
  },
  {
    id: 3,
    author: {
      name: 'Sarah Chen',
      role: 'Resident (2505)',
      initials: 'SC',
    },
    type: 'marketplace',
    time: '5 hours ago',
    content: 'Selling my barely used Peloton bike. Perfect condition, only 6 months old. Includes mat and weights.',
    metadata: {
      price: '$1200',
      condition: 'Like New',
      negotiable: true,
      category: 'Fitness',
    },
    likes: 8,
    comments: [],
  },
  {
    id: 4,
    author: {
      name: 'Condo Board',
      role: 'Building Management',
      initials: 'C',
    },
    type: 'vote',
    time: '1 day ago',
    content: 'Should we replace the lobby furniture this year?',
    metadata: {
      options: {
        'Yes, proceed with replacement': 58,
        'No, wait another year': 42,
      },
      votes: 77,
      endDate: 'February 20, 2024',
    },
    likes: 0,
    comments: [],
  },
];