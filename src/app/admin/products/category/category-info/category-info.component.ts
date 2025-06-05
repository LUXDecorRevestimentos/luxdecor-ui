import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Brand, CategoryInfo, DetailsData, Topic, Data, CategoryStatusLabels, CategoryType } from '../../../data/category.data';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { SubCategory } from '../../../data/category.data';
import { SubCategoryComponent } from '../subcategory/subcategory.component';
import { BrandComponent } from '../brand/brand.component';
import { TopicComponent } from '../topic/topic.component';
import { MatIcon } from '@angular/material/icon';
import { DetailsTableComponent } from '../../details-table/details-table.component';
import { BannerImgComponent } from '../banner-img/banner-img.component';
import { BannerService } from '../../../service/banner.auth.service';

@Component({
  selector: 'app-category-info',
  imports: [
    CommonModule,
    FormsModule,
    MatSelectModule,
    SubCategoryComponent,
    BrandComponent,
    TopicComponent,
    MatIcon,
    DetailsTableComponent,
    BannerImgComponent
],
  templateUrl: './category-info.component.html',
  styleUrl: './category-info.component.css'
})
export class CategoryInfoComponent implements OnInit, OnChanges{

  @Input() categoryInfo!: CategoryInfo;
  categoryTemporary: Partial<CategoryInfo> = {};

  @Input() categoryImg!: any;
  @Input() subcategoryImg!: any[];
  @Input() brandImg!: any[];

  @Output() categoryUpdate = new EventEmitter<CategoryInfo>(); 
  @Output() categoryImgUpdate = new EventEmitter<any>();

  constructor (private bannerService: BannerService){}

  categoryTitle: string = "";
  subCategories!: SubCategory[];
  brands!: Brand[];
  topic!: Topic[];
  dimensions!: DetailsData;
  details!: DetailsData;
  categoryBanner: any;
  selectedOption: string = "0";

  ngOnInit(): void {
    this.categoryTitle = this.categoryInfo.title
    this.subCategories = this.categoryInfo.subcategory;
    this.selectedOption = this.categoryInfo.category_type.toString()
    this.brands = this.categoryInfo.brand;
    this.topic = this.categoryInfo.topic;
    this.dimensions = {
      title: "Dimensões",
      data: this.categoryInfo.dimensions.map(dimensions => ({
        key: dimensions.key,
        value: dimensions.value,
        data_id: dimensions.data_id
      })) as Data[]
    };

    this.details = {
      title: "Detalhes",
      data: this.categoryInfo.details.map(detail => ({
        key: detail.key,
        value: detail.value,
        data_id: detail.data_id
      })) as Data[]
    };
    this.handleGetCategoryBanner(this.categoryInfo)
  }

  handleBannerChange(img: any){
    this.onUploadImgs(img)
  }

