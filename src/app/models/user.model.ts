import { Role } from './role.model';

export class User {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
  role: Role;
  token: string;
}
