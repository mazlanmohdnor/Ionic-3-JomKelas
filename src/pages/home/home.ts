import { DataProvider } from "./../../providers/data/data";
// import { LocalNotifications } from "@ionic-native/local-notifications";
import { DeviceFeedback } from "@ionic-native/device-feedback";
import { AngularFireDatabase } from "angularfire2/database";
import { AngularFireAuth } from "angularfire2/auth";
import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController,
  Events,
  Platform
} from "ionic-angular";
import { Profile } from "../../model/profile";
import { Storage } from "@ionic/storage";
declare var cordova;
@IonicPage()
@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  userid: any;
  noti: number = 0;
  trips: any;
  user = {} as Profile;
  toggleSearch: boolean = false;
  notificationAlreadyReceived = false;
  searchTerm: string = "";
  isWomen = false;
  isCar = false;
  constructor(
    public platform: Platform,
    public navCtrl: NavController,
    public navParams: NavParams,
    public fire: AngularFireAuth,
    public firebaseDB: AngularFireDatabase,
    private alertCtrl: AlertController,
    public event: Events,
    private deviceFeedback: DeviceFeedback,
    public storage: Storage,
    public data: DataProvider
  ) // private localNotification: LocalNotifications
  {
  }

  ionViewWillEnter() {
    this.fire.authState.subscribe(user => {
      if (user) {
        this.userid = user.uid;
      }
    });
    this.platform.ready().then(() => {
      this.checkNoti();
    })  
    //check whether user had open the app, if not, set walkthrough

    // this.storage.get("profileComplete").then(data => {
    //   if (!data) {
    //     // alert('!data');
    //      let alert = this.alertCtrl.create({
    //       //  title: `Hi ${data.val().fullname}`,
    //        message:
    //          "Welcome to JomKelas application, now going to class much easier. Please complete your profile to continue using this application",
    //        buttons: [
    //          {
    //            text: "Later",
    //            role: "cancel",
    //            handler: () => {
    //              this.deviceFeedback.acoustic();
    //              console.log("Cancel clickedsdasd");
    //            }
    //          },
    //          {
    //            text: "Ok",
    //            handler: () => {
    //              this.deviceFeedback.acoustic();
    //              this.navCtrl.push("UpdateprofilePage", {
    //                profile: data.val()
    //              });
    //            }
    //          }
    //        ]
    //      });
    //      alert.present();
    //   } else {
    //     alert('data')
    //   }
    // });

    this.firebaseDB.database.ref("offerRides/").on("value", data => {
      // console.log(data);
      if (data) {
        this.trips = data.val();
      } else {
        console.log("xde trip");
      }
    });
  }
  setFilteredItems() {
    // console.log(this.isCar);
    // console.log(this.isWomen);
    // console.log(this.searchTerm);
    this.trips = this.data.filterItems(this.searchTerm);
    // console.log(this.trips);
    // this.firebaseDB.database.ref("offerRides/").on("value", data => {
    //   let trips = data.val();
    //   trips.filter((item) => {
    //     console.log(item);
    //   })
    // });
  }

  checkNoti() {
    //this is notification for ride request
    this.firebaseDB.database.ref(`request/${this.userid}`).on("value", data => {
      console.log('data',data.val());
      if (data.val()) {
        if (data.numChildren() > 0) {
          this.noti = data.numChildren();

          //Inbox style
          cordova.plugins.notification.local.schedule({
            id: 1,
            title: "You got new request!",
            text: "Text",
            headsup: true,
            foreground: true,
            icon: 'http://3.bp.blogspot.com/-Qdsy-GpempY/UU_BN9LTqSI/AAAAAAAAAMA/LkwLW2yNBJ4/s1600/supersu.png',
            vibration: true
          });
        }
        console.log("ada");
      } else {
        console.log("no noti");
      }
    });

    //this is notification for booking
    // this.firebaseDB.database.ref(`approvedPassanger/${this.userid}`).on("value", data => {
    this.firebaseDB.database
      .ref(`approvedPassanger/${this.userid}`)
      .on("value", data => {
        if (data.val()) {
          if (data.numChildren() > 0) {
            this.noti = data.numChildren();
            //Inbox style
            cordova.plugins.notification.local.schedule({
              id: 1,
              title: "Your booking is approved!",
              text: "Text",
              headsup: true,
              foreground: true,
              vibration: true,
              icon:"http://3.bp.blogspot.com/-Qdsy-GpempY/UU_BN9LTqSI/AAAAAAAAAMA/LkwLW2yNBJ4/s1600/supersu.png"
            });
          }
          console.log("ada booking");
        } else {
          console.log("xde booking");
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

  notification() {
    this.deviceFeedback.acoustic();
    this.navCtrl.push("NotificationPage");
  }
  findride() {
    this.deviceFeedback.acoustic();
    this.navCtrl.push("FindridePage");
  }

  toggle() {
    this.toggleSearch = !this.toggleSearch;
    console.log(this.toggleSearch);
    this.trips = this.data.filterWomen(this.toggleSearch);
  }
}
