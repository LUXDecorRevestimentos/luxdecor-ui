import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ManagerTable } from '../../../data/table.data';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manager-table',
  imports: [  MatIcon, MatTableModule, CommonModule ],
  templateUrl: './manager-table.component.html',
  styleUrl: './manager-table.component.css'
})
export class ManagerTableComponent {

  @Input() detailTable!: ManagerTable[];
  @Output() rowSelected: EventEmitter<ManagerTable> = new EventEmitter();

  displayedColumns: string[] = ['adminId', 'name', 'email', 'phone', 'date', 'lastAccess'];
  dataSource = new MatTableDataSource<ManagerTable>();
  selectedRow: ManagerTable | null = null;

  ngOnInit(): void {
    this.dataSource.data = this.detailTable;
    console.log('detailTable', this.detailTable);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onRowClicked(row: ManagerTable): void {
    this.selectedRow = row;
    this.rowSelected.emit(row);
  }

}