  handleGetCategoryBanner(category: CategoryInfo){
    this.bannerService.getImgs(category.banner_id).subscribe((data) => {
      this.categoryBanner = data
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['categoryInfo'] && changes['categoryInfo'].currentValue) {
      const newCategoryInfo = changes['categoryInfo'].currentValue as Partial<CategoryInfo>;
      this.updateCategoryTemporary(newCategoryInfo);
    }
  }  

  updateCategoryTemporary(newData: Partial<CategoryInfo>): void {
    this.categoryTemporary = {
      ...this.categoryTemporary,
      category_id: newData.category_id,
      title: newData.title,
      banner_id: newData.banner_id,
      subcategory: newData.subcategory,
      brand: newData.brand,
      topic: newData.topic,
      category_type: newData.category_type,
      dimensions: newData.dimensions,
      details: newData.details
    };
  }
  

  onSelectChange(event: any) {
    this.selectedOption = event;
  }

  getLabelStatus(categoryType: any): string {
    let categoryTypeLabel: string = "";
    if ( categoryType && categoryType !== undefined) {
      categoryTypeLabel = CategoryStatusLabels[categoryType] || 'Unknown Status';
    }
    return categoryTypeLabel;
  }

  onSaveCategory(){
    this.categoryInfo.title = this.categoryTitle
    this.categoryInfo.details = this.details.data
    this.categoryInfo.dimensions = this.dimensions.data
    this.categoryUpdate.emit(this.categoryInfo)
    this.categoryImgUpdate.emit(this.categoryImg)
  }

  onImageCategory(categoryBanner: any) {
    this.categoryImg = categoryBanner
  }

  onSubCategoryEvent(newSubCategory: [SubCategory, String]) {
    const [subCategory, action] = newSubCategory;
    
    switch(action) {
      case 'add':
        this.handleAddSubCategory(subCategory);
        break;
        
      case 'remove':
        this.handleRemoveSubCategory(subCategory);
        break;
        
      case 'update':
        this.handleUpdateSubCategory(subCategory);
        break;
        
      default:
        console.warn(`Ação desconhecida: ${action}`);
    }
  }
  
  private handleAddSubCategory(subCategory: SubCategory) {
    const exists = this.categoryInfo.subcategory.some(
      sc => sc.subcategory_id === subCategory.subcategory_id
    );
    
    if (!exists) {
      this.categoryInfo.subcategory = [
        ...this.categoryInfo.subcategory, 
        subCategory
      ];
    } else {
      console.warn('Subcategoria já existe:', subCategory);
    }
  }
  
  private handleRemoveSubCategory(subCategory: SubCategory) {
    this.categoryInfo.subcategory = this.categoryInfo.subcategory.filter(
      sc => sc.subcategory_id !== subCategory.subcategory_id
    );
  }
  
  private handleUpdateSubCategory(updatedSubCategory: SubCategory) {
    this.categoryInfo.subcategory = this.categoryInfo.subcategory.map(sc => 
      sc.subcategory_id === updatedSubCategory.subcategory_id 
        ? updatedSubCategory 
        : sc
    );
  }
  // Brand
  onBrandEvent(newBrand: [Brand, String]) {
    const [brand, action] = newBrand;
    
    switch(action) {
      case 'add':
        this.handleAddBrand(brand);
        break;
        
      case 'remove':
        this.handleRemoveBrand(brand);
        break;
        
      case 'update':
        this.handleUpdateBrand(brand);
        break;
        
      default:
        console.warn(`Ação desconhecida: ${action}`);
    }
  }

  private handleAddBrand(brand: Brand) {
    const exists = this.categoryInfo.brand.some(
      brnd => brnd.brand_id === brand.brand_id
    );
    
    if (!exists) {
      this.categoryInfo.brand = [
        ...this.categoryInfo.brand, 
        brand
      ];
    } else {
      console.warn('Brand já existe:', brand);
    }
  }

  private handleRemoveBrand(brand: Brand) {
    this.categoryInfo.brand = this.categoryInfo.brand.filter(
      brnd => brnd.brand_id !== brand.brand_id
    );
  }

  private handleUpdateBrand(brand: Brand) {
    this.categoryInfo.brand = this.categoryInfo.brand.map(brnd => 
      brnd.brand_id === brand.brand_id 
        ? brand 
        : brnd
    );
  }


  // Topic
  onTopicEvent(newTopic: [Topic, String]) {
    const [topic, action] = newTopic;
    
    switch(action) {
      case 'add':
        this.handleAddTopic(topic);
        break;
        
      case 'remove':
        this.handleRemoveTopic(topic);
        break;
        
      case 'update':
        this.handleUpdateTopic(topic);
        break;
        
      default:
        console.warn(`Ação desconhecida: ${action}`);
    }
  }

  private handleAddTopic(topic: Topic) {
    const exists = this.categoryInfo.topic.some(
      tp => tp.topic_id === topic.topic_id
    );
    
    if (!exists) {
      this.categoryInfo.topic = [
        ...this.categoryInfo.topic, 
        topic
      ];
    } else {
      console.warn('Topic já existe:', topic);
    }
  }

  private handleRemoveTopic(topic: Topic) {
    this.categoryInfo.topic = this.categoryInfo.topic.filter(
      tp => tp.topic_id !== topic.topic_id
    );
  }

  private handleUpdateTopic(topic: Topic) {
    this.categoryInfo.topic = this.categoryInfo.topic.map(tp => 
      tp.topic_id === tp.topic_id
        ? tp
        : tp
    );
  }

  // Detail
  onDetailEvent(newDetail: [Data, String, String]) {
    const [detail, action, listName] = newDetail;
    switch(action) {
      case 'add':
        this.handleAddDetail(detail, listName);
        break;
        
      case 'remove':
        this.handleRemoveDetail(detail, listName);
        break;
        
      case 'update':
        this.handleUpdateDetail(detail, listName);
        break;
        
      default:
        console.warn(`Ação desconhecida: ${action}`);
    }
  }

  private handleAddDetail(detail: Data, listName: String) {
    if (listName == "detalhes"){
      if (!this.details.data.some(d => d.key === detail.key)) {
        this.details = {
          ...this.details,
          data: [...this.details.data, detail]
        };
      } else {
        console.warn('Item já existe:', detail.key);
      }
    } else if (listName == "dimensões") {
      if (!this.dimensions.data.some(d => d.key === detail.key)) {
        this.dimensions = {
          ...this.dimensions,
          data: [...this.dimensions.data, detail]
        };
      } else {
        console.warn('Item já existe:', detail.key);
      }
    }
  }

  private handleRemoveDetail(detail: Data, listName: String) {
    if (listName == "detalhes"){
      if (this.details.data.some(d => d.key === detail.key)) {
        this.details = {
          ...this.details,
          data: this.details.data.filter(d => d.key !== detail.key)
        };
      } else {
        console.warn('Item não encontrado para remoção:', detail.key);
      }
    } else if (listName == "dimensões"){
      if (this.dimensions.data.some(d => d.key === detail.key)) {
        this.dimensions = {
          ...this.dimensions,
          data: this.dimensions.data.filter(d => d.key !== detail.key)
        };
      } else {
        console.warn('Item não encontrado para remoção:', detail.key);
      } 
    }
  }

  private handleUpdateDetail(updatedDetail: Data, listName: String) {
    if (!updatedDetail.key) {
      console.error('Tentativa de atualização sem chave válida');
      return;
    }
    if (listName == "detalhes"){

      const index = this.details.data.findIndex(d => d.key === updatedDetail.key);
      
      if (index >= 0) {
        this.details = {
          ...this.details,
          data: this.details.data.map((item, i) => 
            i === index ? updatedDetail : item
          )
        };
      } else {
        console.warn('Item não encontrado para atualização:', updatedDetail.key);
      }
    } else if (listName == "dimensões") {

      const index = this.dimensions.data.findIndex(d => d.key === updatedDetail.key);
    
      if (index >= 0) {
        this.dimensions = {
          ...this.dimensions,
          data: this.dimensions.data.map((item, i) => 
            i === index ? updatedDetail : item
          )
        };
      } else {
        console.warn('Item não encontrado para atualização:', updatedDetail.key);
      }
    }
  }

  onUploadImgs(imgs: any): void {
    let category_id = this.categoryInfo?.category_id
    let banner_id = this.categoryInfo?.banner_id
    if (category_id && banner_id) {
      this.bannerService.uploadImgs(imgs, category_id, banner_id).subscribe({
        next: response => {},
        error: error => console.error('Error updating category:', error)
      });
    }
  }
}
