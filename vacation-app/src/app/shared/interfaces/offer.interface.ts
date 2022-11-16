import { IAgency } from './account.interface';

export interface IOffer {
  _id: string;
  title: string;
  town: string;
  country: string;
  description: string;
  price: number;
  images: string[];
  ratingsQuantity: string;
  rating: string;
  peopleBooked: number;
  agencyId: IAgency;
}
