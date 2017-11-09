export interface OfferRideModel{
    uid:string,
    destinationType: string;
    from: string;
    destination: string;
    meetingPoint: string;
    isRoundTrip: boolean;
    date: any;
    time: string;
    dateRoundTrip: any;
    timeRoundTrip: string;
    vehiclePlate: string;
    seatOffered: number;
    comment: string;
}