import { Component, EventEmitter, Inject, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { BarComponent } from '../../../shared/bar/bar.component';
import { ModalFilter } from '../../../data/product.data';

@Component({
  selector: 'app-side-menu-modal',
  standalone: true,
  imports: [
    CommonModule, 
    MatDialogModule, 
    MatButtonModule, 
    MatChipsModule, 
    MatSliderModule, 
    MatCardModule, 
    FormsModule, 
    BarComponent
  ],
  templateUrl: './side-menu-modal.component.html',
  styleUrls: ['./side-menu-modal.component.css']
})
export class SideMenuModalComponent implements OnInit {
  subCategoryTitle: string = 'SubCategorias';

  selectedSubCategories: string[] = [];
  selectedInstallTypes: string[] = [];
  selectedBrands: string[] = [];

  @Output() filtersChanged = new EventEmitter<any>();
  @Output() subCategoriesChanged = new EventEmitter<string[]>();
  @Output() installTypesChanged = new EventEmitter<string[]>();
  @Output() brandsChanged = new EventEmitter<string[]>();
  @Output() priceRangeChanged = new EventEmitter<{start: number, end: number}>();

  disabled = false;
  max = 100;
  min = 0;
  showTicks = false;
  step = 1;
  thumbLabel = false;
  value = 0;
  highValue: number = 100;
  sliderOptions = {
    floor: 0,
    ceil: 100
  };
  priceRange: any;
  private sliderInitialized = false;

  constructor(
    public dialogRef: MatDialogRef<SideMenuModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { modalInfo: ModalFilter }
  ) {console.log(data)

    this.selectedSubCategories.push(data.modalInfo.selectedSubCategories)
    this.selectedBrands.push(data.modalInfo.selectedBrands)
    this.selectedInstallTypes.push(data.modalInfo.selectedInstallTypes)
  }

  ngOnInit(): void {
    this.priceRange = this.data?.modalInfo.priceRange;
    if (this.priceRange) {
      this.min = this.priceRange.start;
      this.max = this.priceRange.end;
    }
  }

  onSubCategoryChange(subCategory: string, event: any) {
    if (event.selected) {
      this.selectedSubCategories = [];
      this.selectedSubCategories.push(subCategory);
    } else {
      this.selectedSubCategories = this.selectedSubCategories.filter(item => item !== subCategory);
    }
    this.subCategoriesChanged.emit(this.selectedSubCategories);
    this.emitAllFilters();
  }

  onInstallTypeChange(installType: string, event: any) {
    if (event.selected) {
      this.selectedInstallTypes = [];
      this.selectedInstallTypes.push(installType);
    } else {
      this.selectedInstallTypes = this.selectedInstallTypes.filter(item => item !== installType);
    }
    this.installTypesChanged.emit(this.selectedInstallTypes);
    this.emitAllFilters();
  }

  onBrandChange(brand: string, event: any) {
    if (event.selected) {
      this.selectedBrands = [];
      this.selectedBrands.push(brand);
    } else {
      this.selectedBrands = this.selectedBrands.filter(item => item !== brand);
    }
    this.brandsChanged.emit(this.selectedBrands);
    this.emitAllFilters();
  }

  onPriceRangeChange() {
    this.priceRangeChanged.emit(this.priceRange);
    this.emitAllFilters();
  }


  private emitAllFilters() {
    this.filtersChanged.emit({
      subCategories: this.selectedSubCategories,
      installTypes: this.selectedInstallTypes,
      brands: this.selectedBrands,
      priceRange: this.priceRange
    });
  }

  applyFilters() {
    this.emitAllFilters();
    this.dialogRef.close({
      subCategories: [...this.selectedSubCategories],
      installTypes: [...this.selectedInstallTypes],
      brands: [...this.selectedBrands],
      priceRange: {...this.priceRange}
    });
  }

  formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }
    return `${value}`;
  }
}