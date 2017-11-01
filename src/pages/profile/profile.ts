import { Observable } from 'rxjs/Observable';
import { Profile } from './../../model/profile';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Facebook } from '@ionic-native/facebook';
import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  profile: Observable<Profile>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public auth: AuthProvider,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public fb: Facebook,
    public fire: AngularFireAuth,
    public firebaseDB: AngularFireDatabase,

  ) {


  }

  ionViewDidLoad() {
    this.fire.authState.subscribe((user) => {
      this.profile = this.firebaseDB.object(`userProfile/${user.uid}`);
    })
  }


  //login with facebook
  fblogin() {

    this.fb.login(['email', 'public_profile']).then((response) => {
      let userId = response.authResponse.userID;

      // Getting name and gender properties
      this.fb.api('me?fields=id,name', [])
        .then((user) => {
          //
          // this.userData = { email: profile['email'], first_name: profile['first_name'], picture: profile['picture_large']['data']['url'], username: profile['name'] }
          //now we have the users info, let's save it in the firebase
          this.fire.auth.onAuthStateChanged(auth => {
            this.firebaseDB.database.ref(`/userProfile/${auth.uid}`)
              .update({
                fullname: user.name,
                photoURL: "https://graph.facebook.com/" + userId + "/picture?type=large",

              });
          })

        })
    })
  }

  updateprofile() {
    this.navCtrl.push('UpdateprofilePage');
  }

  logout() {
    let confirm = this.alertCtrl.create({
      message: 'Are you sure want to logout?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Logout',
          handler: () => {
            console.log('Agree clicked');
            this.fire.auth.signOut();

          }
        }
      ]
    });
    confirm.present();
  }

}
