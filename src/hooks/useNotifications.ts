import { useState } from 'react';
import { Notification } from '@/types/notification';

const initialNotifications: Notification[] = [
  {
    id: '1',
    title: 'New Maintenance Request',
    description: 'Unit 1204 reported a leaking faucet',
    time: '2m ago',
    type: 'maintenance',
    unread: true,
  },
  {
    id: '2',
    title: 'Amenity Booking',
    description: 'Party Room booking request approved',
    time: '1h ago',
    type: 'amenity',
    unread: true,
  },
  {
    id: '3',
    title: 'Package Delivery',
    description: 'New package arrived for Unit 502',
    time: '3h ago',
    type: 'package',
    unread: true,
  },
];

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({
      ...notification,
      unread: false,
    })));
  };

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notification =>
      notification.id === id ? { ...notification, unread: false } : notification
    ));
  };

  const unreadCount = notifications.filter(n => n.unread).length;

  return {
    notifications,
    unreadCount,
    markAllAsRead,
    markAsRead,
  };
}