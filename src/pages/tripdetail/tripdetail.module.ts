import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TripdetailPage } from './tripdetail';

@NgModule({
  declarations: [
    TripdetailPage,
  ],
  imports: [
    IonicPageModule.forChild(TripdetailPage),
  ],
})
export class TripdetailPageModule {}
