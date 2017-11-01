import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Car } from './../../model/car';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-vehicle',
  templateUrl: 'vehicle.html',
})
export class VehiclePage {
  car = {seat:1} as Car;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public fire: AngularFireAuth,
    public firebaseDB: AngularFireDatabase,
  ) {
  }

  ionViewDidLoad() {
    this.fire.authState.subscribe((user) => {
      this.firebaseDB.database.ref(`userProfile/${user.uid}/car`).on('value', (data) => {
        var cars = data.val();
      })
    })
  }

  savevehicle() {
    this.fire.authState.subscribe((user) => {
      this.firebaseDB.object(`/userProfile/${user.uid}/car/${this.car.plate}`)
        .set({
          uid:user.uid,
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
