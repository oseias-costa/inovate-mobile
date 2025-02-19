export type User = {
  uuid: string;
  createAt: string;
  email: string;
  id: string;
  name: string;
  password: string;
  reamlID: string;
  status: 'ACTIVE' | 'INACTIVE' | 'FIRST_ACESS' | 'PASSWORD_RESET';
  type: 'COMPANY' | 'USER' | 'ADMIN';
  updateAt: string;
};
