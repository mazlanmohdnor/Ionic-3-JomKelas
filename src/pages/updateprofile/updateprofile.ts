import { Camera, CameraOptions } from '@ionic-native/camera';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { Observable } from 'rxjs/Observable';
import { Profile } from './../../model/profile';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import firebase from 'firebase';



@IonicPage()
@Component({
  selector: 'page-updateprofile',
  templateUrl: 'updateprofile.html',
})
export class UpdateprofilePage {
  mypicref: firebase.storage.Reference;
  base64Image: string;
  // profile: Observable<Profile>;
  // profile: FirebaseObjectObservable<Profile>;
  profile = {} as Profile;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public fire: AngularFireAuth,
    public firebaseDB: AngularFireDatabase,
    public fb: Facebook,
    public actionSheetCtrl: ActionSheetController,
    private camera: Camera,

  ) {

    //create storage ref
    // this.mypicref = firebase.storage().ref('/')
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

  cameraOption() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Choose below',
      buttons: [
        {
          text: 'Camera',
          icon: 'camera',
          handler: () => {
            this.opencamera();
            console.log('Destructive clicked');
          }
        }, {
          text: 'Gallery',
          icon: 'photos',
          handler: () => {
            console.log('Archive clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }


  opencamera() {
   
     
    //defining camera cameraOption
    const options: CameraOptions = {
      quality: 50,
      targetHeight: 600,
      targetWidth: 600,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      allowEdit:true
    }

    this.camera.getPicture(options).then(imgdata => {
      // Send the picture to Firebase Storage
      // const image = `data:image/jpeg;based64,${imgdata}`;

      const pictures = firebase.storage().ref(this.fire.auth.currentUser.uid);

      pictures.child(`profilepic/${this.fire.auth.currentUser.uid}-avatar.png`).putString(imgdata, 'base64',{contentType:'image/png'})
        .then(savedProfilePicture => {
          this.fire.auth.onAuthStateChanged(auth => {
            this.firebaseDB.database.ref(`/userProfile/${auth.uid}`)
              .update({
                photoURL: savedProfilePicture.downloadURL,
              });
          })
        }, error => {
          // Log an error to the console if something goes wrong.
          console.log("ERROR -> " + JSON.stringify(error));
        });
     

    

   

    })
  }
}
  
