import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BookconfirmPage } from './bookconfirm';

@NgModule({
  declarations: [
    BookconfirmPage,
  ],
  imports: [
    IonicPageModule.forChild(BookconfirmPage),
  ],
})
export class BookconfirmPageModule {}
