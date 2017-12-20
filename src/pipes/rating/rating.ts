import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: "rating"
})
export class RatingPipe implements PipeTransform {
  // filter ride, make rating to percentage rate/100*5

  transform(value:any) {
     return value/100*5;
  }
}
