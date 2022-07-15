export interface ICreatePacient {
  cpf: string;
  name: string;
  last_name: string;
  age: number;
  tel: string;
  family_id: string;
  is_owner: boolean;
}

export interface IPacient extends ICreatePacient {
  id: string;
}

export interface IListPacient {
  id: string;
  name: string;
  last_name: string;
  cpf: string;
  age: number;
  tel: string;
  is_owner: boolean;
  family_id: string;
  address_id: string;
}

export interface IUpdatePacient {
  id?: string;
  cpf?: string;
  name?: string;
  last_name?: string;
  age?: number;
  tel?: string;
  is_owner?: boolean;
  family_id?: string;
}
