import { ParallaxHeaderDirectiveModule } from './../../components/parallax-header/parallax-header.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VehicledetailPage } from './vehicledetail';

@NgModule({
  declarations: [
    VehicledetailPage,
  ],
  imports: [
    IonicPageModule.forChild(VehicledetailPage),
    ParallaxHeaderDirectiveModule
  ],
})
export class VehicledetailPageModule {}
