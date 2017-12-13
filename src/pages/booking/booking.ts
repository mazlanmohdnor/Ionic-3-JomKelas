import { AngularFireDatabase } from 'angularfire2/database';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { OfferRideModel } from '../../model/offerridemodel';


@IonicPage()
@Component({
  selector: "page-booking",
  templateUrl: "booking.html"
})
export class BookingPage {
  isComplete: boolean = true;
  books = {} as OfferRideModel;
  segment = "book";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public firebaseDB: AngularFireDatabase,
    public fire: AngularFireAuth,
    private alertCtrl: AlertController
  ) {}
  ionViewWillLoad() {
    // this.fire.auth.onAuthStateChanged(user => {
    //   this.firebaseDB.database
    //     .ref(`userProfile/${user.uid}/trips`)
    //     .on("value", data => {
    //       this.trips = data.val();
    //     });
    // });
    this.updateBookList();
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
      title: "Delete book?",
      subTitle: `Are you sure to delete ${book.from} to ${
        book.destination
      } book?`,
      buttons: [
        {
          text: "Yes",
          handler: () => {
            this.fire.auth.onAuthStateChanged(user => {
              this.firebaseDB.database
                .ref(`userProfile/${user.uid}/bookcomplete/${book.key}`)
                .remove()
           
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

  ridecomplete(book) {
    console.log(book);
    //1st remove from list, and 2nd move to new node under userProfile/${user.uid}/bookcomplete
    this.fire.auth.onAuthStateChanged(user => {
      this.firebaseDB.database
        .ref(`userProfile/${user.uid}/books/${book.key}`)
        .remove()
        .then(() => {
          this.firebaseDB.database.ref(`offerRides/${book.key}`).remove();
        })
        //2nd move to new node under userProfile/${user.uid}/bookcomplete
        .then(() => {
          this.firebaseDB.database
            .ref(`userProfile/${user.uid}/bookcomplete/${book.key}`)
            .set(book);
        });
    });
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
            console.log(this.books);
          });
      });
    } else {
      this.isComplete = true;
      this.fire.auth.onAuthStateChanged(user => {
        this.firebaseDB.database
          .ref(`userProfile/${user.uid}/books`)
          .on("value", data => {
            this.books = data.val();
          });
      });
    }
    //kat sini kena listen to 2 variable, books dgn bookcomplete
    //activeride fetch from userProfile/${user.uid}/books
    //completedride fetch from userProfile/${user.uid}/bookcomplete
  }
}
