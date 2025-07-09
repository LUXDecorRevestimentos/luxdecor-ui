import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { InstallationOptions } from '../../../data/product.data';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-method-installation-card',
  imports: [MatIconModule, CommonModule],
  templateUrl: './method-installation-card.component.html',
  styleUrl: './method-installation-card.component.css'
})
export class MethodInstallationCardComponent {

  @Input() installationOptions: InstallationOptions[] = [];

  selectedMethod: string | null = null;

  selectMethod(method: string) {
    this.selectedMethod = method;
  }

}
