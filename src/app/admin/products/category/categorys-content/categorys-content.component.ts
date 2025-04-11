import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { CategoryTable, CategoryInfo } from '../../../data/category.data';
import { CategoryAuthService } from '../../../service/category.auth.service';
import { CategorysTableComponent } from '../categorys-table/categorys-table.component';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { CategorysInfoComponent } from '../categorys-info/categorys-info.component';

@Component({
  selector: 'app-categorys-content',
  imports: [CategorysTableComponent, MatIcon, CommonModule, CategorysInfoComponent],
  templateUrl: './categorys-content.component.html',
  styleUrl: './categorys-content.component.css'
})
export class CategorysContentComponent  implements OnInit{
  @Input() categorys: CategoryTable[]  = [];
  @Output() rowSelected: EventEmitter<CategoryTable> = new EventEmitter();

  details: boolean = false;
  addOp: boolean = false;
  editOp: boolean = false;

  categoryInfo!: CategoryInfo;

  constructor(private categoryService: CategoryAuthService) {}

  ngOnInit(): void {
    this.populateData()
  }

  populateData() {
    this.categoryService.getCategoryData().subscribe((data) => {
      this.categorys = data;
    });
  }

  handleButtonClick(identifier: string) {
    if(identifier === 'add') {
      this.addOp = !this.addOp;
    } else if(identifier === 'edit') {
      this.editOp = !this.editOp;
    }
  }

  onRowSelectedProduct(row: CategoryTable) {
    this.categoryService.getCategoryData().subscribe((category) => {
      this.categorys = category;
    });
    this.details = true;
    this.categoryService.getCategoryInfo().subscribe((data) => {
      this.categoryInfo = data;
    });
  }

}