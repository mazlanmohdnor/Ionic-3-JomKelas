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
  ) {
  }

  ionViewDidLoad() {
    this.fire.authState.subscribe((user) => {
      this.firebaseDB.object(`userProfile/${user.uid}`).subscribe(result => {
        console.log(result);
        this.profile = result
      })
      // .once('value').then(snapshot => {
      // this.profile = snapshot;
      // console.log(this.profile);
      // // alert(JSON.stringify(this.profile));
      // this.profile.email = snapshot.email;
      // this.profile.fullname = snapshot.fullname;
      // this.profile.phoneNumber = snapshot.phoneNumber;
      // });
    })
  }

  //save to firebase
  saveprofile() {
    this.fire.authState.subscribe((user) => {
      this.firebaseDB.database.ref(`/userProfile/${user.uid}`)
        .update({
          fullname: this.profile.fullname,
          // photoURL: "https://graph.facebook.com/" + userId + "/picture?type=large",
          phoneNumber: this.profile.phoneNumber,
          bio: this.profile.bio,
          kolej:this.profile.kolej

        });
    })
  }

}
