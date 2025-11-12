import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TaxInfo } from '../../data/tax.data';

@Component({
  selector: 'app-tax-table',
  imports: [
    MatIcon,
    MatTableModule,
    CommonModule
  ],
  templateUrl: './tax-table.component.html',
  styleUrl: './tax-table.component.css'
})
export class TaxTableComponent implements OnInit{
  
  @Input() detailTable!: TaxInfo[];
  @Output() rowSelected: EventEmitter<TaxInfo> = new EventEmitter();

  displayedColumns: string[] = [
    'payment_method',
    'created_at',
    'rate_percentage',
    'range_criteria',
    'range_start',
    'range_end'];
  dataSource = new MatTableDataSource<TaxInfo>();
  selectedRow: TaxInfo | null = null;

  ngOnInit(): void {
    this.dataSource.data = this.detailTable;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onRowClicked(row: TaxInfo): void {
    this.selectedRow = row;
    this.rowSelected.emit(row);
  }

}
