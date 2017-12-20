import { InAppBrowser } from '@ionic-native/in-app-browser';
import { OfferRideModel } from "./../../model/offerridemodel";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, ModalController } from "ionic-angular";

@IonicPage()
@Component({
  selector: "page-tripdetail",
  templateUrl: "tripdetail.html"
})
export class TripdetailPage {
  trip = {} as OfferRideModel;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public iab:InAppBrowser,
    public modal: ModalController
  ) {
      //get from home.ts
      this.trip = navParams.get("trip");
      console.log(this.trip);
    }

  ionViewDidLoad() {
    
  }
  whatsapp(phone) {
    console.log(phone);
    this.iab.create(`https://api.whatsapp.com/send?phone=6${phone}&text=hai%0D%0Anama+saya+mohd+mazlan%0D%0Asaya+berminat+nak+ride+kl+-+selangor+%3A+22%3A20AM`,"_system")
  }

   //after all forms filled in, send the object to be review
   confirmBook() {
    
     this.navCtrl.push("BookconfirmPage", { trip: this.trip });
    //  let modal = this.modal.create(
    //      "BookconfirmPage",
    //     {'trip':this.trip},
    //      {
    //        showBackdrop: true,
    //        enableBackdropDismiss: true,
    //        cssClass:"mymodal"
    //      }
    //    );

    //    modal.present();

    //    modal.onDidDismiss(() => {
    //     this.navCtrl.setRoot("HomePage");
    //   });
   }
}
