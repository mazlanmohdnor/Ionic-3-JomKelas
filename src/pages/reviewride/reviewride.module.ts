import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReviewridePage } from './reviewride';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    ReviewridePage,
  ],
  imports: [
    IonicPageModule.forChild(ReviewridePage),
    PipesModule
  ],
})
export class ReviewridePageModule {}
