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
    // let permissions = new Array<string>();
    //the permissions your facebook app needs from the user
    // permissions = ["mail"];
    //   let loader = this.loadingCtrl.create({
      //     content: "Please wait...",
      //   });
      //   loader.present();
      //   const fbCredential = firebase.auth.FacebookAuthProvider.credential(response.authResponse.accessToken);
      //   this.fire.auth.signInWithCredential(fbCredential).then((user) => {
        //     this.firebaseDB.database.ref(`userProfile/${user.uid}`).set({
          //       displayName: user.displayName,
          //       fullname: user.displayName,
          //       photoURL: user.photoURL,
          //       email: user.email,
          //       emailVerified: user.emailVerified,
          //       phoneNumber: 3434343,
          //       matricNumber: 9999
          //     });
          this.fb.login(['email']).then((response) => {
          let userId = response.authResponse.userID;
          let params = new Array<string>();
        // Getting name and gender properties
          this.fb.api('/me?fields=name,gender', params)
            .then((user) => {
              //
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
