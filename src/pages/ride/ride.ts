import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase } from "angularfire2/database";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { OfferRideModel } from "../../model/offerridemodel";

@IonicPage()
@Component({
  selector: "page-ride",
  templateUrl: "ride.html"
})
export class RidePage {
  trips = {} as OfferRideModel;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public firebaseDB: AngularFireDatabase,
    public fire: AngularFireAuth
  ) {}

  ionViewDidLoad() {
    this.fire.auth.onAuthStateChanged(user => {
      this.firebaseDB.database
        .ref(`userProfile/${user.uid}/trips`)
        .on("value", data => {
          this.trips = data.val();
        });
    });
  }

  delete(trip) {
    this.fire.auth.onAuthStateChanged(user => {
      this.firebaseDB.database.ref(`userProfile/${user.uid}/trips/${trip.key}`).remove();
      this.firebaseDB.database.ref(`offerRides/${trip.key}`).remove();
    });
  }
}
