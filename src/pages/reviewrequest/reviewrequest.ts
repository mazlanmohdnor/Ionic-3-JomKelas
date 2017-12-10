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
    let ref = this.firebaseDB.database.ref(
      `request/${this.fire.auth.currentUser.uid}/${this.requestsid}/`
    );

    ref.on("value", data => {
      //  console.log(data.val().seatBooked);
      this.requests = data.val();
    });
    //  console.log(this.requests);
  }

  approve(req) {
    // alert(req.seatBooked);
    
    //this will get the individual request
    // this.firebaseDB.database
    //   .ref(
    //     `request/${this.fire.auth.currentUser.uid}/${this.requestsid}/${
    //       req.pUid
    //     }`
    //   )
    //   .on("value", data => {
    //     //get how many seat that person booked
    //     this.seatBooked = data.val().seatBooked;
    //   });

    //this will get offer ride, and we need to update the seat
    this.firebaseDB.database
      .ref(`offerRides/${req.dId}-${req.rideid}`)
      .on("value", data => {
        //we need to set the seat, if the driver approve the passanger, and all seat are required, then we need to remove the rideoffered from dashbord
        console.log(data.val().seatOffered-req.seatBooked);
      });
// alert(this.seatBalance);
    //check seat
    // if (this.seatBalance == 0) {
      //update the seat and check wheater the seat is 0
    //   this.firebaseDB.database
    //     .ref(`offerRides/${this.fire.auth.currentUser.uid}-${req.rideid}`)
    //     .remove();
    // } else {
    //   //update the seat and check wheater the seat is 0
    //   this.firebaseDB.database
    //     .ref(`offerRides/${this.fire.auth.currentUser.uid}-${req.rideid}`)
    //     .update({ seatOffered: this.seatBalance })
    //     //then it will move this user to approvedPassanger node
    //     .then(() => {
    //       let approvedPassanger = this.firebaseDB.database.ref(
    //         `approvedPassanger/${req.dId}-${req.rideid}/${req.pUid}`
    //       );
    //       approvedPassanger.set(req);
    //     })
    //     //then delete approvedPassanger from current node
    //     .then(() => {
    //       let approvedPassanger = this.firebaseDB.database.ref(
    //         `request/${this.fire.auth.currentUser.uid}/${req.rideid}/${
    //           req.pUid
    //         }`
    //       );
    //       approvedPassanger.remove();
    //     })
    //     //then redirect to home(for now)
    //     .then(() => {
    //       this.navCtrl.setRoot("HomePage");
        // });
    // }
  }

  decline() {}

  whatsapp(num) {}
}
