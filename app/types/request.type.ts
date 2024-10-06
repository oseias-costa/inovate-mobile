export type RequestType = {
  company: string;
  createdAt: string;
  description: string;
  documentName: string;
  expiration: string;
  uuid: string;
  status: 'Pendente' | 'Vencido' | 'Concluído';
};

export type RequestData = {
  items: RequestType[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
};
