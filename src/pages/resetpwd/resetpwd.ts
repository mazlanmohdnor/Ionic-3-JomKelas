import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-resetpwd',
  templateUrl: 'resetpwd.html',
})
export class ResetpwdPage {
  email: string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public firebase: AngularFireAuth,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController
  ) {
  }

  reset() {
    let loader = this.loadingCtrl.create({
      content: "Sending reset link...",
    });
    loader.present();
    this.firebase.auth.sendPasswordResetEmail(this.email).then(() => {
      //success
      loader.dismiss();
      let alert = this.alertCtrl.create({
        title: 'Password Reset',
        subTitle: 'Please check your email',
        buttons: ['OK']
      });
      alert.present();
      this.navCtrl.pop();
    }).catch((error) => {
      console.log(error.message);
      let alert = this.alertCtrl.create({
        title: 'Try again',
        subTitle: error.message,
        buttons: ['OK']
      });
      alert.present();
      loader.dismiss();
      
    });
  }

}
