import { AngularFireDatabase } from "angularfire2/database";
import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController
} from "ionic-angular";
import { AngularFireAuth } from "angularfire2/auth";
import { OfferRideModel } from "../../model/offerridemodel";
import { Requestmodel } from "../../model/requestmodel";

@IonicPage()
@Component({
  selector: "page-booking",
  templateUrl: "booking.html"
})
export class BookingPage {
  isComplete: boolean = true;
  isApproved:boolean = false;
  books = {} as Requestmodel;
  segment = "book";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public firebaseDB: AngularFireDatabase,
    public fire: AngularFireAuth,
    private alertCtrl: AlertController
  ) {}
  ionViewWillLoad() {
    this.updateBookList();
    //get data from ratebooking, after set completed
    this.isComplete = this.navParams.get("isComplete");
    // this.fire.auth.onAuthStateChanged(user => {
    //   this.firebaseDB.database
    //     .ref(`userProfile/${user.uid}/mybooking/`)
    //     .on('value', (data) => {
    //       console.log(data.val());
    //     })
    // });
  }

  delete(book) {
    let alert = this.alertCtrl.create({
      title: "Cancel book?",
      subTitle: `Are you sure to cancel ${book.from} to ${
        book.destination
      } book?`,
      buttons: [
        {
          text: "Yes",
          handler: () => {
            this.fire.auth.onAuthStateChanged(user => {
              this.firebaseDB.database
                .ref(`userProfile/${user.uid}/books/${book.key}`)
                .remove();
              this.firebaseDB.database.ref(`offerRides/${book.key}`).remove();
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

  deleteCompleted(book) {
    let alert = this.alertCtrl.create({
      title: "Delete Record?",
      subTitle: `Are you sure to delete ${book.from} to ${
        book.destination
      } history?`,
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
                .ref(`userProfile/${user.uid}/bookcomplete/${book.key}`)
                .remove();
            });
          }
        }
      ]
    });
    alert.present();
  }

  ridecomplete(book) {
    console.log(book);
    this.navCtrl.push("RatebookingPage", { currentbook: book });
  }

  updateBookList() {
    //variable untuk hide button kat segment completedride
    if (this.segment == "book") {
      this.isComplete = false;
      this.fire.auth.onAuthStateChanged(user => {
        this.firebaseDB.database
          .ref(`userProfile/${user.uid}/mybooking/`)
          .on("value", data => {
            this.books = data.val();
            console.log(data.val());
          });
      });
    } else {
      this.isComplete = true;
      this.fire.auth.onAuthStateChanged(user => {
        this.firebaseDB.database
          .ref(`userProfile/${user.uid}/bookcomplete`)
          .on("value", data => {
            if (data) {
              this.books = data.val();
            } else {
              console.log('no data der');
            }
          });
      });
    }
    //kat sini kena listen to 2 variable, books dgn bookcomplete
    //activeride fetch from userProfile/${user.uid}/books
    //completedride fetch from userProfile/${user.uid}/bookcomplete
  }
}
