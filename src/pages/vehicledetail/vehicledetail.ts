import { Camera, CameraOptions } from '@ionic-native/camera';
import { Car } from './../../model/car';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ActionSheetController, LoadingController } from 'ionic-angular';
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-vehicledetail',
  templateUrl: 'vehicledetail.html',
})
export class VehicledetailPage {
  car = {} as Car;

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
  }

  ionViewDidLoad() {
    this.car = this.navParams.get('vehicledata')
    this.fire.authState.subscribe((user) => {
      this.firebaseDB.object(`vehicle/${user.uid}/${this.car.plate}`).subscribe(result => {
        console.log(result);
        this.car = result
      })
    })
    
  }

  updateveh() {
     
   
    let confirm = this.alertCtrl.create({
      title: 'Save changes?',
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
            this.firebaseDB.database.ref(`/vehicle/${this.fire.auth.currentUser.uid}/${this.car.plate}`)
              .update({
                type: this.car.type,
                brand: this.car.brand,
                model: this.car.model,
                plate: this.car.plate,
                color: this.car.color,
                seat: this.car.seat
              }).then(_=>this.navCtrl.pop())
          }
        }  
      ]
    });
    confirm.present();
   
    
  }

  removevehicle() {
    let confirm = this.alertCtrl.create({
      title: 'Confirm to delete?',
      message: `Delete ${this.car.plate}`,
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Agree',
          handler: () => {
            this.fire.auth.onAuthStateChanged(auth => {
              const pictures = firebase.storage().ref(this.fire.auth.currentUser.uid);

              pictures.child(`vehiclePic/${this.car.plate}/${this.car.plate}.jpg`).delete().then(() => {
                this.firebaseDB.database.ref(`/vehicle/${auth.uid}/${this.car.plate}`).remove().then(() => {
                  this.navCtrl.setRoot('ProfilePage')
                })
              })
            })
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
        }, {
          text: 'Remove avatar',
          icon: 'trash',
          handler: () => {
            this.deleteAvatar();

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
          this.car.photoURL = savedPVehiclePicture.downloadURL;
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

  deleteAvatar() {
    let loading = this.loadingCtrl.create({
      content: 'Deleting...'
    });

    loading.present();
    const pictures = firebase.storage().ref(`${this.fire.auth.currentUser.uid}/vehiclePic/${this.car.plate}/${this.car.plate}.jpg`);
    console.log(pictures.getDownloadURL);
    pictures.getDownloadURL().then(() => {
      pictures.delete().then(() => {

        this.fire.auth.onAuthStateChanged(auth => {

          this.firebaseDB.database.ref(`/vehicle/${auth.uid}/${this.car.plate}`)
            .update({
              photoURL: "assets/no-vehicle.png",
            }).then(_ => loading.dismiss());
        })
      })
    }, (err) => {
      loading.dismiss()
      let alert = this.alertCtrl.create({
        // title: 'No profile picture.',
        subTitle: 'No vehicle picture.',
        buttons: ['OK']
      });
      alert.present();
    })


  }
}
