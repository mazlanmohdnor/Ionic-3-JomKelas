import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { DeviceFeedback } from '@ionic-native/device-feedback';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Requestmodel } from '../../model/requestmodel';

@IonicPage()
@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage {
  // riderequest = {} as Requestmodel;
  riderequest:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public devfeb:DeviceFeedback,
    public firebaseDB: AngularFireDatabase,
    public fire: AngularFireAuth,
    
  ) {
  }

  ionViewDidLoad() {
    // this.firebaseDB.database.ref(`request/${this.fire.auth.currentUser.uid}`)
    // .once("value").then((data) => {
    //   data.forEach(childSnapshot => {
    //     console.log('childSnapshot.name(): ', childSnapshot.name());
    //   });
    //   // this.riderequest = data.val();
     
    //   // console.log(data.val());
    // });

   this.firebaseDB.list(`request/${this.fire.auth.currentUser.uid}`).map((data)=>{
// this.riderequest = data
     console.log(data);
   })
  }

  review(req){
    this.navCtrl.push('ReviewrequestPage',{ 'request':req})
  }

}
