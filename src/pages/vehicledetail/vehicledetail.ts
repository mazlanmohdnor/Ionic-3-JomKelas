import { Car } from './../../model/car';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-vehicledetail',
  templateUrl: 'vehicledetail.html',
})
export class VehicledetailPage {
  car= {} as Car;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public fire: AngularFireAuth,
    public firebaseDB: AngularFireDatabase,
  ) {
    this.car=navParams.get('vehicledata')
  }
  ionViewDidLoad() {
    console.log(this.car.plate);
  }

  updatevehicle(plate) {
    this.fire.auth.onAuthStateChanged(auth => {
      this.firebaseDB.database.ref(`/userProfile/${auth.uid}/car/${plate}`)
        .update({
          type: this.car.type,
          brand: this.car.brand,
          model: this.car.model,
          plate: this.car.plate,
          color: this.car.color,
          seat: this.car.seat
        });
    })
  }


}
