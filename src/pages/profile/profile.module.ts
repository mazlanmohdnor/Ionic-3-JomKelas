import { ParallaxHeaderDirectiveModule } from './../../components/parallax-header/parallax-header.module';
import { ProfilePage } from './profile';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [
    ProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(ProfilePage),
    ParallaxHeaderDirectiveModule
  ],
  exports: [
    ProfilePage
  ]
})

export class ProfilePageModule { }