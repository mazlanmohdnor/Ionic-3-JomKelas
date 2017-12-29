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
    //concat matric num with upm mail address
    let email = profile.matric + "@student.upm.edu.my";
    return this.fire.auth
      //send that email and password to Firebase Auth  
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
            rate: 0,
            ratePercentage: 0,
            totalRideJoined: 0,
            totalRideOffered:0,
            profileComplete: false,
            vehicleComplete: false
          });
        });
      });
  }


  signout() {
    return this.fire.auth.signOut();
  }
}
