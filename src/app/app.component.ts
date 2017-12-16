import { Profile } from "./../model/profile";
import { AngularFireDatabase } from "angularfire2/database";
import { AngularFireAuth } from "angularfire2/auth";
import { AuthProvider } from "./../providers/auth/auth";
import { Component, ViewChild } from "@angular/core";
import {
  Nav,
  Platform,
  Events,
  MenuController
} from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { Storage } from "@ionic/storage";

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  profile = {} as Profile;

  @ViewChild(Nav) nav: Nav;
  pages: Array<{ title: string; subtitle: string; icon: string; page: string }>;

  rootPage: any;
  activePage: any;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public auth: AuthProvider,
    public fire: AngularFireAuth,
    public firebaseDB: AngularFireDatabase,
    public storage: Storage,
    public event: Events,
    public menu: MenuController
  ) {
    this.initializeApp();

    this.pages = [
      { title: "Home", subtitle: "", icon: "home", page: "HomePage" },
      {
        title: "My Rides",
        subtitle: "Manage your rides",
        icon: "car",
        page: "RidePage"
      },
      {
        title: "My Booking",
        subtitle: "Manage your booking",
        icon: "list-box",
        page: "BookingPage"
      },
      {
        title: "Account",
        subtitle: "Manage your account",
        icon: "person",
        page: "ProfilePage"
      }
    ];

    this.activePage = this.pages[0].page;
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // this.nav.getActive().component.name
      console.log('this.nav.getActive().component.name: ', this.nav.getActive());
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      // set status bar to white
      this.statusBar.backgroundColorByHexString("#00BAE1");
      this.splashScreen.hide();

      //check whether user had open the app, if not, set walkthrough
      this.storage.get("intro-done").then(done => {
        if (!done) {
          this.storage.set("intro-done", true);
          this.rootPage = "WalkthroughPage";
        }
      });

      //check user profile
      // this.checkProfile();

      //WalkthroughPage
      // check whether user loggedin or not
      this.fire.authState.subscribe(user => {
        //if user x logged in, set page ke login
        if (!user) {
          this.rootPage = "LoginPage";
        } else {
          //update side menu
          this.event.subscribe("user:loggedIn", result => {
            this.profile = result;
            console.log(result);
          });
          //kalau logged in, set ke homepage
          if (this.fire.auth.currentUser.emailVerified) {
            this.firebaseDB.database
              .ref(`userProfile/${this.fire.auth.currentUser.uid}`)
              .once("value", data => {
                this.profile = data.val();
                // if (!data.val().profileComplete) {
                // this.storage.set("profileComplete", false);
                // } else {
                // this.storage.set("profileComplete", true);
                // }
              });
            this.rootPage = "HomePage";
          } else {
            this.rootPage = "VerifymailPage";
          }
        }
      });
    });
  }

  // checkProfile() {
  //  this.firebaseDB.database
  //    .ref(`userProfile/${this.fire.auth.currentUser.uid}`)
  //    .once("value", data => {
  //      //check to complete profile, if not, ask user to complete first
  //      if (!data.val().profileComplete) {
  //        this.storage.set("profileComplete", false);
  //      } else {
  //        this.storage.set("profileComplete", true);
  //      }
  //    });
  // }

  openPage(p) {
    this.nav.setRoot(p);
    this.activePage = p;
  }
  checkActive(page) {
    return page == this.activePage;
  }

  profilepage() {
    this.nav.setRoot("ProfilePage");
    this.menu.close();
  }
}
