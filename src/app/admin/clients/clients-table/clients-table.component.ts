import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ClientTable } from '../../../data/table.data';


@Component({
  selector: 'app-clients-table',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule, 
    MatIcon, 
    CommonModule
  ],
  templateUrl: './clients-table.component.html',
  styleUrl: './clients-table.component.css'
})
export class ClientsTableComponent implements OnInit {

  @Input() detailTable!: ClientTable[];
  @Output() rowSelected: EventEmitter<ClientTable> = new EventEmitter();

  displayedColumns: string[] = ['clientId', 'clientName', 'email', 'phoneNumber', 'date'];
  dataSource = new MatTableDataSource<ClientTable>();
  selectedRow: ClientTable | null = null;

  ngOnInit(): void {
    this.dataSource.data = this.detailTable;
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onRowClicked(row: ClientTable): void {
    this.selectedRow = row;
    this.rowSelected.emit(row);
  }
  
}
