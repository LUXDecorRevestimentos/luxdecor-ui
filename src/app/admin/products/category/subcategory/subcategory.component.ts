import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { SubCategoryTableComponent } from './subcategory-table/subcategory-table.component';
import { SubCategory } from '../../../data/category.data';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-subcategory',
  imports: [MatIcon, SubCategoryTableComponent, CommonModule],
  templateUrl: './subcategory.component.html',
  styleUrl: './subcategory.component.css'
})
export class SubCategoryComponent {

  @Input() subCategories!: SubCategory[]; 

}
