import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DatePicker } from '@ionic-native/date-picker';
import { HttpModule } from "@angular/http";
import { Facebook } from "@ionic-native/facebook";
import { IonicStorageModule } from '@ionic/storage';
import { AuthProvider } from '../providers/auth/auth';

import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { AngularFireAuthModule } from "angularfire2/auth";
import { NativeStorage } from '@ionic-native/native-storage';

const config = {
    apiKey: "AIzaSyC9fyMmIMAptUaevwGV_GLKltcFb-0fSf0",
    authDomain: "jomkelas.firebaseapp.com",
    databaseURL: "https://jomkelas.firebaseio.com",
    projectId: "jomkelas",
    storageBucket: "jomkelas.appspot.com",
    messagingSenderId: "95230060980"
  };

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {
      scrollPadding: false,
      scrollAssist: true,
      autoFocusAssist: false
    }),
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    DatePicker,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    Facebook,
    NativeStorage
  ]
})
export class AppModule {}
