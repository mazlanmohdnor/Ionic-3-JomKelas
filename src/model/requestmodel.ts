export interface Requestmodel {
  //info about request
  key: string;
  rideid: string;
  ridestatus: boolean;
  rideRemaining: number;
  seatBooked: number;

  //info about ride
  from: string;
  destination: string;
  meetingPoint: string;
  date: any;
  time: string;
  seatOffered: number;

  //info about passanger
  pUid: string;
  pName: string;
  pPhotoURL: string;
  pEmail: string;
  pPhoneNumber: string;
  pMatric: number;
  pBio: string;
  pKolej: string;
  pGender: string;
  pRate: number;
  pRatePercentage:number;
  ptotalRideJoined:number;
  ptotalRideOffered:number;
  p_profileComplete: boolean;

  //info about driver
  dId: string;
  dName: string;
  dUserPhotoURL: string;
  dRate: number;
  dPhone: number;

  //metadata
  totalPrice: number;
  isRejected: boolean;
}