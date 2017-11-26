import { AngularFireDatabase } from "angularfire2/database";
import { AngularFireAuth } from "angularfire2/auth";
import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ModalController,
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

  btnInc: boolean = false;
  currentNumber: number = 0;

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
    // console.log(this.trip);
  }

  public increment() {
    this.currentNumber = this.currentNumber + 1;
    if (this.currentNumber == this.trip.seatOffered) {
      this.btnInc = true;
    }
  }

  public decrement() {
    if (this.currentNumber > 0) {
      this.currentNumber = this.currentNumber - 1;
      this.btnInc = false;
    }
  }

  cancel() {
    this.viewCtrl.dismiss();
  }

  confirm() {
    this.getDriverDetail();
    console.log(this.request);
    let loading = this.loadingCtrl.create({
      content: "Publishing..."
    });
    loading.present().then(() => {
      // save ride detail
      this.firebaseDB
        .object(`request/${this.request.dId}/${this.request.rideid}/${this.request.pUid}`)
        .set(this.request)
    }).then(()=>{
      loading.dismiss().then(()=>{
        //booking done
        let alert = this.alertCtrl.create({
          title: "Request Sent to Driver.",
          subTitle: "We will notify you when the driver respond",
          buttons: [
            {
              text: 'Ok',
              handler: () => {
                this.viewCtrl.dismiss()
              }
            }
          ]
        });
        alert.present();
      })
    });

   
  }

  //fetch driver info, this ride info, and passenger info
  getDriverDetail() {
    this.firebaseDB.database
      .ref(`offerRides/${this.trip.rideid}`)
      .on("value", data => {
        //driver info
        this.request.dId = data.val().uid;
        this.request.dName = data.val().name;
        this.request.dUserPhotoURL = data.val().userPhotoURL;
        this.request.dRate = data.val().rate;
        this.request.dPhone = data.val().phone;
        //ride info
        this.request.from = data.val().from;
        this.request.destination = data.val().destination;
        this.request.meetingPoint = data.val().meetingPoint;
        this.request.date = data.val().date;
        this.request.time = data.val().time;
        this.request.seatOffered = data.val().seatOffered;
      });

    //current user profile
    this.fire.auth.onAuthStateChanged(user => {
      this.firebaseDB.database
        .ref(`userProfile/${user.uid}`)
        .on("value", data => {
          this.request.pUid = user.uid;
          this.request.pName = data.val().fullname;
          this.request.pPhotoURL = data.val().photoURL;
          this.request.pEmail = data.val().email;
          this.request.pPhoneNumber = data.val().phoneNumber;
          this.request.pMatric = data.val().matricNumber;
          this.request.pBio = data.val().bio;
          this.request.pKolej = data.val().kolej;
          this.request.pGender = data.val().gender;
          this.request.pRate = data.val().rate / 100 * 5;
          this.request.p_profileComplete = data.val().profileComplete;
        });
    });

    //set metadata
    this.request.rideid = `${this.request.from} - ${
      this.request.destination
    } : ${this.request.date} - ${this.request.time}`;
    this.request.ridestatus = false;
    this.request.seatBooked = this.currentNumber;
  }
}
