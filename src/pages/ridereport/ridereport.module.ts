import { Ionic2RatingModule } from 'ionic2-rating';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RidereportPage } from './ridereport';

@NgModule({
  declarations: [RidereportPage],
  imports: [IonicPageModule.forChild(RidereportPage), Ionic2RatingModule]
})
export class RidereportPageModule {}
