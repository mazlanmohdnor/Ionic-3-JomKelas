import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'filterride',
})
export class FilterridePipe implements PipeTransform {
  
  transform(value: any) {
    // filter ride, never display ride less than current date
    const currentdate = new Date().toDateString();
    return value.filter(ride => Date.parse(ride.date) >= Date.parse(currentdate) );
  }
}
