export interface ICreateHomeVisit {
  status: string;
  message: string;
  address_id: string;
}

export interface IHomeVisit {
  id: string;
  status: string;
  message: string;
  address_id: any;
  agent_id: any;
  created_at: Date;
  updated_at: Date;
}

export interface IUpdateHomeVisit {
  id?: string;
  status?: string;
  message?: string;
  address_id?: any;
  agent_id?: any;
  created_at?: Date;
  updated_at?: Date;
}
