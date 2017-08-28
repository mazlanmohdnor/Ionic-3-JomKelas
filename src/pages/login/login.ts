import { AngularFireDatabase } from 'angularfire2/database';
import { Facebook } from '@ionic-native/facebook';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ToastController } from 'ionic-angular';
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  email: string;
  password: string;
  profile = {
    email: this.email,
    password:this.password  
  }
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public fire: AngularFireAuth,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public fb: Facebook,
    public firebaseDB:AngularFireDatabase
  ) {
    this.profile.email = this.navParams.get('email');
    this.profile.password = this.navParams.get('password');
  }

  // email and password login
  login() {
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
    });
    loader.present();
    this.fire.auth.signInWithEmailAndPassword(this.profile.email, this.profile.password).then(user => {
      //check whether email verified or Not
      if (user.emailVerified) {
        loader.dismiss();
        this.navCtrl.setRoot('HomePage')
      } else {
        loader.dismiss();
        let toast = this.toastCtrl.create({
          message: 'Please verify your email address.',
          showCloseButton:true
        });
        toast.present();
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
  }

  signup() {
    this.navCtrl.push('SignupPage');
  }

  //login with facebook
  fblogin() {
    return this.fb.login(['email']).then((response) => {
      let loader = this.loadingCtrl.create({
        content: "Please wait...",
      });
      loader.present();
      const fbCredential = firebase.auth.FacebookAuthProvider.credential(response.authResponse.accessToken);
      this.fire.auth.signInWithCredential(fbCredential).then((user) => {
        this.firebaseDB.database.ref(`userProfile/${user.uid}`).set({
          displayName: user.displayName,
          fullname: user.displayName,
          photoURL: user.photoURL,
          email: user.email,
          emailVerified:user.emailVerified,
          phoneNumber: 3434343,
          matricNumber: 9999
        });

        this.navCtrl.push('HomePage', {
          'user': user
        })
        loader.dismiss();
      })
    }).catch((error) => {
      alert(JSON.stringify(Error));
    });
  }

  forgotpassword() {
    this.navCtrl.push('ResetpwdPage');
  }
}
