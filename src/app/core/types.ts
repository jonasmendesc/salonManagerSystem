export interface TokenApplication {
  data: DataTokenApplication;
  dueDate: string;
}

interface DataTokenApplication {
  createToken: Authorization;
}

interface Authorization {
  token: string;
  expiresIn: number;
}
