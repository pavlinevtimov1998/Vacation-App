import { IAgency, IUser } from './account.interface';
import { ICountry } from './country.interface';

export interface IOffer {
  _id: string;
  title: string;
  town: string;
  country: ICountry;
  description: string;
  price: number;
  images: string[];
  ratingsQuantity: string;
  rating: string;
  peopleBooked: string[];
  features: string[];
  comments: IComment[];
  peopleFavourite: string[];
  agency: IAgency;
  createdAt: string;
}

export interface IComment {
  user: IUser;
  offer: string;
  content: string;
  createdAt: string;
}

export interface IFeature {
  name: string;
}
