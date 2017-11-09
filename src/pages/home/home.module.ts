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
        PipesModule
    ],
})
export class HomePageModule { }
