import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'substring',
})
export class SubstringPipe implements PipeTransform {
  transform(value: string, neededLength: number): string {
    if (value.length - 3 > neededLength) {
      return value.substring(0, value.lastIndexOf(' ')) + '...';
    }

    return value;
  }
}
