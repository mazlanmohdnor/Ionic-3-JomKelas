import { AngularFireAuth } from 'angularfire2/auth';
import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  password: string;
  email: string;
  phone: any;
  matric: number;
  profile = {
    email: this.email,
    password: this.password,
    phone: this.phone,
    matric: this.matric,
  }
  constructor(public navCtrl: NavController, public navParams: NavParams, public authprovider: AuthProvider, public fire: AngularFireAuth, public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
  }

  signup() {
    this.authprovider.signup(this.profile).then(() => {
      let loader = this.loadingCtrl.create({
        content: "Please wait...",
      });
      loader.present();
      this.fire.auth.currentUser.sendEmailVerification().then(() => {
        loader.dismiss();
        let alert = this.alertCtrl.create({
          subTitle: 'Email verification has been sent. Please check your email',
          buttons: ['OK']
        });
        alert.present();
        this.navCtrl.push('LoginPage', {'email': this.profile.email, 'password':this.profile.password})
      })
   })
  }

}
