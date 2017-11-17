import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from "angularfire2/auth";
import { InAppBrowser } from "@ionic-native/in-app-browser";
import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController,
  LoadingController,
  Events
} from "ionic-angular";

@IonicPage()
@Component({
  selector: "page-verifymail",
  templateUrl: "verifymail.html"
})
export class VerifymailPage {
  matric: any;
  phone: string;
  photoURL: string;
  email: string;
  displayName: string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public iab: InAppBrowser,
    public firebase: AngularFireAuth,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public firebaseDB: AngularFireDatabase,
    public event: Events
    
  ) {
    this.matric = this.firebase.auth.currentUser.email;
  }

  // navigate to upm email login page
  navigateEmail() {
    let browser = open(
      "http://mail.student.upm.edu.my/",
      "_self",
      "location=true"
    );
    let loader = this.loadingCtrl.create({
      content: "Validating..."
    });
    browser.addEventListener("exit", () => {
      loader.present();
      this.firebase.auth.onAuthStateChanged(user => {
        //if user x logged in, set page ke login
        user.reload().then(() => {
          if (this.firebase.auth.currentUser.emailVerified) {
            //email verified, send user to homepage
             //update side menu
             this.firebaseDB.database
             .ref(`userProfile/${user.uid}`)
             .once("value", result => {
               this.event.publish("user:loggedIn", result.val());
             });
            this.navCtrl.setRoot("HomePage").then(() => loader.dismiss());
          } else {
            this.navCtrl.setRoot("VerifymailPage").then(() => loader.dismiss());
          }
        });
      });
    });
  }

  //resend verification email
  resendEmail() {
    let loader = this.loadingCtrl.create({
      content: "Re-sending Email..."
    });
    loader.present();
    var email = this.matric;
    this.firebase.auth.currentUser.sendEmailVerification().then(
      () => {
        //success
        let alert = this.alertCtrl.create({
          title: "Email sent",
          subTitle: "Please check your email at " + email,
          buttons: [
            {
              text: "OK",
              role: "cancel",
              handler: () => {
                console.log("Cancel clicked");
              }
            },
            {
              text: "Check Email",
              handler: () => {
                this.navigateEmail();
              }
            }
          ]
        });
        loader.dismiss();
        alert.present();
      },
      error => {
        loader.dismiss();
        let alert = this.alertCtrl.create({
          title: "Try again",
          subTitle: error.message,
          buttons: ["OK"]
        });
        alert.present();
      }
    );
  }

  home() {
    this.navCtrl.setRoot("HomePage");
    this.firebaseDB.database
    .ref(`userProfile/${this.firebase.auth.currentUser.uid}`)
    .once("value", result => {
    this.event.publish("user:loggedIn", result.val());
    })
  }
}
