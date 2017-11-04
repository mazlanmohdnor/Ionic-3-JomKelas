import { DirectivesModule } from './../../directives/directives.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VehicledetailPage } from './vehicledetail';

@NgModule({
  declarations: [
    VehicledetailPage,
  ],
  imports: [
    IonicPageModule.forChild(VehicledetailPage),
    DirectivesModule
  ],
})
export class VehicledetailPageModule {}
