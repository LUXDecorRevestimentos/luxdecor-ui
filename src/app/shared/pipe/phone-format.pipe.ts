import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneFormat'
})
export class PhoneFormatPipe implements PipeTransform {

  transform(value: string | number): string {
    if (!value) return '';

    // Remove tudo que não for número
    const cleaned = value.toString().replace(/\D/g, '');

    // Formata celular com 11 dígitos: (99) 99999-9999
    if (cleaned.length === 11) {
      return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }

    // Formata fixo com 10 dígitos: (99) 9999-9999
    if (cleaned.length === 10) {
      return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }

    // Retorna o valor original se não for possível formatar
    return value.toString();
  }
}
