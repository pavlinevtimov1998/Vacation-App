import { IOffer } from './offer.interface';

export interface ICountry {
  _id: string;
  name: string;
  image: string;
  offers: IOffer[] | string[];
}
