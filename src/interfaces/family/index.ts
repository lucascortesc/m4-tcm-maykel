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
