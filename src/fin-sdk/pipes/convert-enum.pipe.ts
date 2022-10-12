import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertEnum'
})
export class ConvertEnumPipe implements PipeTransform {

  transform(value: number, _enum:any): string {
    const result = _enum[value];
    return result;
  }

}
