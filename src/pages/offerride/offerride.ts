import { College } from './../../model/college';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatePicker } from '@ionic-native/date-picker';

@IonicPage()
@Component({
  selector: 'page-offerride',
  templateUrl: 'offerride.html',
})
export class OfferridePage {
  colleges = {} as College;
  time: string;
  date: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private datePicker: DatePicker,
    public fire: AngularFireAuth,
    public firebaseDB: AngularFireDatabase,
  ) {
  }

  ionViewDidLoad() {
  
    this.firebaseDB.database.ref('college').on('value', (data) => {
      this.colleges = data.val();
      });
   
  }

  
  collegeSelected(event) {
    console.log(event);
  }


  datepicker() {
    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT
    }).then(
      date => {
        console.log('Got date: ', date)
        this.date = date.toDateString();
      } ,
      err => console.log('Error occurred while getting date: ', err)
      );
  }

  timepicker() {
    this.datePicker.show({
      date: new Date(),
      mode: 'time',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT
    }).then(
      time => {
        console.log('Got date: ', time)
        this.time = time.toLocaleTimeString();
      },
      err => console.log('Error occurred while getting date: ', err)
      );
  }


}
