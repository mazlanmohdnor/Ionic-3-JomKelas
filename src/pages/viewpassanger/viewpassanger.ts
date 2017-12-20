import { AngularFireDatabase } from "angularfire2/database";
import { AngularFireAuth } from "angularfire2/auth";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

@IonicPage()
@Component({
  selector: "page-viewpassanger",
  templateUrl: "viewpassanger.html"
})
export class ViewpassangerPage {
  approvedpassangers: any;
  ride: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public firebaseDB: AngularFireDatabase,
    public fire: AngularFireAuth
  ) {
    //get data from ride.ts
    this.ride = navParams.get("ride");
    console.log(this.approvedpassangers);
  }

  ionViewDidLoad() {
    this.firebaseDB.database
      .ref(`approvedPassanger/${this.ride.rideid}`)
      .on("value", data => {
        this.approvedpassangers = data.val();
    console.log(this.approvedpassangers);
        
      });
  }

  viewProfile(profile) {
    console.log(profile);
  }
}
