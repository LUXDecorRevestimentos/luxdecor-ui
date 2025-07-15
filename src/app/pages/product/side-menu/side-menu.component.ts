import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
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

export class SideMenuComponent implements OnInit, OnChanges{
  subCategoryTitle: string = 'SubCategorias' 

  @Input() subCategorys: string[] = [];
  @Input() installTypes: string[] = [];
  @Input() brands: string[] = [];
  @Input() priceRange: any;

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

  ngOnInit(): void {
    if(this.priceRange != undefined && this.priceRange.end >= 0)
      this.min = this.priceRange.start;
      this.max = this.priceRange.end + 10;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['priceRange'] && changes['priceRange'].currentValue) {
      this.updateSliderRange();
    }
  }

  private updateSliderRange(): void {
    if (this.priceRange) {
      this.min = this.priceRange.start;
      this.max = Math.max(this.priceRange.end + 10, this.priceRange.start + 10);
      this.priceRange.start = Math.max(this.priceRange.start, this.min);
      this.priceRange.end = Math.min(this.priceRange.end, this.max);
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


  formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return `${value}`;
  }

}
