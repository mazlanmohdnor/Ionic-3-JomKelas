import { AngularFireDatabase } from "angularfire2/database";
import { AngularFireAuth } from "angularfire2/auth";
import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController,
  LoadingController
} from "ionic-angular";

@IonicPage()
@Component({
  selector: "page-rideappreciate",
  templateUrl: "rideappreciate.html"
})
export class RideappreciatePage {
  totalReviewer: number;
  passanger: any;
  rating;
  review;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public firebaseDB: AngularFireDatabase,
    public fire: AngularFireAuth,
    public loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {
    //get from viewpassanger.ts
    this.passanger = navParams.get("appreciate");
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad RideappreciatePage", this.passanger);

    //get the total number of people that give feedback
    this.firebaseDB.database
      .ref(`userreviews/${this.passanger.pUid}/`)
      .on("value", data => {
        this.totalReviewer = data.numChildren();
        console.log("data.numChildren(): ", data.numChildren());
      });
  }
  submit() {
    console.log("rating", this.rating,
      "review", this.review,
      "Data.numChildren():", this.totalReviewer,
      'pRate:', this.passanger.pRate,
      'rating given',this.rating,
      'ratePercentage: ', (this.passanger.pRate + this.rating),
      'divided by/', (this.totalReviewer + 1)
    );
    
    let loading = this.loadingCtrl.create({ content: "Submitting..." });
    loading.present();

    this.firebaseDB.database.ref(`/userProfile/${this.passanger.pUid}`)
      .update({
        rate: this.passanger.pRate + this.rating,
        //rating mean, total rating/total user giving the rating
        ratePercentage: (this.passanger.pRate + this.rating) / (this.totalReviewer + 1)
    });
    //add review
    this.firebaseDB.database.ref(`/userreviews/${this.passanger.pUid}/`).push({
      reviewerName: this.passanger.dName,
      review: this.review
    });

    loading.dismiss();

    let alert = this.alertCtrl.create({
      title: "Thank you for your rating and feedback.",
      buttons: [
        {
          text: "OK",
          handler: () => {
            this.navCtrl.setRoot('RidePage');
          }
        }
      ]
    });
    alert.present();
  }
}
