import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private _isLoading = new BehaviorSubject<boolean>(false);
  
  readonly isLoading$: Observable<boolean> = this._isLoading.asObservable();
  
  private requests: number = 0; 

  constructor() {}
  show(): void {
    this.requests++;
    if (this.requests === 1) {
      this._isLoading.next(true);
    }
  }

  hide(): void {
    this.requests--;
    if (this.requests <= 0) {
      this.requests = 0;
      this._isLoading.next(false);
    }
  }
}