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

export interface IResponseHealthAgent {
  id: string;
  name: string;
  email: string;
  isactive: boolean;
}

export interface IUpdateHealthAgent {
  id?: string;
  email?: string;
  name?: string;
  isactive?: boolean;
  password?: string;
}

export interface ITestHealthAgent {
  id?: string;
  email?: string;
  name?: string;
  password?: string;
  token?: string;
}
