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
