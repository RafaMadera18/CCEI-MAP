import { Account } from '../auth';

export interface User {
  id: string;
  firtstName: string;
  lastName: string;
  email: string;
  phone: string;
  userAccount: Account;
}
