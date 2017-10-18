import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthProvider {

  constructor(public http: Http, public fire: AngularFireAuth, public firebaseDB: AngularFireDatabase) {
    console.log('Hello AuthProvider Provider');
  }
  //Signup
  signup(profile) {
    // console.log(profile.matric + '@student.upm.edu.my');
    var email = profile.matric + '@student.upm.edu.my';
    return this.fire.auth.createUserWithEmailAndPassword(email, profile.password).then((user) => {
      this.firebaseDB.object(`/userProfile/${user.uid}`)
        .set({
          displayName: "No name",
          fullname: "No name",
          photoURL: "http://placehold.it/300x200",
          email: email,
          emailVerified: false,
          phoneNumber: profile.phone,
          matricNumber: profile.matric
        });
    })
  }
  
  signout() {
    return this.fire.auth.signOut();
}

//   loggedinuser() {
//     var userId = this.fire.auth.currentUser.uid;
//     return this.firebaseDB.database.ref('/userProfile/+' + userId).once('value').then((snapshot) => {
//       var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
//     })
// }  



}
