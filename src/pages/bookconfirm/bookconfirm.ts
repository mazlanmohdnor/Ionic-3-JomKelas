import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import { OfferRideModel } from '../../model/offerridemodel';


@IonicPage()
@Component({
  selector: 'page-bookconfirm',
  templateUrl: 'bookconfirm.html',
})
export class BookconfirmPage {
  offerride: any;
  profile: any;
  trip = {} as OfferRideModel;


  btnInc: boolean=false;
  currentNumber: number = 0;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public fire: AngularFireAuth,
    public firebaseDB: AngularFireDatabase,
  ) {
    this.trip = navParams.get('trip');
  }

  ionViewDidLoad() {
        //fetch this trip
        this.firebaseDB.database.ref('offerRides').on("value", data => {
          console.log(data.val().key);
        });

        //save user and vehicle information
        // this.fire.auth.onAuthStateChanged(user => {
        //   this.firebaseDB.database
        //     .ref(`userProfile/${user.uid}`)
        //     .on("value", data => {
        //       this.profile = data.val();
        //       // set user object + %rate to offerride object
        //       this.offerride.uid = user.uid;
        //       this.offerride.name = data.val().fullname;
        //       this.offerride.userPhotoURL = data.val().photoURL;
        //       this.offerride.rate = data.val().rate / 100 * 5;
        //       this.offerride.phone = data.val().phoneNumber;
        //       this.offerride.gender = data.val().gender;
        //     });
        // });
  }



  private increment () {
    this.currentNumber++;
    if (this.currentNumber==this.trip.seatOffered) {
      this.btnInc = true;
    }
  }
  
  private decrement () {
    if(this.currentNumber > 0) {
      this.currentNumber--;
      this.btnInc = false;
    }
  }

  cancel(){
    this.viewCtrl.dismiss();
  }

  confirm(){

  }
   

}
