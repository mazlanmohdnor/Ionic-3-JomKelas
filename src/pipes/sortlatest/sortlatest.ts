import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortlatest',
})
export class SortlatestPipe implements PipeTransform {
  transform(value: any) {
    //sort list to recent, based on timestamp on Date.valueof
    return value.sort((a, b) => Number(b.timestamp) - Number(a.timestamp));
  }
}
