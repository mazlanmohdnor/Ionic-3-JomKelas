import { Car } from './../../model/car';
import { Observable } from 'rxjs/Observable';
import { Profile } from './../../model/profile';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  car: any;
  profile: Observable<Profile>;
  carArr: Car[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public auth: AuthProvider,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public fire: AngularFireAuth,
    public firebaseDB: AngularFireDatabase,

  ) {


  }

  ionViewDidLoad() {
    this.fire.authState.subscribe((user) => {
      this.profile = this.firebaseDB.object(`userProfile/${user.uid}`);

      this.firebaseDB.database.ref(`vehicle/${user.uid}`).on('value', (data) => {
        this.car = data.val();
      })
    })
  }


  updateprofile() {
    this.navCtrl.push('UpdateprofilePage');
  }

  logout() {
    let confirm = this.alertCtrl.create({
      message: 'Are you sure want to logout?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Logout',
          handler: () => {
            console.log('Agree clicked');
            this.fire.auth.signOut();

          }
        }
      ]
    });
    confirm.present();
  }

  addvehicle() {
    this.navCtrl.push('VehiclePage')
  }

  vehicledetail(car) {
        this.navCtrl.push('VehicledetailPage', { 'vehicledata': car})
  }  
}
