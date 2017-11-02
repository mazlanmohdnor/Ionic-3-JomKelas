import { ParallaxHeaderDirectiveModule } from './../../components/parallax-header/parallax-header.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VehiclePage } from './vehicle';

@NgModule({
  declarations: [
    VehiclePage,
  ],
  imports: [
    IonicPageModule.forChild(VehiclePage),
    ParallaxHeaderDirectiveModule
  ],
})
export class VehiclePageModule {}
