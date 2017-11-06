import { PipesModule } from './../../pipes/pipes.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OfferridePage } from './offerride';

@NgModule({
  declarations: [
    OfferridePage,
  ],
  imports: [
    IonicPageModule.forChild(OfferridePage),
    PipesModule,
  ],
})
export class OfferridePageModule {}
