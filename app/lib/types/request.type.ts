export type RequestType = {
  company: string;
  createdAt: string;
  description: string;
  documentName: string;
  expiration: string;
  uuid: string;
  status: 'Pendente' | 'Vencido' | 'Concluído';
};
