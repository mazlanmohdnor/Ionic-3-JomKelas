import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortlatest',
})
export class SortlatestPipe implements PipeTransform {
  transform(value: any) {
    return value.sort((a, b) => Number(b.timestamp) - Number(a.timestamp));
  }
}
