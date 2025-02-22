import { Document } from './document.type';

export type ReportType = {
  company: string;
  companyUuid: string;
  createdAt: Date;
  text: string;
  title: string;
  uuid: string;
  documents: [Document];
};
