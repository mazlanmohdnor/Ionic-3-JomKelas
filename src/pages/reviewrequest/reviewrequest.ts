import { AngularFireDatabase } from "angularfire2/database";
import { AngularFireAuth } from "angularfire2/auth";
import { Requestmodel } from "./../../model/requestmodel";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

@IonicPage()
@Component({
  selector: "page-reviewrequest",
  templateUrl: "reviewrequest.html"
})
export class ReviewrequestPage {
  userId: any;
  seatBalance: any;
  seatBooked: any;
  requestsid: any;
  requests = {} as Requestmodel;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public firebaseDB: AngularFireDatabase,
    public fire: AngularFireAuth
  ) {
    //get from notification.ts
    this.requestsid = navParams.get("request");
  }

  ionViewDidLoad() {
    this.fire.auth.onAuthStateChanged(user => {
      let ref = this.firebaseDB.database.ref(
        `request/${user.uid}/${this.requestsid}/`
      );

      ref.once("value", data => {
        //  console.log(data.val().seatBooked);
        this.requests = data.val();
        this.userId = user.uid;
      });
      //  console.log(this.requests);
    });
  }

  approve(req) {
    //this will get offer ride, and we need to update the seat
    this.firebaseDB.database
      .ref(`offerRides/${req.dId}-${req.rideid}`)
      .once("value", data => {
        //we need to set the seat, if the driver approve the passanger, and all seat are required, then we need to remove the rideoffered from dashbord
        this.seatBalance = data.val().seatOffered - req.seatBooked;
      });
    //check seat
    if (this.seatBalance == 0) {
      // //update the seat and check wheater the seat is 0
      this.fire.auth.onAuthStateChanged(user => {
        this.firebaseDB.database
          //kalau 0, remove dari offerride, sbb dah penuh, not available
          .ref(`offerRides/${user.uid}-${req.rideid}`)
          .remove();
      });
      //then delete request tu
      this.fire.auth.onAuthStateChanged(user => {
        this.firebaseDB.database
          .ref(`request/${this.userId}/${req.rideid}/${req.pUid}`)
          .remove();
      });

      //then move the approved passanger to approvedPassanger
      this.firebaseDB.database
        .ref(`approvedPassanger/${req.dId}-${req.rideid}/${req.pUid}`)
        .set(req);
      // this.firebaseDB.database
      //   .ref(`userProfile/trips/${req.dId}-${req.rideid}/approved/${req.pUid}`)
      //   .set(req);

      //update ridestatus at userprofile/uid/mybooking/key/ridestatus to true
      this.firebaseDB.database
        .ref(`userProfile/${req.pUid}/mybooking/${req.rideid}/`)
        .update({ ridestatus: true });
      //then set ke home
      this.navCtrl.setRoot("HomePage");
      console.log("seat 0");
    } else {
      // //update the seat and check wheater the seat is 0
      this.fire.auth.onAuthStateChanged(user => {
        this.firebaseDB.database
          .ref(`offerRides/${user.uid}-${req.rideid}`)
          .update({ seatOffered: this.seatBalance })
          //then it will move this user to approvedPassanger node
          .then(() => {
            this.firebaseDB.database
              .ref(`approvedPassanger/${req.dId}-${req.rideid}/${req.pUid}`)
              .set(req);
        //     this.firebaseDB.database
        // .ref(`userProfile/${user.uid}/trips/${req.dId}-${req.rideid}/approved/${req.pUid}`)
        // .set(req);
          })
          //then delete approvedPassanger from current node
          .then(() => {
            this.firebaseDB.database
              .ref(`request/${user.uid}/${req.rideid}/${req.pUid}`)
              .remove();
          })
          //update ridestatus at userprofile/uid/mybooking/key/ridestatus to true
          .then(() => {
            console.log("passanger id ", req.pUId);
            this.firebaseDB.database
              .ref(`userProfile/${req.pUid}/mybooking/${req.rideid}/`)
              .update({ ridestatus: true });
          })
          //then redirect to home(for now)
          .then(() => {
            this.navCtrl.setRoot("HomePage");
          });
      });
      console.log("seat tak 0");
    }
  }

  decline(req) {
    //kalau driver decline the request, system akan update status (userProfile/uid/mybooking/tripid/ridestatus)
    console.log(req);
    this.fire.auth.onAuthStateChanged(user => {
      this.firebaseDB.database
        .ref(`userProfile/${user.uid}/mybooking/${req.rideid}`)
        .update({ ridestatus: false })
        //then it will move this user to declinedPassanger node
        .then(() => {
          this.firebaseDB.database
            .ref(`declinedPassanger/${req.dId}-${req.rideid}/${req.pUid}`)
            .set(req);
        })
        //then delete approvedPassanger from current node
        .then(() => {
          this.firebaseDB.database
            .ref(`request/${user.uid}/${req.rideid}/${req.pUid}`)
            .remove();
        })
        //then redirect to home(for now)
        .then(() => {
          this.navCtrl.setRoot("RidePage");
        });
    });
  }

  whatsapp(num) {}
}
