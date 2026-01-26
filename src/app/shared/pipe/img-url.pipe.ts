import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../../enviroments/enviroment';


@Pipe({
  name: 'imgUrl',
  standalone: true
})
export class ImgUrlPipe implements PipeTransform {

  transform(value: string | undefined | null): string {
    if (!value) {
      return 'assets/img/no-image.webp'; 
    }

    if (value.startsWith('http')) {
      return value;
    }

    return `${environment.apiUrl}${value}`;
  }
}