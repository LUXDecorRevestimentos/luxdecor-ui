import { CommonModule } from '@angular/common';
import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { take, takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-progress-bar',
  imports: [CommonModule],
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.css'
})
export class ProgressBarComponent implements OnInit, OnDestroy {
  totalTimeInSeconds = 10;
  progressValue: number = 0;
  private timerSubscription: Subscription | undefined;
  private updateInterval = 50; 
  @Output() timerFinished = new EventEmitter<void>();
  constructor() { }

  ngOnInit(): void {
    console.log('ProgressBar')
    this.startTimer();
  }

  startTimer(): void {
      this.progressValue = 0; 
      
      const totalSteps = (this.totalTimeInSeconds * 1000) / this.updateInterval;
      const incrementPerStep = 100 / totalSteps;

      this.timerSubscription = interval(this.updateInterval)
        .pipe(
          takeWhile(() => this.progressValue < 100)
        )
        .subscribe({
          next: () => {
            this.progressValue += incrementPerStep;
            
            if (this.progressValue > 100) {
              this.progressValue = 100;
            }
          },
          complete: () => {
            console.log('Timer Completo no Componente Filho.');
            // 2. DISPARA o evento quando o timer é concluído
            this.timerFinished.emit();
          }
        });
    }

  ngOnDestroy(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  restartTimer(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
    this.startTimer();
  }
}