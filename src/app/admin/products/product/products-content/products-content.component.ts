import { Component, Output, EventEmitter, Input } from '@angular/core';
import { ProductTableComponent } from '../product-table/product-table.component';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { ProductTable, ProductInfo } from '../../../data/category.data';
import { ProductAuthService } from '../../../service/product.auth.service';
import { ProductsInfoComponent } from '../products-info/products-info.component';
import { CategoryAuthService } from '../../../service/category.auth.service';
import { catchError, finalize, switchMap } from 'rxjs';


@Component({
  selector: 'app-products-content',
  imports: [ProductTableComponent, MatIcon, CommonModule, ProductsInfoComponent],
  templateUrl: './products-content.component.html',
  styleUrl: './products-content.component.css'
})
export class ProductsContentComponent {

  @Input() products: ProductTable[]  = [];
  @Output() rowSelected: EventEmitter<ProductTable> = new EventEmitter();

  selectedCategory!: string;

  categoryData!: any[];
  subcategoryData!: any[];
  brandData!: any[];
  detailData!: any;
  dimensionsData!: any;
  productImgs!: any[];
  topics!: any[];
  installations!: any[];

  imgsToUpload: any[] = [];

  details: boolean = false;
  addOp: boolean = false;
  editOp: boolean = false;
  loading = false;


  productInfo: ProductInfo | undefined;

  constructor(private productService: ProductAuthService,
              private categoryService: CategoryAuthService) {}

  ngOnInit(): void {
    this.populateData()
  }

  populateData() {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
    });
    this.categoryService.getCategories().subscribe((data => {
      this.categoryData = data.map(item => [item.category_id, 
        item.category_title]);
    }));
  }

 
  handleButtonClick(identifier: string) {
    if(identifier === 'add') {
      this.details = true;
      this.productService.cleanProduct().subscribe((data) => {
        this.productInfo = data
      });
      this.details = true;
      this.addOp = true;
      this.editOp = false
    } else if(identifier === 'edit') {
      this.productInfo = undefined;
      this.editOp = true;
      this.addOp = false;
    }
  }

  onRowSelectedProduct(row: any | undefined) {
    if (row == undefined) {
      this.productInfo = undefined;
    } else {
      this.productInfo = undefined;
      this.productService.getProduct(row.productId).subscribe((data) => {
        this.productInfo = data
        this.onCategorySelected(data.category_data.category_id, false)
      })
      this.productService.getImgs(row.productId).subscribe((data) => {
        this.productImgs = data
      })
      this.details = true;
    }
  } 

  loadProduct(): void {
    this.loading = true;
    this.productService.getProducts().pipe(
      catchError(err => {
        console.error('Error loading categories:', err);
        return [];
      }),
      finalize(() => this.loading = false)
    ).subscribe(data => {
      this.products = data;
    });
  }

  onProductUpdate(product: ProductInfo): void {
    this.productInfo = product;
    if (this.addOp) {
      this.handleAddOperation(product);
    } else if (this.editOp) {
      this.handleEditOperation(product);
    }
  }

  onUploadImgs(imgs: any): void {
    console.log(imgs)
    console.log(this.productInfo)
    let productId = this.productInfo?.product_id
    if (productId) {
      this.productService.uploadImgs(this.productInfo?.imgs, productId).subscribe({
        next: response => {
          console.log("Successo no envio das imagens")
        },
        error: error => console.error('Error updating category:', error)
      });
    }
  }

  private handleAddOperation(product: ProductInfo): void {
    this.productService.postProduct(product).subscribe({
      next: response => {
        if(this.productInfo)
          this.productInfo.product_id = response.product_id
          console.log(this.imgsToUpload)
          this.onUploadImgs(this.imgsToUpload)
          this.loadProduct();
          this.resetOperations();
      },
      error: error => console.error('Error updating category:', error)
    });
  }

  private handleEditOperation(product: ProductInfo): void {
    this.productService.updateProduct(product).subscribe({
      next: response => {
        this.loadProduct();
        this.resetOperations();
      },
      error: error => console.error('Error updating category:', error)
    });
    this.loadProduct();
    this.resetOperations();
  }
  
  onCategorySelected(value: string, add: boolean) {
    this.selectedCategory = value;
    // subcategory
    this.categoryService.getCategoryDetails(this.selectedCategory).subscribe(data => {
      this.subcategoryData = data.map(item => [item.subcategory_id, 
        item.title]);
    });

    // brand
    this.categoryService.getBrandDetails(this.selectedCategory).subscribe(data => {
      this.brandData = data.map(item => [item.brand_id,
        item.title]);
    })
    
    //topics
    this.categoryService.getCategoryTopic(this.selectedCategory).subscribe(data => {
      this.topics = data.map(item => [item.category_id, item.title])
    })

    //installations
    this.categoryService.getInstallations(this.selectedCategory).subscribe(data => {
      this.installations = data.map(item => [item.installation_id, item.title])
    })
  
    // details
    this.productService.getDetails(this.selectedCategory, this.productInfo?.product_id).subscribe(apiData => {
      if(add) {
        this.detailData = {
          title: "Detalhes",
          data: apiData.map(item => ({
            key: item.key,
            value: item.value,
            data_id: item.data_id
          }))
        };
      } else {
        this.detailData = {
          title: "Detalhes",
          data: apiData.map(item => ({
            key: item.key,
            value: item.value,
            data_id: item.data_id
          }))
        };
      }
    });
    // dimensions
    this.productService.getDimensions(this.selectedCategory, this.productInfo?.product_id).subscribe(apiData => {
      if (add){
        this.dimensionsData = {
          title: "Dimensões",
          data: apiData.map(item => ({
            key: item.key,
            value: item.value,
            data_id: item.data_id
          }))
        };
      }else {
        this.dimensionsData = {
          title: "Dimensões",
          data: apiData.map(item => ({
            key: item.key,
            value: item.value,
            data_id: item.data_id
          }))
        };
      }
     
    });
  }

  private resetOperations(): void {
    this.addOp = false;
    this.editOp = false;
    this.details = false;
  }
}
