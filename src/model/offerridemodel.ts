export interface OfferRideModel {
  uid: string;
  name: string;
  userPhotoURL: string;
  rate: number;
  ratePercentage: number;
  phone: number;
  gender: string;
  totalRideOffered: string;
  totalRideJoined: string;
  //destination
  rideid: string;
  destinationType: string;
  from: string;
  destination: string;
  meetingPoint: string;
  isRoundTrip: boolean;
  date: any;
  time: string;
  dateRoundTrip: any;
  timeRoundTrip: string;
  seatOffered: number;
  comment: string;
  //vehicle
  vehicleType: string;
  vehiclePlate: string;
  brand: string;
  model: string;
  color: string;
  vehiclePhotoURL: string;
  //metadata
  timestamp: number;
  onlyWomen: boolean;
  price: number;
}