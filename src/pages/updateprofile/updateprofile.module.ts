import { DirectivesModule } from './../../directives/directives.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UpdateprofilePage } from './updateprofile';

@NgModule({
  declarations: [
    UpdateprofilePage,
  ],
  imports: [
    IonicPageModule.forChild(UpdateprofilePage),
    DirectivesModule
  ],
})
export class UpdateprofilePageModule {}
