import { Camera, CameraOptions } from '@ionic-native/camera';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Car } from './../../model/car';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ActionSheetController, LoadingController } from 'ionic-angular';
import firebase from 'firebase';
@IonicPage()
@Component({
  selector: 'page-vehicle',
  templateUrl: 'vehicle.html',
})
export class VehiclePage {
  car = {
    seat: 1,
    photoURL:"assets/no-vehicle.png"
} as Car;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public fire: AngularFireAuth,
    public firebaseDB: AngularFireDatabase,
    public alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController,
    private camera: Camera,
    public loadingCtrl: LoadingController

  ) {
    this.car.plate=this.navParams.get('plate')
  }

  // ionViewDidLoad() {
  //   this.fire.authState.subscribe((user) => {
  //     this.firebaseDB.database.ref(`userProfile/${user.uid}/car`).on('value', (data) => {
  //       var cars = data.val();
  //     })
  //   })
  // }

  savevehicle() {
    let confirm = this.alertCtrl.create({
      title: `Add ${this.car.plate}`,
      // message: 'Do you agree to use this lightsaber to do good across the intergalactic galaxy?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Ok',
          handler: () => {
            this.fire.auth.onAuthStateChanged((user) => {
              this.firebaseDB.object(`/vehicle/${user.uid}/${this.car.plate}`)
                .set({
                  uid: user.uid,
                  type: this.car.type,
                  brand: this.car.brand,
                  model: this.car.model,
                  plate: this.car.plate,
                  color: this.car.color,
                  seat: this.car.seat,
                  photoURL:this.car.photoURL
                });
            })
            this.navCtrl.setRoot('ProfilePage')
          
          }
        }
      ]
    });
    confirm.present();



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

          }
        }, {
          text: 'Gallery',
          icon: 'photos',
          handler: () => {
            this.opengallery();

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
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      allowEdit: true
    }

    this.camerafunction(options);

  }

  opengallery() {
    //defining camera cameraOption
    const options: CameraOptions = {
      quality: 50,
      targetHeight: 600,
      targetWidth: 600,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      // encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE,
      // correctOrientation: true,
      allowEdit: true
    }

    this.camerafunction(options);

  }

  //main camera
  camerafunction(options) {
    this.camera.getPicture(options).then(imgdata => {
      // Send the picture to Firebase Storage
      let loading = this.loadingCtrl.create({
        content: 'Uploading...'
      });

      loading.present();
      const pictures = firebase.storage().ref(this.fire.auth.currentUser.uid);

      pictures.child(`vehiclePic/${this.car.plate}/${this.car.plate}.jpg`).putString(imgdata, 'base64', { contentType: 'image/jpeg' })
        .then(savedPVehiclePicture => {
          this.car.photoURL=savedPVehiclePicture.downloadURL;
          //update database
          this.fire.auth.onAuthStateChanged(auth => {

            this.firebaseDB.database.ref(`/vehicle/${auth.uid}/${this.car.plate}`)
              .update({
                photoURL: savedPVehiclePicture.downloadURL,
              }).then(_ => loading.dismiss());
          })

        }, error => {
          // Log an error to the console if something goes wrong.
          console.log("ERROR -> " + JSON.stringify(error));
        });
    })
  }

  
}
