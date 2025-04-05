import { Component, ViewChild } from '@angular/core';
import { SidenavComponent } from './components/sidenav-component/sidenav-component.component'; // Adjust import path accordingly
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';

@Component({
  selector: 'app-admin',
  imports: [SidenavComponent, CommonModule, DashboardComponent],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  @ViewChild(SidenavComponent) sidenav!: SidenavComponent;
  contentToDisplay: string = '';

  ngOnInit(): void {
    console.log('Admin component initialized');
  }

  handleButtonClick(identifier: string) {
    this.contentToDisplay = identifier; // Update the displayed content based on the button clicked
    console.log('Sidenav:', identifier);

  }
}
