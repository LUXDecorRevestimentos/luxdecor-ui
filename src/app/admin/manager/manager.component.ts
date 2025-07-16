import { Component, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { ManagerTableComponent } from './manager-table/manager-table.component';
import { AuthService } from '../service/auth.service';
import { ManagerCardComponent } from './manager-card/manager-card.component';
import { AdminData } from '../data/admin.data';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manager',
  imports: [
    ManagerTableComponent,
    MatIcon,
    ManagerCardComponent,
    CommonModule
  ],
  templateUrl: './manager.component.html',
  styleUrl: './manager.component.css'
})
export class ManagerComponent implements OnInit{

  managers!: AdminData[];
  details: boolean = false;
  addOp: boolean = false;
  editOp: boolean = false;

  adminInfo:  AdminData | undefined;
  

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.populateTable()
  }

  populateTable() {
    this.authService.getAdminTable().subscribe((manager) => {
      this.managers = manager;
    });
  }


  handleButtonClick(identifier: string) {
    if(identifier === 'add') {
      this.details = true;
      this.authService.cleanAdmin().subscribe((data) => {
        this.adminInfo = data
      })
      this.addOp = true;
      this.editOp = false
    } else if(identifier === 'edit') {
      this.adminInfo = undefined;
      this.editOp = true;
      this.addOp = false;
      this.adminInfo = undefined;
      this.authService.cleanAdmin().subscribe((data) => {
        this.adminInfo = data
      })
    }
  }

  onRowSelectedManager(row: any | undefined) {
    if (row == undefined) {
      this.adminInfo = undefined;
    } else {
      this.adminInfo = undefined;
      this.authService.getAdmin(row.adminId).subscribe((data) => {
        console.log(data)
        this.adminInfo = data;
        console.log(this.adminInfo)
      })
      this.details = true;
    }
  } 

  onUpdateManager(newAdminData: AdminData){
    console.log(newAdminData)
    this.authService.updateAdmin(newAdminData).subscribe({})
  }

}
