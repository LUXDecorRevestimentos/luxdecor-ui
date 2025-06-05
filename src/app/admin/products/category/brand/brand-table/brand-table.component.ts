import { Component, Input, OnInit, EventEmitter, Output, SimpleChanges, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Brand } from '../../../../data/category.data';


@Component({
  selector: 'app-brand-table',
  imports: [MatTableModule, CommonModule],
  templateUrl: './brand-table.component.html',
  styleUrl: './brand-table.component.css'
})
export class BrandTableComponent implements OnChanges {
  private _brands: Brand[] = [];
  dataSource = new MatTableDataSource<Brand>();

  @Input() resetSelection: boolean = false;
  @Input() 
  set brands(value: Brand[]) {
    this._brands = [...value];
    this.dataSource.data = this._brands;
  }
  get subCategories(): Brand[] {
    return this._brands;
  }

  displayedColumns: string[] = ['brand_id', 'title', 'items'];

  @Output() rowSelected: EventEmitter<Brand> = new EventEmitter<Brand>();

  selectedRow: Brand | null = null;

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['brands']) {
    }
    if (this.resetSelection) {
      this.selectedRow = null;
    }
  }

  onRowClicked(row: Brand): void {
    this.rowSelected.emit(row);
    this.selectedRow = row;
  }

}
