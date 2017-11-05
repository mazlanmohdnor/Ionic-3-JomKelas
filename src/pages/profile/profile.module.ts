import { DirectivesModule } from './../../directives/directives.module';
import { PipesModule } from './../../pipes/pipes.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfilePage } from './profile';
import { Ionic2RatingModule } from "ionic2-rating";
import { IonicImageViewerModule } from 'ionic-img-viewer';
@NgModule({
  declarations: [
    ProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(ProfilePage),
    DirectivesModule,
    PipesModule,
    Ionic2RatingModule,
    IonicImageViewerModule
  ],
  exports: [
    ProfilePage
  ]
})

export class ProfilePageModule { }