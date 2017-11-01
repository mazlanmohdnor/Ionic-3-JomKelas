import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VehicledetailPage } from './vehicledetail';

@NgModule({
  declarations: [
    VehicledetailPage,
  ],
  imports: [
    IonicPageModule.forChild(VehicledetailPage),
  ],
})
export class VehicledetailPageModule {}
