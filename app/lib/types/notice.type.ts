import { Document } from './document.type';

export type NoticeType = {
  company: string;
  createdAt: string;
  text: string;
  title: string;
  expiration: string;
  uuid: string;
  status: 'Pendente' | 'Vencido' | 'Concluído';
};

export type NoticeData = {
  items: NoticeType[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
    previusPage: number;
    nextPage: number | null;
  };
};
