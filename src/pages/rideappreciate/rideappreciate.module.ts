import { Ionic2RatingModule } from 'ionic2-rating';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RideappreciatePage } from './rideappreciate';

@NgModule({
  declarations: [RideappreciatePage],
  imports: [IonicPageModule.forChild(RideappreciatePage), Ionic2RatingModule]
})
export class RideappreciatePageModule {}
