import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cardNumberFormat',
  standalone: true
})
export class CardNumberFormatPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value) {
      return '';
    }
    const cleanedValue = value.replace(/\D/g, '');
    return cleanedValue.replace(/(\d{4})(?=\d)/g, '$1 ');
  }
}