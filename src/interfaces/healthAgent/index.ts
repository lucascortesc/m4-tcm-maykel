export interface ICreateHealthAgent {
  email: string;
  name: string;
  password: string;
}

export interface IHealthAgent {
  id: string;
  email: string;
  name: string;
  isActive: boolean;
  password?: string;
}
