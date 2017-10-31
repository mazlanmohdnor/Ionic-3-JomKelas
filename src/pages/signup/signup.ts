import { AngularFireDatabase } from 'angularfire2/database';
import { Profile } from './../../model/profile';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ToastController, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
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
    public storage: Storage,


  ) {

  }

  signup() {
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
    });
    loader.present();
    

    this.authprovider.signup(this.profile).then(() => {
      this.fire.auth.currentUser.sendEmailVerification().then(() => {
      
        //login user
        var email = this.profile.matric + '@student.upm.edu.my';
        this.fire.auth.signInWithEmailAndPassword(email, this.profile.password).then(user => {
    // console.log(user);
          //check whether email verified or Not
          if (user.emailVerified) {
            loader.dismiss();
            //save profile object to localstorage
            this.storage.set(this.profile.email, this.profile);

            this.navCtrl.setRoot('HomePage')
          } else {
            loader.dismiss();
              this.navCtrl.setRoot('VerifymailPage', { 'profile': this.profile.matric })
          }
        }, (error) => {
          loader.dismiss();
          let alert = this.alertCtrl.create({
            title: 'Try again',
            subTitle: error.message,
            buttons: ['OK']
          });
          alert.present();
          })
        loader.dismiss();
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
