export type RequestType = {
  company: string;
  createdAt: string;
  description: string;
  documentName: string;
  expiration: string;
  uuid: string;
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
