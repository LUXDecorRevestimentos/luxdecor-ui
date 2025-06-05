import { Component, Input, OnInit, Output, EventEmitter, HostListener, ElementRef } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CategoryTable, CategoryStatusLabels, CategoryType } from '../../../data/category.data';


@Component({
  selector: 'app-category-table',
  imports: [  
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatIcon,
    CommonModule],
  templateUrl: './category-table.component.html',
  styleUrl: './category-table.component.css'
})
export class CategoryTableComponent {

  @Input() categories!: CategoryTable[];
  @Input() editable!: boolean;
  @Output() rowSelected: EventEmitter<CategoryTable> = new EventEmitter();

  displayedColumns: string[] = ['category_id', 'category_title', 'subcategory', 'topic', 'items', 'type'];
  dataSource = new MatTableDataSource<CategoryTable>();
  selectedRow: CategoryTable | null = null;

  constructor(private elementRef: ElementRef){}

  ngOnInit(): void {
    this.dataSource.data = this.categories;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target) && !this.editable) {
      this.clearSelection();
    }
  }

  clearSelection(){
    if (this.selectedRow != null) {
      this.selectedRow = null;
      this.rowSelected.emit();
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onRowClicked(row: CategoryTable): void {
    this.selectedRow = row;
    this.rowSelected.emit(row);
  }

  getLabelStatus(categoryType: any): string {
    let categoryTypeLabel: string = "";
    if ( categoryType && categoryType !== undefined) {
      categoryTypeLabel = CategoryStatusLabels[categoryType] || 'Unknown Status';
    }
    return categoryTypeLabel;
  }

}
