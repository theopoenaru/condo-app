export type NotificationType = 'maintenance' | 'amenity' | 'package' | 'announcement' | 'security';

export interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  type: NotificationType;
  unread: boolean;
}