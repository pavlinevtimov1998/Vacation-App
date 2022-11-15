import { IOffer } from './offer.interface';

export interface ICountry {
  _id: string;
  country: string;
  image: string;
  offersId: IOffer[] | string[];
}
