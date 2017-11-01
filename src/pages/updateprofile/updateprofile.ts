import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { Observable } from 'rxjs/Observable';
import { Profile } from './../../model/profile';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-updateprofile',
  templateUrl: 'updateprofile.html',
})
export class UpdateprofilePage {
  // profile: Observable<Profile>;
  // profile: FirebaseObjectObservable<Profile>;
  profile = {} as Profile;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public fire: AngularFireAuth,
    public firebaseDB: AngularFireDatabase,
    public fb: Facebook,

  ) {
  }

  ionViewDidLoad() {
    this.fire.authState.subscribe((user) => {
      this.firebaseDB.object(`userProfile/${user.uid}`).subscribe(result => {
        console.log(result);
        this.profile = result
      })
    })
  }

  //save to firebase
  saveprofile() {
    this.fire.authState.subscribe((user) => {
      this.firebaseDB.database.ref(`/userProfile/${user.uid}`)
        .update({
          fullname: this.profile.fullname,
          phoneNumber: this.profile.phoneNumber,
          bio: this.profile.bio,
          kolej: this.profile.kolej,
          gender: this.profile.gender

        });
    })
  }


  //login with facebook
  fblogin() {

    this.fb.login(['email', 'public_profile']).then((response: FacebookLoginResponse) => {
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

}
