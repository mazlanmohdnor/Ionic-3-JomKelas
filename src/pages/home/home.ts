import { AngularFireDatabase } from "angularfire2/database";
import { AngularFireAuth } from "angularfire2/auth";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

@IonicPage()
@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  rate: number=(90/100)*5;
  trips: any;
  // rate: number=(this.trips.rate/100)*5;
  user: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public fire: AngularFireAuth,
    public firebaseDB: AngularFireDatabase
  ) {
    this.user = this.navParams.get("user");
  }

  ionViewDidLoad() {
    this.firebaseDB.database
      .ref("offerRides/")
      .orderByChild("time")
      .limitToLast(20)
      .on("value", data => {
        this.trips = data.val();
        // this.rate = (data.val().rate/100)*5;
        // console.log(data.val());
      });
  }

  goDetail(trip) {
    this.navCtrl.push("TripdetailPage", { trip: trip });
  }

  offerride() {
    this.navCtrl.push("OfferridePage");
  }
}
