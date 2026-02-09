import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { SubCategoryTableComponent } from './subcategory-table/subcategory-table.component';
import { SubCategory } from '../../../data/category.data';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BannerImgComponent } from '../banner-img/banner-img.component';
import { BannerService } from '../../../service/banner.auth.service';
import { MatDialog } from '@angular/material/dialog';
import { AlertModalComponent } from '../../../components/alert-modal/alert-modal.component';


@Component({
  selector: 'app-subcategory',
  imports: [
    MatIcon,
    SubCategoryTableComponent,
    CommonModule,
    FormsModule,
    BannerImgComponent
  ],
  templateUrl: './subcategory.component.html',
  styleUrl: './subcategory.component.css'
})
export class SubCategoryComponent {

  @Input() subCategories!: SubCategory[];
  @Output() subCategoryEvent = new EventEmitter<[SubCategory, String]>();

  constructor (private bannerService: BannerService,  private dialog: MatDialog){}

  title!: string;
  selectedSubCategory!: SubCategory | undefined;    
  currentSubCategories: SubCategory[] = [];
  subCategoryBanner: any;
  resetTableSelectionFlag = false;


  ngOnInit() {
    this.currentSubCategories = [...this.subCategories];
  }

  handleSubCategorySelection(subcategory: SubCategory) {
    this.selectedSubCategory = subcategory;
    this.title = subcategory.title
    this.handleGetSubCategoryBanner(this.selectedSubCategory)
  }

  handleBannerChange(img: any){
    this.onUploadImgs(img)
  }

  handleGetSubCategoryBanner(subCategory: SubCategory){
    this.bannerService.getImgs(subCategory.banner_id).subscribe((data) => {
      this.subCategoryBanner = data
    })
  }

  saveSubCategory() {
    const newTitle = this.title.trim();
    if (!newTitle) return;
    const isDuplicate = this.currentSubCategories.some(sc => {
      const isSameTitle = sc.title.trim().toLowerCase() === newTitle.toLowerCase();
      if (this.selectedSubCategory) {
        return isSameTitle && sc.subcategory_id !== this.selectedSubCategory.subcategory_id;
      }
      return isSameTitle;
    });
    if (isDuplicate) {
      this.openAlert();
      return;
    } else {
      if (this.selectedSubCategory == null) {
        let temporarySubCategory: SubCategory = {
          category_id: "#00000000",
          subcategory_id: `#${Math.random().toString(36).substring(2, 10).padStart(8, '0')}`,
          title: newTitle,
          banner_id: "",
          items: 0
        };
        this.subCategoryEvent.emit([temporarySubCategory, "add"]);
        this.clearInput();
      }
      else {
        this.selectedSubCategory.title = newTitle;
        this.subCategoryEvent.emit([this.selectedSubCategory, "update"]);
        this.clearInput();
      }
    }
  }

  openAlert() {
    this.dialog.open(AlertModalComponent, {
      data: {
        title: 'Atenção',
        message: `SubCategoria ja existente!`,
        showCancel: false
      },
      disableClose: true
    });
  }


  deleteSubCategory(){
    if (this.selectedSubCategory)
      this.subCategoryEvent.emit([this.selectedSubCategory, "remove"]);
      this.title = '';
  }

  newSubCategory(){
    this.clearInput()
    this.selectedSubCategory = undefined
    this.resetTableSelectionFlag = true;    
    setTimeout(() => this.resetTableSelectionFlag = false, 0);
  }

  onUploadImgs(imgs: any): void {
    let subcategory_id = this.selectedSubCategory?.subcategory_id
    let banner_id = this.selectedSubCategory?.banner_id
    if (subcategory_id && banner_id) {
      this.bannerService.uploadImgs(imgs, subcategory_id, banner_id).subscribe({
        next: response => {},
        error: error => console.error('Error updating subcategory:', error)
      });
    }
  }

  clearInput(){
    this.title = '';
  }
}
