import { Car } from "./../../model/car";
import { Profile } from "./../../model/profile";
import { AngularFireDatabase } from "angularfire2/database";
import { AngularFireAuth } from "angularfire2/auth";
import { AuthProvider } from "./../../providers/auth/auth";
import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController,
  LoadingController,
  ModalController
} from "ionic-angular";

@IonicPage()
@Component({
  selector: "page-profile",
  templateUrl: "profile.html"
})
export class ProfilePage {
  car: Car;
  profile = {} as Profile;
  rate: any = 90 / 100 * 5;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public auth: AuthProvider,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public fire: AngularFireAuth,
    public firebaseDB: AngularFireDatabase,
    public modal: ModalController
    
  ) {}

  ionViewDidLoad() {
    this.fire.authState.subscribe(user => {
    this.firebaseDB.database
      .ref(`userProfile/${user.uid}`)
      .on("value", data => {
        this.profile = data.val();
      });

       

    this.firebaseDB.database
      .ref(`vehicle/${user.uid}`)
      .on("value", data => {
        this.car = data.val();
      });
  })
}

  updateprofile() {
    this.navCtrl.push("UpdateprofilePage", {
      profile2: this.profile
    });
  }

  logout() {
    let confirm = this.alertCtrl.create({
      message: "Are you sure want to logout?",
      buttons: [
        {
          text: "Cancel",
          handler: () => {
            console.log("Disagree clicked");
          }
        },
        {
          text: "Logout",
          handler: () => {
            console.log("Agree clicked");
            this.fire.auth.signOut();
          }
        }
      ]
    });
    confirm.present();
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
                .object(`/vehicle/${this.fire.auth.currentUser.uid}/${data.platenumber}`)
                .set({
                  plate: data.platenumber
                })
                .then(_ =>
                  this.modal.create("VehiclePage", { plate: data.platenumber }).present().then(_=>loader.dismiss())
                );
          }
        }
      ]
    });
    prompt.present();
  }

  vehicledetail(car) {
    this.navCtrl.push("VehicledetailPage", { vehicledata: car });
  }
}
