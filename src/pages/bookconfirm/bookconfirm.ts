import { AngularFireDatabase } from "angularfire2/database";
import { AngularFireAuth } from "angularfire2/auth";
import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController,
  AlertController,
  LoadingController
} from "ionic-angular";
import { OfferRideModel } from "../../model/offerridemodel";
import { Requestmodel } from "../../model/requestmodel";

@IonicPage()
@Component({
  selector: "page-bookconfirm",
  templateUrl: "bookconfirm.html"
})
export class BookconfirmPage {
  request = {} as Requestmodel;
  trip = {} as OfferRideModel;
  price: any;

  btnDec: boolean;
  btnInc: boolean = false;
  currentNumber: number = 0;
  newNumber: number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public fire: AngularFireAuth,
    public firebaseDB: AngularFireDatabase,
    private alertCtrl: AlertController,
    public loadingCtrl: LoadingController
  ) {
    //get from trip detail
    this.trip = navParams.get("trip");
  }

  ionViewDidLoad() {
    console.log(this.trip);
    if (this.trip.seatOffered == 0) {
      this.btnInc = true;
      this.btnDec = true;
    }
  }

  public increment() {
    this.currentNumber = this.currentNumber + 1;
    this.price = (this.trip.price * this.currentNumber).toFixed(2);
    if (this.currentNumber == this.trip.seatOffered) {
      this.btnInc = true;
    }
  }

  public decrement() {
    if (this.currentNumber > 0) {
      this.currentNumber = this.currentNumber - 1;
      this.price = (this.trip.price * this.currentNumber).toFixed(2);
      this.btnInc = false;
    }
  }

  cancel() {
    // this.viewCtrl.dismiss();
    this.navCtrl.pop();
  }

  confirm() {
    this.getDriverDetail();

    this.request.seatBooked = this.currentNumber;
    this.request.totalPrice = this.price;

    console.log(this.request);
    let loading = this.loadingCtrl.create({
      content: "Requesting..."
    });
    loading
      .present()
      .then(() => {
        console.log('requert:', this.request);
        //   // save ride detail
        //   // let time = new Date().valueOf
        this.firebaseDB.database
          .ref(
            `request/${this.request.dId}/${this.request.rideid}/${this.request.pUid}`)
          .set(this.request)
          .then(() => {
            this.fire.auth.onAuthStateChanged(user => {
              this.firebaseDB
                .object(
                  `userProfile/${user.uid}/mybooking/${this.request.rideid}`
                )
                .set(this.request);
            });
          });
        // .set({
        //   rideid: this.request.rideid,
        //   passengerId: this.request.pUid,
        //   booktime: 2342,
        //   seatBooked: this.request.seatBooked
        // })
      })
      .then(() => {
        loading.dismiss().then(() => {
          //booking done
          let alert = this.alertCtrl.create({
            title: "Request Sent to Driver.",
            subTitle: "We will notify you when the driver respond",
            buttons: [
              {
                text: "Ok",
                handler: () => {
                  // this.viewCtrl.dismiss()
                  this.navCtrl.setRoot("BookingPage");
                }
              }
            ]
          });
          alert.present();
        });
      });
  }

  //fetch driver info, this ride info, and passenger info
  getDriverDetail() {
    //driver info
    this.request.dId = this.trip.uid;
    this.request.dName = this.trip.name;
    this.request.dUserPhotoURL = this.trip.userPhotoURL;
    this.request.dRate = this.trip.rate;
    this.request.dPhone = this.trip.phone;
    //ride info
    this.request.from = this.trip.from;
    this.request.destination = this.trip.destination;
    this.request.meetingPoint = this.trip.meetingPoint;
    this.request.date = this.trip.date;
    this.request.time = this.trip.time;
    this.request.seatOffered = this.trip.seatOffered;

    //current user profile
    this.fire.auth.onAuthStateChanged(user => {
      this.firebaseDB.database
        .ref(`userProfile/${user.uid}`)
        .on("value", data => {
          console.log('current user data: ',data.val());
          this.request.pUid = this.fire.auth.currentUser.uid;
          this.request.pName = data.val().fullname;
          this.request.pPhotoURL = data.val().photoURL;
          this.request.pEmail = data.val().email;
          this.request.pPhoneNumber = data.val().phoneNumber;
          this.request.pMatric = data.val().matricNumber;
          this.request.pBio = data.val().bio;
          this.request.pKolej = data.val().kolej;
          this.request.pGender = data.val().gender;
          this.request.pRate = data.val().rate;
          this.request.ptotalRideJoined = data.val().totalRideJoined;
          this.request.ptotalRideOffered = data.val().totalRideJoined;
          this.request.pRatePercentage = data.val().ratePercentage;
          this.request.p_profileComplete = data.val().profileComplete;
        });
    });

    //set metadata
    this.request.rideid = `${this.request.from} - ${
      this.request.destination
    } : ${this.request.date} - ${this.request.time}`;
    this.request.ridestatus = false;
    this.request.isRejected = false;
  }

 
}
