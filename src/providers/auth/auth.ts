import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase } from "angularfire2/database";

import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import "rxjs/add/operator/map";

@Injectable()
export class AuthProvider {
  constructor(
    public http: Http,
    public fire: AngularFireAuth,
    public firebaseDB: AngularFireDatabase
  ) {
    console.log("Hello AuthProvider Provider");
  }
  //Signup
  signup(profile) {
    console.log(profile);

    var email = profile.matric + "@student.upm.edu.my";
    return this.fire.auth
      .createUserWithEmailAndPassword(email, profile.password)
      .then(user => {
        //save to firebase database
        this.fire.auth.onAuthStateChanged(auth => {
          this.firebaseDB.object(`/userProfile/${user.uid}`).set({
            fullname: profile.fullname,
            photoURL: "assets/no-profile.png",
            email: email,
            phoneNumber: profile.phone,
            matricNumber: profile.matric,
            bio: "",
            kolej: "",
            gender: "",
            rate: 0
          });
        });
      });
  }

  signout() {
    return this.fire.auth.signOut();
  }
}
