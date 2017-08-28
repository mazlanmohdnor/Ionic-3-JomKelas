import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthProvider } from './../providers/auth/auth';
import { Component, ViewChild  } from '@angular/core';
import { Nav,Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  pages: Array<{title:string, subtitle:string, icon:string, page:string}>;

  phone: string;
  photoURL: string;
  email: string;
  displayName: string;

  rootPage: any;
  activePage: any;


  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public auth: AuthProvider,
    public fire: AngularFireAuth,
    public firebaseDB: AngularFireDatabase,
    public storage: Storage
  ){
    this.initializeApp();

    this.pages=[
      { title: 'Home', subtitle: '', icon:'home', page:'HomePage'},
      { title: 'My Rides', subtitle: 'Manage your rides', icon:'car', page:'RidePage'},
      { title: 'My Booking', subtitle: 'Manage your booking',icon:'list-box',page:'BookingPage'},
      { title: 'Account', subtitle: 'Manage your account', icon: 'person', page:'ProfilePage'},
    ]

    this.activePage = this.pages[0].page;
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      //WalkthroughPage
      // check whether user loggedin or not
      this.fire.auth.onAuthStateChanged((user) => {
        //check whether user had open the app, if not, set walkthrough
        this.storage.get('intro-done').then(done => {
          if (!done) {
            this.storage.set('intro-done', true);
            this.rootPage = 'WalkthroughPage';
          }
        });

        //if user x logged in, set page ke login
        if (!user) {
          this.rootPage = 'LoginPage';
        }
        else {//kalau logged in, set ke homepage
          this.rootPage = 'HomePage';
          var user = this.fire.auth.currentUser;
          user.providerData.forEach((profile) => {
            this.displayName = profile.displayName || "Anonymous",
              this.email = profile.email,
              this.photoURL = profile.photoURL || "assets/no-profile.png"
            this.phone = profile.phoneNumber || "Phone Number"
          })
        }
      })
    });
  }

  openPage(p) {
    this.nav.setRoot(p);
    this.activePage = p;
  }
  checkActive(p) {
    return p==this.activePage;
  }

}
