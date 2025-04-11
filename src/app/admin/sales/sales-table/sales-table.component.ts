import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SalesTable, OrderDetailsTable } from '../../../data/table.data';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sales-table',
  imports: [ MatIcon, MatTableModule, CommonModule ],
  templateUrl: './sales-table.component.html',
  styleUrl: './sales-table.component.css'
})
export class SalesTableComponent {

  @Input() detailTable!: SalesTable[];
  @Output() rowSelected: EventEmitter<SalesTable> = new EventEmitter();

  displayedColumns: string[] = ['saleId', 'orderId', 'clientId', 'value', 'date'];
  dataSource = new MatTableDataSource<SalesTable>();
  selectedRow: SalesTable | null = null;

  ngOnInit(): void {
    this.dataSource.data = this.detailTable;
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onRowClicked(row: SalesTable): void {
    this.selectedRow = row;
    this.rowSelected.emit(row);
  }
    
}
