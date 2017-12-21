import { AngularFireDatabase } from "angularfire2/database";
// import { Facebook } from "@ionic-native/facebook";
import { AngularFireAuth } from "angularfire2/auth";
import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController,
  LoadingController,
  ToastController,
  Events
} from "ionic-angular";
// import firebase from "firebase";
import { NativeStorage } from "@ionic-native/native-storage";

@IonicPage()
@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage {
  userProfile: any;
  matric: string;
  password: string;
  profile = {
    matric: this.matric,
    password: this.password
  };
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public fire: AngularFireAuth,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    // public fb: Facebook,
    public firebaseDB: AngularFireDatabase,
    public nativeStorage: NativeStorage,
    public event: Events
  ) {}



  // email and password login
  login() {
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    var email = this.profile.matric + "@student.upm.edu.my";
    this.fire.auth
      .signInWithEmailAndPassword(email, this.profile.password)
      .then(
        user => {
          //check whether email verified or Not
          if (user.emailVerified) {
            loader.dismiss();
            //user verified
            //update side menu
            this.firebaseDB.database
              .ref(`userProfile/${user.uid}`)
              .once("value", result => {
                this.event.publish("user:loggedIn", result.val());
                // this.navCtrl.setRoot("HomePage");
              });
          } else {
            loader.dismiss();
            this.navCtrl.setRoot("VerifymailPage");
          }
        },
        error => {
          loader.dismiss();
          let alert = this.alertCtrl.create({
            subTitle: error.message,
            buttons: ["OK"]
          });
          alert.present();
        }
      );
  }

  signup() {
    this.navCtrl.push("SignupPage");
  }

  forgotpassword() {
    this.navCtrl.push("ResetpwdPage");
  }
}
