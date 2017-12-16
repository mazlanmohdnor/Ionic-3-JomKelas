import { OfferRideModel } from "./../../model/offerridemodel";
import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController,
  AlertController,
  LoadingController,
  ModalController
} from "ionic-angular";
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase } from "angularfire2/database";

@IonicPage()
@Component({
  selector: "page-reviewride",
  templateUrl: "reviewride.html"
})
export class ReviewridePage {
  offerride = {} as OfferRideModel;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public alertCtrl: AlertController,
    public fire: AngularFireAuth,
    public firebaseDB: AngularFireDatabase,
    public loadingCtrl: LoadingController,
    public modal: ModalController
  ) {
    //this come from OfferRide
    this.offerride = navParams.get("offerride");
  }

  ionViewDidLoad() {
    // console.log(this.offerride);
    this.fire.auth.onAuthStateChanged(user => {
      //set ride id
      this.offerride.rideid = `${user.uid}-${this.offerride.from} - ${
        this.offerride.destination
      } : ${this.offerride.date} - ${this.offerride.time}`;
    });
  }

  confirm() {
    // let confirm = this.alertCtrl.create({
    //   title: `Add ride ${this.offerride.from} to ${this.offerride.destination}`,
    //   message: `Time : ${this.offerride.date}-${this.offerride.time}?`,
    //   buttons: [
    //     {
    //       text: "Cancel",
    //       handler: () => {
    //         console.log("Disagree clicked");
    //       }
    //     },
    //     {
    //       text: "Ok",
    //       handler: () => {
    let loading = this.loadingCtrl.create({
      content: "Publishing..."
    });
    loading.present();
    this.fire.auth.onAuthStateChanged(user => {
      this.firebaseDB
        .object(
          `/offerRides/${user.uid}-${this.offerride.from} - ${
            this.offerride.destination
          } : ${this.offerride.date} - ${this.offerride.time}`
        )
        .set(this.offerride);

      this.firebaseDB
        .object(
          `/userProfile/${user.uid}/trips/${user.uid}-${
            this.offerride.from
          } - ${this.offerride.destination} : ${this.offerride.date} - ${
            this.offerride.time
          }`
        )
        .set(this.offerride)
        .then(_ => {
          loading.dismiss();
          // this.viewCtrl.dismiss();
          this.navCtrl.setRoot('RidePage')
        });
    });

    // review the ride first
    //       }
    //     }
    //   ]
    // });
    // confirm.present();
  }
  cancel() {
    // this.viewCtrl.dismiss();
    this.navCtrl.pop();
  }
}
