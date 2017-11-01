import { PipesModule } from './../../pipes/pipes.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfilePage } from './profile';
import { ParallaxHeaderDirectiveModule } from './../../components/parallax-header/parallax-header.module';

@NgModule({
  declarations: [
    ProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(ProfilePage),
    ParallaxHeaderDirectiveModule,
    PipesModule
  ],
  exports: [
    ProfilePage
  ]
})

export class ProfilePageModule { }