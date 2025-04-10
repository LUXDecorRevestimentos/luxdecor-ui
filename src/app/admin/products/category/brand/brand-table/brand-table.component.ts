import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Brand } from '../../../../data/category.data';


@Component({
  selector: 'app-brand-table',
  imports: [MatTableModule, CommonModule],
  templateUrl: './brand-table.component.html',
  styleUrl: './brand-table.component.css'
})
export class BrandTableComponent implements OnInit{

  @Input() brands!: Brand[];
  @Output() rowSelected: EventEmitter<Brand> = new EventEmitter();
  displayedColumns: string[] = ['brandId', 'brandName', 'items'];
  dataSource = new MatTableDataSource<Brand>();
  selectedRow: Brand | null = null;

  constructor() {}

  ngOnInit(): void {
    this.dataSource.data = this.brands;
    console.log(this.brands)
  } 
  onRowClicked(row: Brand): void {
    this.selectedRow = row;
    this.rowSelected.emit(row);
  }  
}
