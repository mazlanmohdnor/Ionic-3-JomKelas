import { Requestmodel } from './../../model/requestmodel';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-ratebooking',
  templateUrl: 'ratebooking.html',
})
export class RatebookingPage {
  book = {} as Requestmodel;
  rating: number;
  review: string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    // get data from booking.ts
    this.book = navParams.get("currentbook");
    
  }

  ionViewDidLoad() {
    // get data from booking.ts
    console.log('ionViewDidLoad RatebookingPage', this.book);
  }
  submit() {
    console.log('rating', this.rating, 'review', this.review);
  }

}
