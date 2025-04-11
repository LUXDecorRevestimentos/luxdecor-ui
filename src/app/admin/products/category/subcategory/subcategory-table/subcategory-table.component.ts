import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { SubCategory } from '../../../../data/category.data';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-subcategory-table',
  imports: [  
    MatTableModule,
    CommonModule],
  templateUrl: './subcategory-table.component.html',
  styleUrls: ['./subcategory-table.component.css']
})
export class SubCategoryTableComponent implements OnInit {

  @Input() subCategories!: SubCategory[];
  @Output() rowSelected: EventEmitter<SubCategory> = new EventEmitter();

  displayedColumns: string[] = ['subCategoryId', 'subCategoryName', 'items'];
  dataSource = new MatTableDataSource<SubCategory>();
  selectedRow: SubCategory | null = null;

  constructor() {}

  ngOnInit(): void {
    this.dataSource.data = this.subCategories;
  }

  onRowClicked(row: SubCategory): void {
    this.selectedRow = row;
    this.rowSelected.emit(row);
  }
}