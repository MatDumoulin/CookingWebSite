import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight'
})
export class HighlightPipe implements PipeTransform {

  transform(value: string, comparator: string): string {
    if(comparator) {
      const regEx = new RegExp(comparator, "i");
      const result = value.match(regEx);
      return value.replace(regEx, `<strong>${result}</strong>`);
    }
    else
      return value;
  }

}
