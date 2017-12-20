import { AngularFireDatabase } from "angularfire2/database";
import { Http } from "@angular/http";
import { Injectable } from "@angular/core";
import "rxjs/add/operator/map";

@Injectable()
export class DataProvider {
  itemdefault: any;
  items: any;
  constructor(public http: Http, public firebaseDB: AngularFireDatabase) {
    console.log('data ready');
    this.firebaseDB.database.ref("offerRides/").on("value", data => {
      this.itemdefault = data.val();
      if (data.val()) {
        this.items = [];
        Object.getOwnPropertyNames(data.val()).forEach(key => {
          let value = data.val()[key];
          this.items.push(value);
        });
      } else {
        console.log("no value");
      }
    });
  }

  filterItems(searchTerm) {
    if (this.items) {
         return this.items.filter(item => {
        return (
          item.destination.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) || (item.from.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
          );
      });
    } else {
      console.log('data xde bro untuk term');
    }
   
  }


  filterWomen(isWomen) {
    if (isWomen === false) {
      console.log("women false");
      return this.itemdefault;
    } else {
          if (this.items) {
            return this.items.filter(item => {
    
              return item.onlyWomen;
            })
        } else {
          console.log('data xde bro untuk women');
        }
    }
  }
}
