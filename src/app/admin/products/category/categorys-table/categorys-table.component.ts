import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CategoryTable, CategoryStatusLabels, CategoryType } from '../../../data/category.data';


@Component({
  selector: 'app-categorys-table',
  imports: [  
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatIcon,
    CommonModule],
  templateUrl: './categorys-table.component.html',
  styleUrl: './categorys-table.component.css'
})
export class CategorysTableComponent {

  @Input() categorys!: CategoryTable[];
  @Output() rowSelected: EventEmitter<CategoryTable> = new EventEmitter();

  displayedColumns: string[] = ['categoryId', 'categoryName', 'subCategory', 'topic', 'items', 'type'];
  dataSource = new MatTableDataSource<CategoryTable>();
  selectedRow: CategoryTable | null = null;

  ngOnInit(): void {
    this.dataSource.data = this.categorys;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onRowClicked(row: CategoryTable): void {
    this.selectedRow = row;
    this.rowSelected.emit(row);
  }

  getLabelStatus(categoryType: CategoryType): string {
    let categoryTypeLabel: string = "";
    if ( categoryType && categoryType !== undefined) {
      categoryTypeLabel = CategoryStatusLabels[categoryType] || 'Unknown Status';
    }
    return categoryTypeLabel;
  }

}
