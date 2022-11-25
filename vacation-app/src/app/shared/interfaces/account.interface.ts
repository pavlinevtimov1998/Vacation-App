import { IOffer } from './offer.interface';

export interface IAgency {
  _id: string;
  email: string;
  agencyName: string;
  website: string;
  offers: IOffer[];
  phone: string;
  createdAt: string;
  adress: string;
  image: string;
  rating: number;
  description: string;
}

export interface IUser {
  _id: string;
  username: string;
  email: string;
  phone: string;
  createdAt: string;
}

export interface IAccount extends IAgency, IUser {
  isAgency: boolean;
}
