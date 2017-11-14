import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TripdetailPage } from './tripdetail';
import { Ionic2RatingModule } from 'ionic2-rating/dist/ionic2-rating.module';

@NgModule({
  declarations: [
    TripdetailPage,
  ],
  imports: [
    IonicPageModule.forChild(TripdetailPage),
    Ionic2RatingModule
  ],
})
export class TripdetailPageModule {}
