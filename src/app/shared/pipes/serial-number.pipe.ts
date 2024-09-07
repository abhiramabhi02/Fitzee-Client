import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'serialNumber'
})
export class SerialNumberPipe implements PipeTransform {

  transform(index: number, startFrom:number = 1): number {
    return startFrom + index
  }

}
