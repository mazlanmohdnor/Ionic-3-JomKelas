import { Ionic2RatingModule } from 'ionic2-rating';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReviewrequestPage } from './reviewrequest';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    ReviewrequestPage,
  ],
  imports: [
    IonicPageModule.forChild(ReviewrequestPage),
    PipesModule,
    Ionic2RatingModule,
    
  ],
})
export class ReviewrequestPageModule {}
