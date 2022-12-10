import { IOffer } from './offer.interface';

export interface IAgency {
  _id: string;
  email: string;
  agencyName: string;
  website: string;
  offers: IOffer[];
  phone: string;
  createdAt: string;
  address: string;
  country: string;
  town: string;
  image: string;
  description: string;
}

export interface IUser {
  _id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  image: string;
  phone: string;
  createdAt: string;
}

export interface IAccount extends IAgency, IUser {
  isAgency: boolean;
}
