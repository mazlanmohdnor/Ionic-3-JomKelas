import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase } from "angularfire2/database";
import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController
} from "ionic-angular";
import { OfferRideModel } from "../../model/offerridemodel";

@IonicPage()
@Component({
  selector: "page-ride",
  templateUrl: "ride.html"
})
export class RidePage {
  rideid: any;
  isComplete: boolean = true;
  trips = {} as OfferRideModel;
  segment = "trips";
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public firebaseDB: AngularFireDatabase,
    public fire: AngularFireAuth,
    private alertCtrl: AlertController
  ) {}

  ionViewWillLoad() {
    // //approved passanger
    // this.fire.auth.onAuthStateChanged(user => {
    //   this.firebaseDB.database
    //     .ref(`approvedPassanger/`)
    //     .on("value", data => {
    //       this.trips = data.val();
    //     });
    // });
    this.updateRideList();
  }

  delete(trip) {
    let alert = this.alertCtrl.create({
      title: "Cancel Trip?",
      subTitle: `Are you sure to cancel ${trip.from} to ${
        trip.destination
      } trip?`,
      buttons: [
        {
          text: "Yes",
          handler: () => {
            this.fire.auth.onAuthStateChanged(user => {
              this.firebaseDB.database
                .ref(`userProfile/${user.uid}/trips/${trip.key}`)
                .remove();
              this.firebaseDB.database.ref(`offerRides/${trip.key}`).remove();
            });
          }
        },
        {
          text: "No",
          handler: () => {
            console.log("Disagree clicked");
          }
        }
      ]
    });
    alert.present();
  }

  deleteCompleted(trip) {
    let alert = this.alertCtrl.create({
      title: "Delete Trip?",
      subTitle: `Are you sure to delete ${trip.from} to ${
        trip.destination
      } trip?`,
      buttons: [
        {
          text: "No",
          handler: () => {
            console.log("Disagree clicked");
          }
        },
        {
          text: "Yes",
          handler: () => {
            this.fire.auth.onAuthStateChanged(user => {
              this.firebaseDB.database
                .ref(`userProfile/${user.uid}/tripcomplete/${trip.key}`)
                .remove()
                .then(_ => {
                  this.updateRideList();
                });
            });
          }
        }
      ]
    });
    alert.present();
  }

  ridecomplete(trip) {
    console.log('current trip',trip);
    let alert = this.alertCtrl.create({
      title: "Trip Completed?",
      buttons: [
        {
          text: "No",
          handler: () => {
            console.log("Disagree clicked");
          }
        },
        {
          text: "Yes",
          handler: () => {
            //1st remove from list, and 2nd move to new node under userProfile/${user.uid}/tripcomplete
            this.fire.auth.onAuthStateChanged(user => {
              this.firebaseDB.database
                .ref(`userProfile/${user.uid}/trips/${trip.key}`)
                .remove()
                .then(() => {
                  this.firebaseDB.database
                    .ref(`userProfile/${user.uid}`)
                    .update({
                      totalRideOffered: (trip.totalRideOffered+1)
                    });
                })
                .then(() => {
                  this.firebaseDB.database
                    .ref(`offerRides/${trip.key}`)
                    .remove();
                })
                //2nd move to new node under userProfile/${user.uid}/tripcomplete
                .then(() => {
                  this.firebaseDB.database
                    .ref(
                      `userProfile/${user.uid}/tripcomplete/${
                        trip.key
                      }`
                    )
                    .set(trip);
                })
                //then remove from approvedPassanger
                .then(() => {
                  this.firebaseDB.database
                    .ref(`ongoingRide/${trip.uid}/${trip.rideid}`)
                    .remove();
                })
                .then(() => {
                  this.navCtrl.setRoot("RidePage");
                });
            });
          }
        }
      ]
    });
    alert.present();
  }

  updateRideList() {
    //variable untuk hide button kat segment completedride
    if (this.segment == "tripcomplete") {
      this.isComplete = false;
      this.fire.auth.onAuthStateChanged(user => {
        this.firebaseDB.database
          .ref(`userProfile/${user.uid}/tripcomplete`)
          .on("value", data => {
            this.trips = data.val();
          });
      });
    } else {
      this.isComplete = true;
      this.fire.auth.onAuthStateChanged(user => {
        this.firebaseDB.database
          .ref(`userProfile/${user.uid}/trips`)
          .on("value", data => {
            this.trips = data.val();
          });
      });
     
    }
    //kat sini kena listen to 2 variable, trips dgn tripcomplete
    //activeride fetch from userProfile/${user.uid}/trips
    //completedride fetch from userProfile/${user.uid}/tripcomplete
  }

  detail(ride) {
    console.log(ride);
    this.navCtrl.push("ViewpassangerPage", {'ride':ride});
  }
}
