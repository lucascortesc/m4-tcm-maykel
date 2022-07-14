export interface ICreateHealthAgent {
  email: string;
  name: string;
  password: string;
}

export interface IHealthAgent {
  id: string;
  email: string;
  name: string;
  isactive: boolean;
  password: string;
}
export interface IUpdateHealthAgent {
  id?: string;
  email?: string;
  name?: string;
  isactive?: boolean;
  password?: string;
}
