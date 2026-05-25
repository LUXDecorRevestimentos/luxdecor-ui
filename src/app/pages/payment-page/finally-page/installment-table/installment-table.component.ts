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
export class InstallmentTableComponent implements OnInit, OnChanges {

  @Input() totalValue: number = 1000;
  @Input() interestRate: number = 1.99;
  @Input() maxInstallments: number = 12;
  @Input() closeChanges: InstallmentsTable | undefined;
  @Input() interestStartInstallment: number = 1;
  @Input() installment!: InstallmentsTable;

  installmentsData: InstallmentsTable[] = [];
  installmentsDataSource = new MatTableDataSource<InstallmentsTable>();

  selectedRow: InstallmentsTable | null = null;

  @Output() selectedInstallments: EventEmitter<InstallmentsTable> = new EventEmitter(); 

  displayedColumns: string[] = ['option', 'total'];

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.installment){      
      this.installmentsData.push({
        value: this.installment.value / 100,
        number: this.installment.number
      })
      this.installmentsDataSource.data = this.installmentsData;
    } else {this.generateInstallments(this.maxInstallments);}
    
    }

  ngOnInit(): void {
    
    if (this.installment){      
      this.installmentsData.push({
        value: this.installment.value / 100,
        number: this.installment.number
      })
      this.installmentsDataSource.data = this.installmentsData;
    } else {this.generateInstallments(this.maxInstallments);}
    
  }

  onClosedChanges(closeChanges: InstallmentsTable){
    this.installmentsDataSource.data = [closeChanges]
  }

  generateInstallments(limit: number): void {
    const P = this.totalValue;
    const i_input = this.interestRate / 100;
    this.installmentsData = [];
    
    for (let n = 2; n <= limit; n++) { 
      let M: number;
      let i_actual: number;
      if (n < this.interestStartInstallment) {
        i_actual = 0;
      } else {
        i_actual = i_input;
      }
      if(i_actual  == 0) {
        M = P / n; 
      } else {
        const numerator = i_actual * Math.pow(1 + i_actual, n);
        const denominator = Math.pow(1 + i_actual, n) - 1;
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
