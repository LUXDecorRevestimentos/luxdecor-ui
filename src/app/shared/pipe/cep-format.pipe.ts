import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cepFormat'
})
export class CepFormatPipe implements PipeTransform {

  transform(value: string | number): string {
    if (!value) return '';
    const cleaned = value.toString().replace(/\D/g, '');
    if (cleaned.length !== 8) return value.toString();

    return cleaned.replace(/(\d{5})(\d{3})/, '$1-$2');
  }
}
