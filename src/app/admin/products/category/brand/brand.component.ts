import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrandTableComponent } from './brand-table/brand-table.component';
import { Brand } from '../../../data/category.data';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-brand',
  imports: [ CommonModule, BrandTableComponent, MatIcon ],
  templateUrl: './brand.component.html',
  styleUrl: './brand.component.css'
})
export class BrandComponent {

  @Input() brands!: Brand[];

}
