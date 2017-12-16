import { AngularFireDatabase } from 'angularfire2/database';
import { Http } from "@angular/http";
import { Injectable } from '@angular/core';
import "rxjs/add/operator/map";

@Injectable()
export class DataProvider {
  items: any;
  constructor(
    public http: Http,
    public firebaseDB: AngularFireDatabase
  ) {
    this.firebaseDB.database.ref("offerRides/").on("value", data => {
      if (data.val()) {
           this.items = [];
           Object.getOwnPropertyNames(data.val()).forEach(key => {
             let value = data.val()[key];
             this.items.push(value);
           });
      } else {
        console.log('no value');
      }
   
    })
  }  
  
  filterItems(searchTerm) {
    return this.items.filter(item => {
      return item.destination
          .toLowerCase()
          .indexOf(searchTerm.toLowerCase()) > -1;
    });    
  }
}
