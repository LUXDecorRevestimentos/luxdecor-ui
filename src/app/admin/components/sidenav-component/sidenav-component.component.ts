import { Component, OnInit , Output, EventEmitter} from '@angular/core';
import { MatIcon } from '@angular/material/icon'; 
import { BarComponent } from '../../../shared/bar/bar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidenav',
  imports: [
    MatIcon,
    BarComponent,
    CommonModule],
  templateUrl: './sidenav-component.component.html',
  styleUrl: './sidenav-component.component.css'
})
export class SidenavComponent {
  @Output() buttonClick = new EventEmitter<string>();
  activeIdentifier: string | null = 'dashboard';

  showDashboard(identifier: string) {
    this.activeIdentifier = identifier;
    this.buttonClick.emit(identifier);
  }

  isActive(identifier: string): boolean {
    return this.activeIdentifier === identifier;
  }
}