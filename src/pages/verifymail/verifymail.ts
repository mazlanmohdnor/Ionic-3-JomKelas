import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-verifymail',
  templateUrl: 'verifymail.html',
})
export class VerifymailPage {
  matric: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public iab: InAppBrowser

  ) {
  }

  ionViewDidLoad() {
    this.matric = this.navParams.get('profile');
    // console.log(this.profile.matric);
  }

  navigateEmail() {
    console.log("test");
    this.iab.create('http://mail.student.upm.edu.my/','_system');
  }

  home() {
    this.navCtrl.setRoot('HomePage');
  }

}
