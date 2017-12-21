import { DataProvider } from "./../../providers/data/data";
import { LocalNotifications } from "@ionic-native/local-notifications";
import { DeviceFeedback } from "@ionic-native/device-feedback";
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
import { Storage } from "@ionic/storage";
var cordova;
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
    public navCtrl: NavController,
    public navParams: NavParams,
    public fire: AngularFireAuth,
    public firebaseDB: AngularFireDatabase,
    private alertCtrl: AlertController,
    public event: Events,
    private deviceFeedback: DeviceFeedback,
    public storage: Storage,
    public data: DataProvider,
    private localNotification: LocalNotifications
  ) {}

  ionViewWillEnter() {
    this.fire.authState.subscribe(user => {
      if (user) {
        this.userid = user.uid;
      }
    });
    this.checkNoti();
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
    //check notification
    //this is notification for ride request
    this.firebaseDB.database.ref(`request/${this.userid}`).on("value", data => {
      // data.forEach(child=>{
      //    // key will be "ada" the first time and "alan" the second time
      // console.log('child.key: ', child.key);
      // // childData will be the actual contents of the child
      // console.log('child.val(): ', child.val());
      // })
      // //1st for is for getting the route id
      // console.log('dataval', data.val());
      // console.log(data.child(data.key).val());
      // for(var keys in data.val()){
      //   console.log("data key" + keys.length);
      //   // console.log("data value" +  data.val()[keys]);

      //   //2nd for is to get the array of
      //   for (const key in data.val()[keys]) {
      //     console.log("data key inner" + key.length);
      //   }
      //     let arr = Object.keys(data.val())
      //     console.log(arr);

      // }

      // let arr = Object.keys(data.val()).map(key => data.val()[key]);
      // console.log('test', arr);
      // this.noti = arr.length;
      if (data.val()) {
        if (data.numChildren() > 0) {
          this.noti = data.numChildren();

          //Inbox style
          this.localNotification.schedule({
            id: 1,
            title: "You got new request!",
            text: "Text"
            //  headsup: true,
            //  vibration: true,
            //  inbox: {
            //    lines: ["Line1", "Line2", "Line3"], //You can add as many lines as the notification allows
            //    summary: "2 More", //Optional summary line that shows at the bottom of the notification
            //    title: "3 Messages" //Optional title to replace the notification on expand
            //  }
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
        console.log(data.val());
        if (data.val()) {
          if (data.numChildren() > 0) {
            this.noti = data.numChildren();
            //Inbox style
            this.localNotification.schedule({
              id: 1,
              title: "Your booking is approved!",
              text: "Text"
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
