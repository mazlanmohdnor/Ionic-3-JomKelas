export interface OfferRideModel{
    uid: string,
    name: string;
    userPhotoURL: string;
    rate:number;
    phone:number;
    //destination
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
    vehiclePlate: string;
    brand: string;
    model: string;
    color: string;
    vehiclePhotoURL: string;
}