import { Message } from '@/types/messages';

export const mockMessages: Message[] = [
  {
    id: '1',
    content: 'Ive dispatched the security team to investigate. Will update once we have more information.',
    sender: {
      name: 'John Wilson',
      role: 'Security Manager',
      initials: 'JW'
    },
    timestamp: '9:30 AM'
  },
  {
    id: '2',
    content: 'Security footage has been reviewed. The individual was identified as a delivery person who accessed the wrong entrance. No security breach occurred.',
    sender: {
      name: 'Sarah Chen',
      role: 'Security Officer',
      initials: 'SC'
    },
    timestamp: '10:15 AM',
    attachments: ['security_report.pdf']
  }
];