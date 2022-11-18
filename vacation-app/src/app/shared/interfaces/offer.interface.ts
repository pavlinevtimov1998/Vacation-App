import { IAgency } from './account.interface';
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
  peopleBooked: number;
  features: string[];
  agencyId: IAgency;
}

export interface IFeature {
  name: string;
}
