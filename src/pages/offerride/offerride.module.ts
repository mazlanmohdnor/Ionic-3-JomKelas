import { PipesModule } from './../../pipes/pipes.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OfferridePage } from './offerride';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    OfferridePage,
  ],
  imports: [
    IonicPageModule.forChild(OfferridePage),
    PipesModule,
    DirectivesModule
    
  ],
})
export class OfferridePageModule {}
