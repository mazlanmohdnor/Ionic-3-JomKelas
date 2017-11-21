import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'filterride',
})
export class FilterridePipe implements PipeTransform {
  
  transform(value: any) {
    // const date = new Date().ge
    const currentdate = new Date().toDateString();
    return value.filter(ride => Date.parse(ride.date) >= Date.parse(currentdate) );
    // value.filter(ride => console.log(ride.date) );
    
  }
}
