export interface IAgency {
  _id: string;
  email: string;
  agencyName: string;
  website: string;
}

interface IUser {
  _id: string;
  username: string;
}

export interface IAccount extends IAgency, IUser {
  phone: string;
  createdAt: string;
  adress: string;
  isAgency: boolean;
}
