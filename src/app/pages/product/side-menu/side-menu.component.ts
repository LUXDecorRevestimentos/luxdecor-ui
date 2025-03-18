import { Component } from '@angular/core';
import {MatChipsModule} from '@angular/material/chips';
import {MatSliderModule} from '@angular/material/slider';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import { BarComponent } from '../../../shared/bar/bar.component';

@Component({
  selector: 'app-side-menu',
  imports: [CommonModule, MatChipsModule, MatSliderModule, MatCardModule, FormsModule, BarComponent],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class SideMenuComponent {
  subCategoryTitle: string = 'SubCategorias' 
  readonly subCategorys: string[] = ['Vinilicos', 'Laminados'];
  readonly installTypes: string[] = ['Cola', 'Click'];
  readonly brands: string[] = ['Eucafloor', 'Durafloor', 'QuickStep']

  disabled = false;
  max = 100;
  min = 0;
  showTicks = false;
  step = 1;
  thumbLabel = false;
  value = 0;

  formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return `${value}`;
  }

}
