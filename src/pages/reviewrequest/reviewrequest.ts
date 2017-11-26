import { LocalNotifications } from '@ionic-native/local-notifications';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Requestmodel } from './../../model/requestmodel';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-reviewrequest',
  templateUrl: 'reviewrequest.html',
})
export class ReviewrequestPage {
  requestsid: any;
  requests = {} as Requestmodel;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public firebaseDB: AngularFireDatabase,
    public fire: AngularFireAuth,
    private localNotifications: LocalNotifications
  ) {
    //get from notification.ts
    this.requestsid = navParams.get('request')
  }

  ionViewDidLoad() {
    let ref = this.firebaseDB.database.ref().child(`request/${this.fire.auth.currentUser.uid}/${this.requestsid}`);
    
    ref.on("value", data => {
       console.log(data.val());
       this.requests = data.val();
    })
       
  }

  testnoti(){
    // Schedule a single notification
this.localNotifications.schedule({
  id: 1,
  title: 'test Notification',
  text: 'Single ILocalNotification',
});

  }

}
