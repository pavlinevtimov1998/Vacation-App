import { IOffer } from './offer.interface';

export interface IAgency {
  _id: string;
  email: string;
  agencyName: string;
  website: string;
  offers: IOffer[];
}

interface IUser {
  _id: string;
  username: string;
  bookedOffers: string[] | IOffer[];
}

export interface IAccount extends IAgency, IUser {
  phone: string;
  createdAt: string;
  adress: string;
  isAgency: boolean;
}
