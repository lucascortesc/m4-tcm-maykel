export interface ICreateAddress {
  state: string;
  city: string;
  cep: string;
  number: number;
  street: string;
}

export interface IAddress extends ICreateAddress {
  id: string;
  agentId: string;
}

export interface IUpdateAddress {
  state?: string;
  city?: string;
  cep?: string;
  number?: number;
  street?: string;
}
