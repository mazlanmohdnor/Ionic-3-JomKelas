import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-resetpwd',
  templateUrl: 'resetpwd.html',
})
export class ResetpwdPage {
  matric: number;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public firebase: AngularFireAuth,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public iab:InAppBrowser
  ) {
  }

  reset() {
    let loader = this.loadingCtrl.create({
      content: "Sending reset link...",
    });
    loader.present();
    var email = this.matric + '@student.upm.edu.my';
    this.firebase.auth.sendPasswordResetEmail(email).then(() => {
      //success
      loader.dismiss();
      let alert = this.alertCtrl.create({
        title: 'Password Reset',
        subTitle: 'Please check your email at ' + email,
        buttons: [
          {
            text: 'OK',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Check Email',
            handler: () => {
              let browser = open('http://mail.student.upm.edu.my/', "_self", "location=true");
              browser.addEventListener('exit', () => {
             
               
                    })
                }
          }
        ]

       
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
