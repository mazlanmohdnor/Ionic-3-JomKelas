import { PipesModule } from './../../pipes/pipes.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RidePage } from './ride';

@NgModule({
  declarations: [
    RidePage,
  ],
  imports: [
    IonicPageModule.forChild(RidePage),
    PipesModule
  ],
})
export class RidePageModule {}
