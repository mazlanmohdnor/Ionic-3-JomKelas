import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  user: any;

  constructor(public navCtrl: NavController, public navParams:NavParams) {
    this.user = this.navParams.get('user');
    // alert(JSON.stringify(this.user))
  }
  goDetail() {
    this.navCtrl.push('TripdetailPage')
  }

  offerride() {
    this.navCtrl.push('OfferridePage')
  }

}
