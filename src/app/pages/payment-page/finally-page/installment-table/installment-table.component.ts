import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { InstallmentsTable } from '../../../../data/payment.data';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-installment-table',
  imports: [
    CommonModule,
    MatTableModule
  ],
  templateUrl: './installment-table.component.html',
  styleUrl: './installment-table.component.css'
})
export class InstallmentTableComponent implements OnInit {

  @Input() totalValue: number = 1000;
  @Input() interestRate: number = 1.99;
  @Input() maxInstallments: number = 12;
  @Input() closeChanges: InstallmentsTable | undefined;

  installmentsData: InstallmentsTable[] = [];
  installmentsDataSource = new MatTableDataSource<InstallmentsTable>();

  selectedRow: InstallmentsTable | null = null;

  @Output() selectedInstallments: EventEmitter<InstallmentsTable> = new EventEmitter(); 

  displayedColumns: string[] = ['option', 'total'];

  constructor() {}

  ngOnInit(): void {
    if (this.closeChanges) {
      this.onClosedChanges(this.closeChanges)
    } else {
      this.generateInstallments(1);
    }
  }

  onClosedChanges(closeChanges: InstallmentsTable){
    this.installmentsDataSource.data = [closeChanges]
  }

  generateInstallments(limit: number): void {
    const P = this.totalValue;
    const i = this.interestRate / 100;
    this.installmentsData = [];
    
    for (let n = 2; n <= limit; n++) { 
      let M: number;

      if(i  == 0) {
        M = P / n;
      } else {
        const numerator = i * Math.pow(1 + i, n);
        const denominator = Math.pow(1 + i, n) - 1;
        M = P * (numerator / denominator);
      }

      this.installmentsData.push({
        number: n,
        value: M
      });
    }

    this.installmentsDataSource.data = this.installmentsData;
  }
  
  onInstallmentSelected(installment: InstallmentsTable): void {
    this.selectedRow = installment;
    this.selectedInstallments.emit(installment);
  }

}
