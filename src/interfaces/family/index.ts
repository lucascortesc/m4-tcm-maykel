import { Address } from "../../entities/address.entity";

export interface iFamily {
  name: string;
}

export interface iCreateFamily extends iFamily {
  address_id: string;
}

export interface iUpdateFamily {
  name?: string;
  address_id?: string;
}

export interface IResponseFamily {
  name: string;
  id: string;
  address_id: string;
}
