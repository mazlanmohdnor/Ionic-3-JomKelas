import { AngularFireDatabase } from "angularfire2/database";
import { Profile } from "./../../model/profile";
import { AngularFireAuth } from "angularfire2/auth";
import { AuthProvider } from "./../../providers/auth/auth";
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
import { Storage } from "@ionic/storage";

@IonicPage()
@Component({
  selector: "page-signup",
  templateUrl: "signup.html"
})
export class SignupPage {
  profile = {} as Profile;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public authprovider: AuthProvider,
    public fire: AngularFireAuth,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public event: Events,
    public firebaseDB: AngularFireDatabase,
    public storage: Storage
  ) {}

  signup() {
    let loader = this.loadingCtrl.create({
      content: "Signing Up..."
    });
    loader.present();

    this.authprovider
      .signup(this.profile)
      .then(() => {
        this.fire.auth.currentUser.sendEmailVerification().then(() => {
          //login user
          var email = this.profile.matric + "@student.upm.edu.my";
          this.fire.auth
            .signInWithEmailAndPassword(email, this.profile.password)
            .then(
              user => {
                //check whether email verified or Not
                if (!user.emailVerified) {
                  loader.dismiss();
                  //email not verified, send to verifyemail page
                  this.navCtrl.setRoot("VerifymailPage");
                }
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
          loader.dismiss();
        });
      })
      .catch(error => {
        let alert = this.alertCtrl.create({
          subTitle: error.message,
          buttons: ["OK"]
        });
        alert.present();
        loader.dismiss();
      });
  }

  terms() {
    this.navCtrl.push("TermsPage");
  }
}
