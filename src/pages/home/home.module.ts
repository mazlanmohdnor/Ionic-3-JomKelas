import { Ionic2RatingModule } from 'ionic2-rating';
import { PipesModule } from './../../pipes/pipes.module';
import { HomePage } from './home';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
    declarations: [
        HomePage,
    ],
    imports: [
        IonicPageModule.forChild(HomePage),
        PipesModule,
        Ionic2RatingModule,
    ],
})
export class HomePageModule { }
