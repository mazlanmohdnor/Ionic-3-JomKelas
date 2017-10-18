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
  matric: string;
  password: string;
  phone: number;

  profile = {
    matric: this.matric,
    password: this.password,
    phone: this.phone
  }
 
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public authprovider: AuthProvider,
    public fire: AngularFireAuth,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController
  ) {

  }

  signup() {
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
    });
    loader.present();
    

    this.authprovider.signup(this.profile).then(() => {
      this.fire.auth.currentUser.sendEmailVerification().then(() => {
        // this.navCtrl.setRoot('LoginPage', { 'email': this.profile.email, 'password': this.profile.password })
        loader.dismiss();
        let alert = this.alertCtrl.create({
          title:'Congratulation!',
          subTitle: 'We have sent an email. Please check and verify your email.',
          buttons: ['OK']
        });
        alert.present();
      })
    }).catch(error => {
      let alert = this.alertCtrl.create({
        subTitle: error.message,
        buttons: ['OK']
      });
      alert.present();
      loader.dismiss();
   })
  }

  terms() {
    this.navCtrl.push('TermsPage')
  }

}
