import { Login } from '../login/login/login.model';

export interface TokenApplication {
  data: DataTokenApplication;
  dueDate: string;
}

interface DataTokenApplication {
  createToken: Authorization;
}

export interface CompanyToken {
  data: DataCompanyToken;
  dueDate: string;
  login: Login;
}

interface DataCompanyToken {
  createTokenCompany: Authorization;
}

interface Authorization {
  token: string;
  expiresIn: number;
}
