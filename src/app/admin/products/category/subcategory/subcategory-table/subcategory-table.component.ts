import { Component, Input, OnInit, EventEmitter, Output, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { SubCategory } from '../../../../data/category.data';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-subcategory-table',
  imports: [  
    MatTableModule,
    CommonModule],
  templateUrl: './subcategory-table.component.html',
  styleUrls: ['./subcategory-table.component.css']
})
export class SubCategoryTableComponent implements OnChanges {
  private _subCategories: SubCategory[] = [];
  dataSource = new MatTableDataSource<SubCategory>([]);

  @Input() resetSelection: boolean = false;
  @Input() 
  set subCategories(value: SubCategory[]) {
    this._subCategories = [...value];
    this.dataSource.data = this._subCategories;
  }
  get subCategories(): SubCategory[] {
    return this._subCategories;
  }

  displayedColumns: string[] = ['subcategory_id', 'title', 'item'];

  @Output() rowSelected: EventEmitter<SubCategory> = new EventEmitter();

  selectedRow: SubCategory | null = null;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['subCategories']) {
    }
    if (this.resetSelection) {
      this.selectedRow = null;
    }
  }

  onRowClicked(row: SubCategory): void {
    this.selectedRow = row;
    this.rowSelected.emit(row);
  }

}
