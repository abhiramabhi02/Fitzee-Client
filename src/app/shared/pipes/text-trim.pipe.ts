import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textTrim'
})
export class TextTrimPipe implements PipeTransform {

  transform(value: string): string {
    if(value.length > 60){
      return value.slice(0, 30) + '....'
    }
    return value
  }

}
