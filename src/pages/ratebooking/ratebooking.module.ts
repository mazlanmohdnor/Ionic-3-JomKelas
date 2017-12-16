import { Ionic2RatingModule } from 'ionic2-rating';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RatebookingPage } from './ratebooking';

@NgModule({
  declarations: [RatebookingPage],
  imports: [IonicPageModule.forChild(RatebookingPage), Ionic2RatingModule]
})
export class RatebookingPageModule {}
