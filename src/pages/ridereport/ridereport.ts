import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';



@IonicPage()
@Component({
  selector: "page-ridereport",
  templateUrl: "ridereport.html"
})
export class RidereportPage {
  isNotAttend: boolean=false;
  isFake: boolean=false;
  reportComment: string;
  passanger: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public firebaseDB: AngularFireDatabase,
    public fire: AngularFireAuth,
    public loadingCtrl: LoadingController,
    private alertCtrl: AlertController

  ) {
    //get from viewpassanger.ts
    this.passanger = navParams.get("report");
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad RidereportPage", this.passanger);
  }

  submit() {
    // console.log(
    //   " this.isFake",
    //   this.isFake,
    //   " this.isNotAttend;",
    //   this.isNotAttend,
    //   "this.comment",
    //   this.reportComment
    // );
    let loading = this.loadingCtrl.create({ content: "Submitting..." });
    loading.present().then(() => {
      this.firebaseDB.database
        .ref(`passangerReport/${this.passanger.pUid}`)
        .push({
          passangerName: this.passanger.pName,
          date: new Date().toLocaleDateString(),
          time: new Date().toTimeString(),
          isFake: this.isFake,
          isNotAttend: this.isNotAttend,
          reportComment: this.reportComment
        })
        loading.dismiss()
    }).then(() => {
      let alert = this.alertCtrl.create({
        title: "Thank you for your feedback.",
        subTitle: "Your report will be reviewed by our support staff.",
        buttons: [
          {
            text: "OK",
            handler: () => {
              this.navCtrl.pop()
            }
          }
        ]
      })
      alert.present();

    })
      
  }
}
