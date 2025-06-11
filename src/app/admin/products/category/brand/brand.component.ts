import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrandTableComponent } from './brand-table/brand-table.component';
import { Brand } from '../../../data/category.data';
import { MatIcon } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { BannerImgComponent } from '../banner-img/banner-img.component';
import { BannerService } from '../../../service/banner.auth.service';

@Component({
  selector: 'app-brand',
  imports: [
    CommonModule,
    BrandTableComponent,
    MatIcon,
    FormsModule,
    BannerImgComponent
  ],
  templateUrl: './brand.component.html',
  styleUrl: './brand.component.css'
})
export class BrandComponent {

  @Input() brands!: Brand[];
  @Output() brandEvent = new EventEmitter<[Brand, String]>();

  constructor (private bannerService: BannerService){}

  title!: string;
  selectedBrand!: Brand | null;
  currentBrands: Brand[] = [];
  brandBanner: any;
  resetTableSelectionFlag = false;

  ngOnInit(){
    this.currentBrands = [...this.brands];
  }

  handleBrandSelection(brand: Brand) {
    this.selectedBrand = brand;
    this.title = brand.title;
    this.handleGetBrandBanner(this.selectedBrand)
  }
  
  handleBannerChange(img: any){
    this.onUploadImgs(img)
  }

  handleGetBrandBanner(brand: Brand){
    this.bannerService.getImgs(brand.banner_id).subscribe((data) => {
      this.brandBanner = data
    })
  }

  saveBrand(){
    if (this.title.trim() && this.selectedBrand == null){
      let temporaryBrand: Brand = {
        brand_id: `#${Math.random().toString(36).substring(2, 10).padStart(8, '0')}`,
        title: this.title,
        banner_id: "",
        items: 0
      }
      this.brandEvent.emit([temporaryBrand, "add"]);
      this.clearInput()
    }
    else if(this.title.trim() && this.selectedBrand != null){
      this.selectedBrand.title = this.title;
      this.brandEvent.emit([this.selectedBrand, "update"]);
    }
  }

  deleteBrand(){
    if (this.selectedBrand){
      this.brandEvent.emit([this.selectedBrand, "remove"]);
      this.title = "";
    }
  }

  newBrand(){
    this.clearInput();
    this.selectedBrand = null;
    this.resetTableSelectionFlag = true;
    setTimeout(() => this.resetTableSelectionFlag = false, 0);
  }

  onUploadImgs(imgs: any): void {
    let brand_id = this.selectedBrand?.brand_id
    let banner_id = this.selectedBrand?.banner_id
    if (brand_id && banner_id) {
      this.bannerService.uploadImgs(imgs, brand_id, banner_id).subscribe({
        next: response => {},
        error: error => console.error('Error updating brand:', error)
      });
    }
  }

  clearInput(){
    this.title = '';    
  }
}
