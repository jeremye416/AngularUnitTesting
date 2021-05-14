import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'alternateCaps'
})
export class AlternateCapsPipe implements PipeTransform {

  transform(value: string | null, ...args: unknown[]): string | null {
    if(value) {
      let result = '';

      for(let i = 0; i < value.length; i++) {
        let evenOdd = i % 2;
        let v = value[i];

        if(evenOdd) {
          result += v.toUpperCase();
        } else {
          result += v.toLowerCase();
        }
      }
      
      return result;
    } else {
      return null;
    }
  }

}
