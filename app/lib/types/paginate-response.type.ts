export type PaginateReponse<T> = {
  items: T[];
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
