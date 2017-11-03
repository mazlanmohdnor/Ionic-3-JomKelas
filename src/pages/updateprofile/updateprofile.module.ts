import { ParallaxHeaderDirectiveModule } from './../../components/parallax-header/parallax-header.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UpdateprofilePage } from './updateprofile';
import 'firebase/storage';
@NgModule({
  declarations: [
    UpdateprofilePage,
  ],
  imports: [
    IonicPageModule.forChild(UpdateprofilePage),
    ParallaxHeaderDirectiveModule

  ],
})
export class UpdateprofilePageModule {}
