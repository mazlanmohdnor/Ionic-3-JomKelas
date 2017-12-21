import { FIREBASE_CONFIG } from './app.firebase.config';
import { IonicImageViewerModule } from 'ionic-img-viewer';
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
import { InAppBrowser } from "@ionic-native/in-app-browser";
import { Camera } from "@ionic-native/camera";
import { IonicImageLoader } from "ionic-image-loader";
import { DeviceFeedback } from "@ionic-native/device-feedback";
import { LocalNotifications } from "@ionic-native/local-notifications";
// import { BackgroundMode } from "@ionic-native/background-mode";

//to use ionic storage
import 'firebase/storage';
import { DataProvider } from '../providers/data/data';



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
      autoFocusAssist: false,
      pageTransition:'md-transition',
     

    }),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    IonicStorageModule.forRoot(),
    IonicImageViewerModule,
    IonicImageLoader.forRoot()
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
    NativeStorage,
    InAppBrowser,
    Camera,
    DeviceFeedback,
    DataProvider,
    LocalNotifications,
    // BackgroundMode,
  ]
})
export class AppModule {}
