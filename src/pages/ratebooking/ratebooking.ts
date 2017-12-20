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
    //get the current rating, add to the rating that user gave
    this.fire.auth.onAuthStateChanged(user => {
      this.firebaseDB.database
        .ref(`userProfile/${user.uid}/`)
        .on("value", data => {
          this.profile = data.val();
        });
    });
  }
  submit() {
    let loading = this.loadingCtrl.create({ content: "Submitting..." });
    loading.present();

    this.fire.auth.onAuthStateChanged(user => {
      this.firebaseDB.database.ref(`/userProfile/${user.uid}`).update({
        rate: this.profile.rate + this.rating //new rating
      });

      //add review
      this.firebaseDB.database.ref(`/userreviews/${user.uid}/`).push({
        reviewerName: this.book.pName,
        review: this.review
      });
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
    // console.log("rating", this.rating, "review", this.review);
  }
}
