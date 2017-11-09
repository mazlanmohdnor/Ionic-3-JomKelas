import { Car } from './../../model/car';
import { OfferRideModel } from './../../model/offerridemodel';
import { Classes } from './../../model/classes';
import { College } from './../../model/college';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Keyboard } from 'ionic-angular';
import { DatePicker } from '@ionic-native/date-picker';

@IonicPage()
@Component({
  selector: 'page-offerride',
  templateUrl: 'offerride.html',
})
export class OfferridePage {
  offerride = {} as OfferRideModel;
  
  destinationData: any;
  fromData: any;
  
  classes = {} as Classes;
  colleges = {} as College;
  vehicles = {} as Car;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private datePicker: DatePicker,
    public fire: AngularFireAuth,
    public firebaseDB: AngularFireDatabase,
    public keyboard: Keyboard
  ) {
   
  }

  ionViewDidLoad() {
    
    this.firebaseDB.database.ref('college').on('value', (data) => {
      this.colleges = data.val();
      });
   
    this.firebaseDB.database.ref('class').on('value', (data) => {
      this.classes = data.val();
    });

    this.fire.auth.onAuthStateChanged((user) => {
      this.firebaseDB.database.ref(`vehicle/${user.uid}`).on('value', (data) => {
        this.vehicles = data.val();
      });
    })  
  }



  destinationSelected(event) {
    if (event ==='collegeToClass') {
      this.destinationFromFunction('college');
      this.destinationToFuntion('class');
    } else if (event === 'classToCollege') {
      this.destinationFromFunction('class');
      this.destinationToFuntion('college');
    }else if (event === 'collegeToCollege') {
      this.destinationFromFunction('college');
      this.destinationToFuntion('college');
    } else if (event === 'classToClass') {
      this.destinationFromFunction('class');
      this.destinationToFuntion('class');
    }
  }
  
  destinationFromFunction(from: string) {
    this.firebaseDB.database.ref(from).on('value', (data) => {
      this.fromData = data.val();
      console.log(data.val());
    });
  }

  destinationToFuntion(to) {
    this.firebaseDB.database.ref(to).on('value', (data) => {
      this.destinationData = data.val();
      console.log(data.val());
    });
  }

  datepicker() {
    this.keyboard.close();
    this.datePicker.show({
      allowOldDates: false,
      minDate:  new Date().valueOf(),
      date: new Date(),
      mode: 'date',
      todayText: 'Today',
      androidTheme: 5
    }).then(date => {
        console.log('Got date: ', date)
        this.offerride.date = date.toDateString();
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
        this.offerride.time = time.toLocaleTimeString();
      },
      err => console.log('Error occurred while getting date: ', err)
      );
  }

  datepickerisRoundTrip() {
    this.keyboard.close();
    this.datePicker.show({
      allowOldDates: false,
      minDate: new Date().valueOf(),
      date: new Date(),
      mode: 'date',
      todayText: 'Today',
      androidTheme: 5
    }).then(date => {
      console.log('Got date: ', date)
      this.offerride.dateRoundTrip = date.toDateString();
    },
      err => console.log('Error occurred while getting date: ', err)
      );
  }

  timepickerisRoundTrip() {
    this.datePicker.show({
      date: new Date(),
      mode: 'time',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT
    }).then(
      time => {
        console.log('Got date: ', time)
        this.offerride.timeRoundTrip = time.toLocaleTimeString();
      },
      err => console.log('Error occurred while getting date: ', err)
      );
  }

  save() {
   alert(JSON.stringify(this.offerride));
  }


}
