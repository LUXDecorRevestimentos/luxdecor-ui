import { ErrorHandler, Injectable } from '@angular/core';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  handleError(error: any): void {
    if (error.name === 'TimeoutError') {
      console.warn('Ignorando TimeoutError esperado:', error.message);
      return;
    }
    console.error('Erro Angular:', error);
  }
}
