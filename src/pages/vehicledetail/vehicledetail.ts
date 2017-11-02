import { Car } from './../../model/car';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';


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
    public alertCtrl: AlertController
  ) {
  }

  ionViewDidLoad() {
    this.car = this.navParams.get('vehicledata')
    
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
            this.firebaseDB.database.ref(`/userProfile/${this.fire.auth.currentUser.uid}/car/${this.car.plate}`)
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
              this.firebaseDB.database.ref(`/userProfile/${auth.uid}/car/${this.car.plate}`).remove().then(() => {
                this.navCtrl.setRoot('ProfilePage')
              })
            })
          }
        }
      ]
    });
    confirm.present();

  }


}
