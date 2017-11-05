import { DirectivesModule } from './../../directives/directives.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VehicledetailPage } from './vehicledetail';
import { IonicImageViewerModule } from 'ionic-img-viewer';

@NgModule({
  declarations: [
    VehicledetailPage,
  ],
  imports: [
    IonicPageModule.forChild(VehicledetailPage),
    DirectivesModule,
    IonicImageViewerModule
  ],
})
export class VehicledetailPageModule {}
