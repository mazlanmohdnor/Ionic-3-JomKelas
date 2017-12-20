import { Ionic2RatingModule } from 'ionic2-rating';
import { PipesModule } from './../../pipes/pipes.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewpassangerPage } from './viewpassanger';

@NgModule({
  declarations: [ViewpassangerPage],
  imports: [
    IonicPageModule.forChild(ViewpassangerPage),
    PipesModule,
    Ionic2RatingModule
  ]
})
export class ViewpassangerPageModule {}
