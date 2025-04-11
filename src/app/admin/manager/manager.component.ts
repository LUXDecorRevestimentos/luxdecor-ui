import { Component, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { ManagerTableComponent } from './manager-table/manager-table.component';
import { AuthService } from '../service/auth.service';
import { ManagerTable } from '../../data/table.data';
import { ManagerCardComponent } from './manager-card/manager-card.component';

@Component({
  selector: 'app-manager',
  imports: [ ],
  templateUrl: './manager.component.html',
  styleUrl: './manager.component.css'
})
export class ManagerComponent implements OnInit{

  managers!: ManagerTable[];
  details: boolean = false;
  addOp: boolean = false;
  editOp: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.populateTable()
  }

  populateTable() {
    this.authService.getManagerTable().subscribe((manager) => {
      this.managers = manager;
    });
  }

    
  handleButtonClick(identifier: string) {
    if(identifier === 'add') {
      this.addOp = !this.addOp;
    } else if(identifier === 'edit') {
      this.editOp = !this.editOp;
    }
  }
}
