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
    const length = cleanedValue.length;

    if (length <= 4) {
      return cleanedValue;
    }
    const lastFour = cleanedValue.slice(-4);

    const maskedLength = length - 4;

    const maskedPart = '*'.repeat(maskedLength);
    const fullMaskedNumber = maskedPart + lastFour;

    return fullMaskedNumber.replace(/(\*{4}|\d{4})(?=\*|\d)/g, '$1 ');
  }
}