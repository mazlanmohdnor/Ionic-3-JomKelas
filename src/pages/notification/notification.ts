import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase } from "angularfire2/database";
import { DeviceFeedback } from "@ionic-native/device-feedback";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Requestmodel } from "../../model/requestmodel";

@IonicPage()
@Component({
  selector: "page-notification",
  templateUrl: "notification.html"
})
export class NotificationPage {
  riderequest = {} as Requestmodel;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public devfeb: DeviceFeedback,
    public firebaseDB: AngularFireDatabase,
    public fire: AngularFireAuth
  ) {}

  ionViewDidLoad() {
    let ref = this.firebaseDB.database.ref().child(`request/${this.fire.auth.currentUser.uid}`);
    
    ref.on("value", data => {
       console.log(data.val());
       this.riderequest = data.val();
    })
       
}

  review(req) {
    // console.log(req.key);
    this.navCtrl.push("ReviewrequestPage", { request: req.key });
  }
}
