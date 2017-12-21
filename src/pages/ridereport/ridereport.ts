import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';



@IonicPage()
@Component({
  selector: "page-ridereport",
  templateUrl: "ridereport.html"
})
export class RidereportPage {
  passanger: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    //get from viewpassanger.ts
    this.passanger = navParams.get("report");
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad RidereportPage", this.passanger);
  }
}
