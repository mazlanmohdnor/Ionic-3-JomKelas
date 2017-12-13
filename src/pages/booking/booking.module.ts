import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BookingPage } from './booking';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    BookingPage,
  ],
  imports: [
    IonicPageModule.forChild(BookingPage),
    PipesModule

  ],
})
export class BookingPageModule {}
