interface IAgency {
  _id: string;
  email: string;
  agencyName: string;
}

interface IUser {
  _id: string;
  username: string;
}

export interface IAccount extends IAgency, IUser {
  isAgency: boolean;
}
