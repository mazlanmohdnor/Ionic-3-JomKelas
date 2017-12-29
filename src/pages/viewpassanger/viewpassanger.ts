import { AngularFireDatabase } from "angularfire2/database";
import { AngularFireAuth } from "angularfire2/auth";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { InAppBrowser } from "@ionic-native/in-app-browser";

@IonicPage()
@Component({
  selector: "page-viewpassanger",
  templateUrl: "viewpassanger.html"
})
export class ViewpassangerPage {
  ongoingRide: any;
  approvedpassangers: any;
  ride: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public firebaseDB: AngularFireDatabase,
    public fire: AngularFireAuth,
    public iab: InAppBrowser
  ) {
    //get data from ride.ts
    this.approvedpassangers = navParams.get("ride");
    // console.log(this.approvedpassangers);
  }

  ionViewDidLoad() {
    this.firebaseDB.database
      .ref(`ongoingRide/${this.fire.auth.currentUser.uid}`)
      .on("value", data => {
        this.ongoingRide = data.val();
        // console.log("psgr: ", data.val());
      });
  }

  viewProfile(profile) {
    console.log(profile);
  }

  whatsapp(phone) {
    console.log(phone);
    this.iab.create(
      `https://api.whatsapp.com/send?phone=6${phone}&text=hai%0D%0Anama+saya+mohd+mazlan%0D%0Asaya+berminat+nak+ride+kl+-+selangor+%3A+22%3A20AM`,
      "_system"
    );
  }

  report(passanger) {
    // console.log('report: ', passanger);
    this.navCtrl.push("RidereportPage", { report: passanger });
  }

  appreciate(passanger) {
    // console.log('appreciate: ', passanger);
    this.navCtrl.push("RideappreciatePage", { appreciate: passanger });
  }
}
