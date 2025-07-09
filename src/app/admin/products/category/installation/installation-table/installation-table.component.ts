import { Component, Input, Output, EventEmitter, SimpleChange } from '@angular/core';
import { Installation } from '../../../../data/category.data';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-installation-table',
  imports: [MatTableModule, CommonModule],
  templateUrl: './installation-table.component.html',
  styleUrl: './installation-table.component.css'
})
export class InstallationTableComponent {

  private _installations: Installation[] = [];
  dataSource = new MatTableDataSource<Installation>();

  @Input() resetSelection: boolean = false;
  @Input()
  set installations(value: Installation[]){
    this._installations = [...value];
    this.dataSource.data = this._installations;
  }
  get subCategories(): Installation[] {
    return this._installations;
  } 
  @Output() rowSelected: EventEmitter<Installation> = new EventEmitter<Installation>();

  displayedColumns: string[] = ['installation_id', 'title', 'price'];
  selectedRow: Installation | null = null;

  constructor() {}

  ngOnChanges(changes: SimpleChange){
    if (this.resetSelection) {
      this.selectedRow = null;
    }
  }

  onRowClicked(row: Installation){
    this.rowSelected.emit(row);
    this.selectedRow = row;
  }

}
