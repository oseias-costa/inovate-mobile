export type Notification = {
  title: string;
  description: string;
  isRead: boolean;
  type: 'REPORT' | 'NOTICE' | 'REQUEST';
  itemUuid: string;
  createAt: Date;
};
