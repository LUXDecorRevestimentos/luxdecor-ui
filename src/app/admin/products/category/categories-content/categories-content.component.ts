import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { CategoryTable, CategoryInfo, CategoryType } from '../../../data/category.data';
import { CategoryAuthService } from '../../../service/category.auth.service';
import { CategoryTableComponent } from '../category-table/category-table.component';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { CategoryInfoComponent } from '../category-info/category-info.component';
import { catchError, finalize, switchMap } from 'rxjs';
import { BannerService } from '../../../service/banner.auth.service';

@Component({
  selector: 'app-categorys-content',
  imports: [CategoryTableComponent, MatIcon, CommonModule, CategoryInfoComponent],
  templateUrl: './categories-content.component.html',
  styleUrl: './categories-content.component.css'
})
export class CategoriesContentComponent  implements OnInit{

  @Input() categories: CategoryTable[]  = [];
  @Output() rowSelected: EventEmitter<CategoryTable> = new EventEmitter();
  
  details: boolean = false;
  addOp: boolean = false;
  editOp: boolean = false;

  categoryInfo: CategoryInfo | undefined;
  categoryInfoUpdate: CategoryInfo | undefined;
  loading = false;

  constructor(private categoryService: CategoryAuthService,
    private bannerService: BannerService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  handleButtonClick(identifier: string) {
    if(identifier === 'add') {
      this.details = true;
      this.categoryService.cleanCategory().subscribe((data) => {
        this.categoryInfo = data
      });
      this.addOp = true;
      this.editOp = false
    } else if(identifier === 'edit') {
      this.categoryInfo = undefined;
      this.editOp = true;
      this.addOp = false;
    }
  }

  onRowSelectedProduct(row: CategoryTable) {
    if (row == undefined) {
      this.categoryInfo = undefined;
    } else {
      this.details = true;
      this.categoryInfo = undefined
      this.categoryService.getCategoryInfo(row.category_id).subscribe((data) => {
        this.categoryInfo = data;
      });
    } 
  }

  loadCategories(): void {
    this.loading = true;
    this.categoryService.getCategories().pipe(
      catchError(err => {
        console.error('Error loading categories:', err);
        return [];
      }),
      finalize(() => this.loading = false)
    ).subscribe(data => {
      this.categories = data;
    });
  }

  onCategoryUpdate(category: CategoryInfo): void {
    this.categoryInfoUpdate = category;
    if (this.addOp) {
      this.handleAddOperation(category);
    } else if (this.editOp) {
      this.handleEditOperation(category);
    }
  }

  private handleAddOperation(category: CategoryInfo): void {
    this.categoryService.postCategory(this.categoryInfo).pipe(
      switchMap((response) => {
          this.categoryInfo = this.categoryService.mapToCategoryInfo(response);
          category.category_id = this.categoryInfo.category_id;
          return this.categoryService.updateCategory(category);
      })
    ).subscribe({
        next: (updateResponse) => {
          this.loadCategories();
          this.resetOperations();
        },
        error: (error) => {
            console.error('Erro no fluxo:', error);
        }
    });
  }

  private handleEditOperation(category: CategoryInfo): void {
    this.categoryService.updateCategory(category).subscribe({
      next: response => {
        this.loadCategories();
        this.resetOperations();
      },
      error: error => console.error('Error updating category:', error)
    });
  }

  private resetOperations(): void {
    this.addOp = false;
    this.editOp = false;
    this.details = false;
  }
}