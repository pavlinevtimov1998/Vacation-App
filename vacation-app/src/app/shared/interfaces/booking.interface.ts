export interface IBooking {
  _id: string;
  user: string;
  agency: string;
  startDate: Date;
  endDate: Date;
  price: number;
  offer: string;
}
