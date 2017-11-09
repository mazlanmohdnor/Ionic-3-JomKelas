import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  trips: any;
  user: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public fire: AngularFireAuth,
    public firebaseDB: AngularFireDatabase,
  ) {
    this.user = this.navParams.get('user');
    // alert(JSON.stringify(this.user))
  }

  ionViewDidLoad() {
    this.firebaseDB.database.ref('offerRides/').on('value', (data) => {
      this.trips = data.val();
      console.log(this.trips);
    });
   
  }


  goDetail() {
    this.navCtrl.push('TripdetailPage')
  }

  offerride() {
    this.navCtrl.push('OfferridePage')
  }

}
