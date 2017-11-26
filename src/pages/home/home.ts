import { DeviceFeedback } from '@ionic-native/device-feedback';
import { AngularFireDatabase } from "angularfire2/database";
import { AngularFireAuth } from "angularfire2/auth";
import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController,
  Events
} from "ionic-angular";
import { Profile } from "../../model/profile";

@IonicPage()
@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  trips: any;
  user = {} as Profile;
  datenow = new Date();
 
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public fire: AngularFireAuth,
    public firebaseDB: AngularFireDatabase,
    private alertCtrl: AlertController,
    public event: Events,
    private deviceFeedback: DeviceFeedback
  ) {}

  ionViewDidLoad() {
    this.checkProfile();

    this.firebaseDB.database
      .ref("offerRides/")
      .on("value", data => {
        this.trips = data.val();
      });
      // console.log(this.trips);
  }

  checkProfile() {
    this.firebaseDB.database
      .ref(`userProfile/${this.fire.auth.currentUser.uid}`)
      .once("value", data => {
        //check to complete profile, if not, ask user to complete first
        if (!data.val().profileComplete) {
          let alert = this.alertCtrl.create({
            title: `Hi ${data.val().fullname}`,
            message:
              "Welcome to JomKelas application, now going to class much easier. Please complete your profile to continue using this application",
            buttons: [
              {
                text: "Later",
                role: "cancel",
                handler: () => {
                  this.deviceFeedback.acoustic();
    
                  console.log("Cancel clickedsdasd");
                }
              },
              {
                text: "Ok",
                handler: () => {
                  this.deviceFeedback.acoustic();
    
                  this.navCtrl.push("UpdateprofilePage", {
                    profile: data.val()
                  });
                }
              }
            ]
          });
          alert.present();
        } else {
          // console.log("profile complete");
        }
      });
  }

  goDetail(trip) {
    this.deviceFeedback.acoustic();
    this.navCtrl.push("TripdetailPage", { trip: trip });
  }

  offerride() {
    this.deviceFeedback.acoustic();
    this.navCtrl.push("OfferridePage");
  }

  notification(){
    this.deviceFeedback.acoustic();
    this.navCtrl.push('NotificationPage')
  }
  findride(){
    this.deviceFeedback.acoustic();
  }
}
