export interface ICreateAddress {
  state: string;
  city: string;
  cep: string;
  number: number;
  street: string;
}

export interface IAddress extends ICreateAddress {
  id: string;
  agent_id: string;
}

export interface IUpdateAddress {
  id?: string;
  agent_id: string;
  state?: string;
  city?: string;
  cep?: string;
  number?: number;
  street?: string;
}
