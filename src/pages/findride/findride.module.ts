import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FindridePage } from './findride';

@NgModule({
  declarations: [
    FindridePage,
  ],
  imports: [
    IonicPageModule.forChild(FindridePage),
  ],
})
export class FindridePageModule {}
