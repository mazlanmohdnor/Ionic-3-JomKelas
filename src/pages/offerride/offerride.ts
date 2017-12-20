import { Profile } from "./../../model/profile";
import { Car } from "./../../model/car";
import { OfferRideModel } from "./../../model/offerridemodel";
import { Classes } from "./../../model/classes";
import { College } from "./../../model/college";
import { AngularFireDatabase } from "angularfire2/database";
import { AngularFireAuth } from "angularfire2/auth";
import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  Keyboard,
  AlertController,
  LoadingController,
  Events
} from "ionic-angular";
import { DatePicker } from "@ionic-native/date-picker";
import { ModalController } from "ionic-angular/components/modal/modal-controller";

@IonicPage()
@Component({
  selector: "page-offerride",
  templateUrl: "offerride.html"
})
export class OfferridePage {
  price: number = 0.0;
  offerride = {
    date: new Date().toDateString(),
    time: new Date().toLocaleTimeString(),
    seatOffered: 0
  } as OfferRideModel;

  destinationData: any;
  fromData: any;

  profile = {} as Profile;
  classes = {} as Classes;
  colleges = {} as College;
  vehicles = {} as Car;

  //number for seat
  currentNumber: number = 0;
  btnDec: boolean;
  btnInc: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private datePicker: DatePicker,
    public fire: AngularFireAuth,
    public firebaseDB: AngularFireDatabase,
    public keyboard: Keyboard,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public modal: ModalController,
    public event: Events
  ) {}

  ionViewDidLoad() {
    //fetch colleges
    this.firebaseDB.database.ref("college").on("value", data => {
      this.colleges = data.val();
    });

    //fetch classes
    this.firebaseDB.database.ref("class").on("value", data => {
      this.classes = data.val();
    });

    //save user and vehicle information
    this.fire.auth.onAuthStateChanged(user => {
      this.firebaseDB.database.ref(`vehicle/${user.uid}`).on("value", data => {
        this.vehicles = data.val();
        // this.offerride.vehicleType = data.val().type;
        // console.log('vehicle',this.vehicles);
      });

      this.firebaseDB.database
        .ref(`userProfile/${user.uid}`)
        .on("value", data => {
          this.profile = data.val();
          // set user object + %rate to offerride object
          this.offerride.uid = user.uid;
          this.offerride.name = data.val().fullname;
          this.offerride.userPhotoURL = data.val().photoURL;
          this.offerride.rate = data.val().rate;
          this.offerride.ratePercentage = data.val().ratePercentage;
          this.offerride.phone = data.val().phoneNumber;
          this.offerride.gender = data.val().gender;
          this.offerride.totalRideOffered = data.val().totalRideOffered;
          this.offerride.totalRideJoined = data.val().totalRideJoined;
        });
    });

    //after user add a vehicle, auto set the vehicle
    this.event.subscribe("plate", plate => {
      this.offerride.vehiclePlate = plate;
    });
  }

  ionViewWillLeave() {
    this.event.unsubscribe("plate");
  }

  destinationSelected(event) {
    if (event === "collegeToClass") {
      this.destinationFromFunction("college");
      this.destinationToFuntion("class");
    } else if (event === "classToCollege") {
      this.destinationFromFunction("class");
      this.destinationToFuntion("college");
    } else if (event === "collegeToCollege") {
      this.destinationFromFunction("college");
      this.destinationToFuntion("college");
    } else if (event === "classToClass") {
      this.destinationFromFunction("class");
      this.destinationToFuntion("class");
    }
  }

  destinationFromFunction(from: string) {
    this.firebaseDB.database.ref(from).on("value", data => {
      this.fromData = data.val();
      // console.log(data.val());
    });
  }

  increment() {
    this.currentNumber = this.currentNumber + 1;
    if (this.currentNumber == this.offerride.seatOffered) {
      this.btnInc = true;
    }
  }

  decrement() {
    if (this.currentNumber > 0) {
      this.currentNumber = this.currentNumber - 1;
      this.btnInc = false;
    }
  }

  //price
  incrementPrice() {
    this.price += 0.1;
    if (this.price == 1.0) {
      this.btnInc = true;
    }
  }

  decrementPrice() {
    if (this.price > 0.0) {
      this.price -= 0.1;
    } else {
      this.btnInc = false;
    }  
  }

  destinationToFuntion(to) {
    this.firebaseDB.database.ref(to).on("value", data => {
      this.destinationData = data.val();
      // console.log(data.val());
    });
  }

  //to select vehicle type
  vehicletype(result) {
    console.log(result);
  }

  datepicker() {
    this.keyboard.close();
    this.datePicker
      .show({
        allowOldDates: false,
        minDate: new Date().valueOf(),
        date: new Date(),
        mode: "date",
        todayText: "Today",
        androidTheme: 5
      })
      .then(
        date => {
          console.log("Got date: ", date);
          this.offerride.date = date.toDateString();
        },
        err => console.log("Error occurred while getting date: ", err)
      );
  }

  timepicker() {
    this.datePicker
      .show({
        date: new Date(),
        mode: "time",
        androidTheme: this.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT
      })
      .then(
        time => {
          console.log("Got date: ", time);
          this.offerride.time = time.toLocaleTimeString();
        },
        err => console.log("Error occurred while getting date: ", err)
      );
  }

  datepickerisRoundTrip() {
    this.keyboard.close();
    this.datePicker
      .show({
        allowOldDates: false,
        minDate: new Date().valueOf(),
        date: new Date(),
        mode: "date",
        todayText: "Today",
        androidTheme: 5
      })
      .then(
        date => {
          console.log("Got date: ", date);
          this.offerride.dateRoundTrip = date.toDateString();
        },
        err => console.log("Error occurred while getting date: ", err)
      );
  }

  timepickerisRoundTrip() {
    this.datePicker
      .show({
        date: new Date(),
        mode: "time",
        androidTheme: this.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT
      })
      .then(
        time => {
          console.log("Got date: ", time);
          this.offerride.timeRoundTrip = time.toLocaleTimeString();
        },
        err => console.log("Error occurred while getting date: ", err)
      );
  }

  vehicle(plate) {
    this.fire.auth.onAuthStateChanged(user => {
      //get the vehicle
      this.firebaseDB.database
        .ref(`vehicle/${user.uid}/${plate}`)
        .on("value", data => {
          (this.offerride.vehiclePlate = data.val().plate),
            (this.offerride.brand = data.val().brand),
            (this.offerride.model = data.val().model),
            (this.offerride.color = data.val().color),
            (this.offerride.vehiclePhotoURL = data.val().photoURL),
            (this.offerride.vehicleType = data.val().type),
            (this.offerride.seatOffered = data.val().seat);
          // console.log(data.val());
        });
    });
  }

  addvehicle() {
    let prompt = this.alertCtrl.create({
      title: "Enter plate number",
      message: "Enter plate number of your vehicle",
      inputs: [
        {
          name: "platenumber",
          placeholder: "BMN 3214"
        }
      ],
      buttons: [
        {
          text: "Cancel",
          handler: data => {
            console.log("Cancel clicked");
          }
        },
        {
          text: "Save",
          handler: data => {
            let loader = this.loadingCtrl.create({
              content: "Please wait..."
            });
            loader.present();
            this.firebaseDB
              .object(
                `/vehicle/${this.fire.auth.currentUser.uid}/${data.platenumber}`
              )
              .set({
                plate: data.platenumber
              })
              .then(_ =>
                this.modal
                  .create("VehiclePage", { plate: data.platenumber })
                  .present()
                  .then(_ => loader.dismiss())
              );
          }
        }
      ]
    });
    prompt.present();
  }

  //after all forms filled in, send the object to be review
  review() {
    const date = new Date().valueOf();
    this.offerride.timestamp = date;
    this.navCtrl.push("ReviewridePage", { offerride: this.offerride });
    // let modal = this.modal.create(
    //   "ReviewridePage",
    //   { offerride: this.offerride },
    //   {
    //     showBackdrop: true,
    //     enableBackdropDismiss: true,
    //     cssClass: "mymodal"
    //   }
    // );

    // modal.present();
    // modal.onDidDismiss((data) => {
    //   // this.navCtrl.pop("RidePage");
    //   console.log(data);
    // });
  }
}
