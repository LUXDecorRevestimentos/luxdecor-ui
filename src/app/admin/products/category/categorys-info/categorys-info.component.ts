import { Component, Input, OnInit } from '@angular/core';
import { Brand, CategoryInfo, Topic } from '../../../data/category.data';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { SubCategory } from '../../../data/category.data';
import { SubCategoryComponent } from '../subcategory/subcategory.component';
import { BrandComponent } from '../brand/brand.component';
import { TopicComponent } from '../topic/topic.component';
import { MatIcon } from '@angular/material/icon';
import { DetailsTableComponent } from '../../details-table/details-table.component';


@Component({
  selector: 'app-categorys-info',
  imports: [
    CommonModule,
    FormsModule,
    MatSelectModule,
    SubCategoryComponent,
    BrandComponent,
    TopicComponent,
    MatIcon,
    DetailsTableComponent
],
  templateUrl: './categorys-info.component.html',
  styleUrl: './categorys-info.component.css'
})
export class CategorysInfoComponent implements OnInit{

  @Input() categoryInfo!: CategoryInfo;

  subCategories!: SubCategory[];
  brands!: Brand[];
  topic!: Topic[];
  
  selectedOption: string = 'Produtos';

  ngOnInit(): void {
    this.subCategories = this.categoryInfo.subCategories;
    this.brands = this.categoryInfo.brands;
    this.topic = this.categoryInfo.topics;
    console.log(this.subCategories)
  }

  onSelectChange(event: any) {
    this.selectedOption = event;
  }
}
