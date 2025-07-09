import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cpfFormat'
})
export class CpfFormatPipe implements PipeTransform {

  transform(value: string | number): string {
    if (!value) return '';
    const cleaned = value.toString().replace(/\D/g, '');
    if (cleaned.length !== 11) return value.toString();

    return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }
}
