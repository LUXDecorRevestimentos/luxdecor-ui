import { Component, EventEmitter, Input, OnInit, Output, OnChanges, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { CategoryData, Data, DateDelivery, DetailsData, PriceType, ProductInfo } from '../../../data/category.data';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { ProductsImgComponent } from '../products-img/products-img.component';
import { ProductsPriceComponent } from '../products-price/products-price.component';
import { DetailsTableComponent } from '../../details-table/details-table.component';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-products-info',
  imports: [
    CommonModule,
    FormsModule,
    MatSelectModule,
    ProductsImgComponent,
    ProductsPriceComponent,
    DetailsTableComponent,
    MatIcon,
],
  templateUrl: './products-info.component.html',
  styleUrl: './products-info.component.css'
})
export class ProductsInfoComponent implements OnInit, OnChanges {

  @ViewChild('productNameInput') productNameInput!: ElementRef<HTMLInputElement>;

  @Input() productInfo!: ProductInfo;
  @Input() productImgs!: any[];
  @Input() categoryList!: any[];
  @Input() subcategoryList!: any[];
  @Input() brandList!: any[];
  @Input() detailData!: DetailsData;
  @Input() dimensionsData!: DetailsData;
  @Input() topicList: any[] = [];
  @Input() installationList: any[] = [];
  @Input() measuresList: any[] = [];

  @Output() categorySelected = new EventEmitter<string>();  
  @Output() subcategorySelected = new EventEmitter<string>();
  @Output() brandSelected = new EventEmitter<string>();
  @Output() newProduct = new EventEmitter<ProductInfo>();
  @Output() imgs = new EventEmitter<any>();

  selectedBrand!: string;
  selectedCategory!: string;
  selectedSubcategory!: string;
  selectedPriceType!: any;
  detailProduct!: DetailsData;
  dimensionsProduct!: DetailsData;
  priceType!: PriceType;
  priceInput!: string[];
  measuresInput!: string[];
  measureType!: number;
  installOption: string | null = null;
  installOptionList: string[] = [];
  selectedOptions: string[] = [];
  onSave: boolean = false;


  date_delivery_min!: number;
  date_delivery_max!: number;
  aboutText!: string;

  isAvailableSelected: boolean = false;
  isInstallationSelected: boolean = false;

  dateDelivery!: DateDelivery;

  constructor(private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void  {
    this.selectedCategory = this.productInfo.category_data.category_id
    this.selectedSubcategory = this.productInfo.category_data.subcategory_id
    this.selectedBrand = this.productInfo.category_data.brand_id
    this.selectedPriceType = this.productInfo.price_type
    this.measureType = this.productInfo.measure
    this.priceInput = this.productInfo.price
    this.measuresInput = this.productInfo.measures
    this.productInfo.topics.map(topic => this.updateSelection(topic.topic_id, true))
    this.isAvailableSelected = this.productInfo.available
    this.isInstallationSelected = this.productInfo.installation
    this.aboutText = this.productInfo.about
    this.cdRef.detectChanges();
    this.installOption = this.productInfo.installations[0]?.installation_id
    this.date_delivery_min = this.productInfo.date_delivery.min;
    this.date_delivery_max = this.productInfo.date_delivery.max;
  }

  ngOnChanges(changes: any): void {}

  onSubcategoryChange() {
    this.subcategorySelected.emit(this.selectedSubcategory);
  }

  onBrandChange() {
    this.brandSelected.emit(this.selectedBrand);
  }

  onSelectionChange() {
    this.categorySelected.emit(this.selectedCategory);
  }


  toggleInstallation(installId: string, isChecked: boolean) {
    this.installOption = isChecked ? installId : null;
  }

  updateSelection(value: string, isChecked: boolean) {
    if (isChecked) {
      this.selectedOptions = [...this.selectedOptions, value];
    } else {
      this.selectedOptions = this.selectedOptions.filter(item => item !== value);
    }
  }

  getSelectedOptionsObject() {
    return {
      available: this.isAvailableSelected,
      installation: this.isInstallationSelected
    };
  }

  receivedImages: any[] = [];

  handleImagesChanged(images: any[]) {
    this.receivedImages = images;
  }

  onSaveDetails(updatedData: [Data, String, String]) {
    const [detail, action, listName] = updatedData;
    if (listName.toLowerCase() == "detalhes"){
      this.detailData = {
        title: 'Detalhes',
        data: updatedData.map( item => ({
          key: item.toString(),
          value: item.toString(),
          data_id: item.toString()
        })
        )
      }
    } else if(listName.toLocaleLowerCase() == "dimensões"){
      this.dimensionsData ={
        title: 'Dimensions',
        data: updatedData.map( item => ({
          key: item.toString(),
          value: item.toString(),
          data_id: item.toString()
        })
        )
      }
    }
  }

  onPriceTypeChange(newPriceType: string) {
    if (newPriceType == PriceType.BOX){
      this.priceType = PriceType.BOX;
    }
    else {
      this.priceType = PriceType.UNITARY;
    }
  }
  
  onPricesUpdated(prices: string[]) {
    this.priceInput = prices
  }

  onMeasureChange(newMeasure: number) {
    this.measureType = newMeasure;
  }

  onMeasuresChange(newMeasures: string[]) {
    this.measuresInput = newMeasures;
  }

  onSaveProduct(){
    let category_data: CategoryData ={
      category_id: this.selectedCategory,
      category_title: "",
      brand_id: this.selectedBrand,
      brand_title: "",
      subcategory_id: this.selectedSubcategory,
      subcategory_title: ""
    }

    this.dateDelivery = {
      product_id: "",
      max: this.date_delivery_max,
      min: this.date_delivery_min
    }

    try {
      if(this.installOption != undefined){
        this.isInstallationSelected == false;
        this.installOptionList.push(this.installOption)
      }
      this.newProduct.emit(
        {
          product_id: this.productInfo.product_id,
          title: this.productNameInput.nativeElement.value,
          price_type: this.priceType,
          measures: this.measuresInput,
          measure: this.measureType,
          imgs: this.receivedImages,
          price: this.priceInput,
          details: this.detailData.data,
          dimensions: this.dimensionsData.data,
          category_data: category_data,
          available: this.isAvailableSelected,
          installation: this.isInstallationSelected,
          installations: this.installOptionList,
          topics: this.selectedOptions,
          about: this.aboutText,
          date_delivery: this.dateDelivery
        }
      )
      this.imgs.emit(
        this.receivedImages
      )
    } catch {
      alert('Campos incompletos');
    }
  }
}
