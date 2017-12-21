import { Profile } from "./../../model/profile";
import { AngularFireDatabase } from "angularfire2/database";
import { AngularFireAuth } from "angularfire2/auth";
import { Requestmodel } from "./../../model/requestmodel";
import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController,
  AlertController
} from "ionic-angular";

@IonicPage()
@Component({
  selector: "page-ratebooking",
  templateUrl: "ratebooking.html"
})
export class RatebookingPage {
  totalReviewer: number;
  profile = {} as Profile;
  book = {} as Requestmodel;
  rating: number;
  review: string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public firebaseDB: AngularFireDatabase,
    public fire: AngularFireAuth,
    public loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {
    // get data from booking.ts
    this.book = navParams.get("currentbook");
  }

  ionViewDidLoad() {
    // get data from booking.ts
    console.log("ionViewDidLoad RatebookingPage", this.book);

    //get the total number of people that give feedback
    this.firebaseDB.database.ref(`userreviews/${this.book.dId}/`).on("value", data => {
        this.totalReviewer = data.numChildren()
        console.log('data.numChildren(): ', data.numChildren());
      })
      
  }
  submit() {
    let loading = this.loadingCtrl.create({ content: "Submitting..." });
    loading.present();

    this.firebaseDB.database
      .ref(`/userProfile/${this.book.dId}`)
      .update({
        rate: this.book.dRate + this.rating,
        //rating mean, total rating/total user giving the rating
        ratePercentage:
          (this.book.dRate + this.rating) / (this.totalReviewer + 1),
        totalRideJoined: this.book.ptotalRideJoined + 1
      });
      //add review
      this.firebaseDB.database
        .ref(`/userreviews/${this.book.dId}/`)
        .push({
          reviewerName: this.book.pName,
          review: this.review
        });

    loading.dismiss();

    //prompt success added, then remove from current node to, completed node
    let alert = this.alertCtrl.create({
      title: "Thank you for your rating and feedback.",
      buttons: [
        {
          text: "OK",
          handler: () => {
            this.fire.auth.onAuthStateChanged(user => {
              this.firebaseDB.database
                .ref(`userProfile/${user.uid}/mybooking/${this.book.key}`)
                .remove()
                .then(() => {
                  this.firebaseDB.database
                  .ref(`userProfile/${user.uid}/bookcomplete/${this.book.key}`)
                  .set(this.book)
                })
                .then(() => {
                  this.navCtrl.setRoot('BookingPage', {'isComplete':true})
                })
            });
          }
        }
      ]
    });
    alert.present();
    console.log("rating", this.rating, "review", this.review);
  }
}
