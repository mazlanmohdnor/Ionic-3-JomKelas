import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthProvider } from './../providers/auth/auth';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  phone: string;
  photoURL: string;
  email: string;
  displayName: string;
  rootPage: any;


  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public auth: AuthProvider, public fire: AngularFireAuth, public firebaseDB:AngularFireDatabase) {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      // check whether user loggedin or not
    fire.auth.onAuthStateChanged((user) => {
        if (!user) {//if user x logged in, set page ke login
          this.rootPage = 'LoginPage';
          // unsubscribe();
        }
        // else if (user.emailVerified == false) { 
        //   this.rootPage = 'LoginPage';
          // unsubscribe();
    // }
        else {//kalau logged in, set ke homepage
          this.rootPage = 'HomePage';
          var user = fire.auth.currentUser;
          user.providerData.forEach((profile) => {
            this.displayName = profile.displayName|| "Anonymous",
            this.email = profile.email,
            this.photoURL = profile.photoURL || "http://placehold.it/300x200"
            this.phone = profile.phoneNumber || "Not update"
          })
        
          // alert(JSON.stringify(user))
          // this.user = JSON.stringify(user);
          // unsubscribe();
        }
      })

    });
  }

  logout() {
    this.auth.signout();
  }
}
