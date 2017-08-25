import { AngularFireDatabase } from 'angularfire2/database';
import { Facebook } from '@ionic-native/facebook';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
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
    public loadingCtrl: LoadingController,
    public fb: Facebook,
    public firebaseDB:AngularFireDatabase
  ) {
    this.profile.email = this.navParams.get('email');
    this.profile.password = this.navParams.get('password');
  }

  login() {
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
    });
    loader.present();
    this.fire.auth.signInWithEmailAndPassword(this.profile.email, this.profile.password)
      .then(user => {
        //check whether email verified or Not
        if (user.emailVerified) {
          loader.dismiss();
          this.navCtrl.setRoot('HomePage')
        } else {
          loader.dismiss();
          
            let alert = this.alertCtrl.create({
              title: 'Try again',
              subTitle: 'Email verification has been sent. Please check your email',
              buttons: ['OK']
            });
            alert.present();
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

  fblogin() {
  
    return this.fb.login(['email']).then((response) => {
      let loader = this.loadingCtrl.create({
        content: "Please wait...",
      });
      loader.present();
      const fbCredential = firebase.auth.FacebookAuthProvider.credential(response.authResponse.accessToken);

      this.fire.auth.signInWithCredential(fbCredential).then((user) => {
        
        this.navCtrl.push('HomePage', { 'user': user })
        this.firebaseDB.object(`userProfile/${user.uid}`)
          .set({
            displayName: user.displayName,
            photoURL: user.photoURL,
            email: user.email
          });
        loader.dismiss();
       
          })
       
      }).catch((error) => {
        alert(JSON.stringify(Error));
      });

  }

}
