import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rgFormat'
})
export class RgFormatPipe implements PipeTransform {

  transform(value: string | number): string {
    if (!value) return '';
    const cleaned = value.toString().replace(/\D/g, '');
    if (cleaned.length !== 9) return value.toString();

    return cleaned.replace(/(\d{2})(\d{3})(\d{3})(\d{1})/, '$1.$2.$3-$4');
  }
}
