import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'keyobject',
})
export class KeyobjectPipe implements PipeTransform {
  transform(value:any, args: any[]): any {
    let keys = [];
    for (let key in value) {
      // keys.push({ key: key, value: value[key] });
      return Object.keys(value).map(key => Object.assign({ key }, value[key]));
    }
    return keys;
  }
}
