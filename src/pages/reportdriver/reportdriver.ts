import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';



@IonicPage()
@Component({
  selector: "page-reportdriver",
  templateUrl: "reportdriver.html"
})
export class ReportdriverPage {
  isNotAttend: boolean = false;
  isFake: boolean = false;
  reportComment: string;
  driver: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public firebaseDB: AngularFireDatabase,
    public fire: AngularFireAuth,
    public loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {
    //get data from booking.ts
    this.driver = navParams.get("driver");
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad ReportdriverPage", this.driver);
  
  }
  submit() {
      let loading = this.loadingCtrl.create({ content: "Submitting..." });
      loading
        .present()
        .then(() => {
          this.firebaseDB.database
            .ref(`driverReport/${this.driver.dId}`)
            .push({
              driverName: this.driver.dName,
              date: new Date().toLocaleDateString(),
              time: new Date().toTimeString(),
              isFake: this.isFake,
              isNotAttend: this.isNotAttend,
              reportComment: this.reportComment
            });
          loading.dismiss();
        })
        .then(() => {
          let alert = this.alertCtrl.create({
            title: "Thank you for your feedback.",
            subTitle:
              "Your report will be reviewed by our support staff.",
            buttons: [
              {
                text: "OK",
                handler: () => {
                  this.navCtrl.pop();
                }
              }
            ]
          });
          alert.present();
        });
  }
}
