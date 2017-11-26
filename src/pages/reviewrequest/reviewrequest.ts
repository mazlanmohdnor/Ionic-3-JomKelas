import { Requestmodel } from './../../model/requestmodel';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-reviewrequest',
  templateUrl: 'reviewrequest.html',
})
export class ReviewrequestPage {
  request = {} as Requestmodel;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams
  ) {
    //get from notification.ts
    this.request = navParams.get('request')
  }

  ionViewDidLoad() {
    console.log(this.request);
  }

}
