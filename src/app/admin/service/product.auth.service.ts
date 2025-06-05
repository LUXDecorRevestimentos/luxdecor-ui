import { Injectable, ɵIS_INCREMENTAL_HYDRATION_ENABLED } from '@angular/core';
import { Observable, of, map } from 'rxjs';
import { ProductData } from '../data/product.data';
import { OrderStatus } from '../../data/table.data';
import { ProductTable, ProductInfo, PriceType, CategoryData } from '../data/category.data';
import { environment } from '../../../enviroments/enviroment';
import { HttpClient, HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root' 
})
export class ProductAuthService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  mapToProductInfo(product: any): ProductInfo {
    let category_data: CategoryData = {
      category_id: product.category_data.category_id,
      category_title: product.category_data.category_title,
      subcategory_id: product.category_data.subcategory_id,
      subcategory_title: product.category_data.subcategory_title,
      brand_id: product.category_data.brand_id,
      brand_title: product.category_data.brand_title,
    }

    return {
      product_id: product.product_id,
      title: product.title,
      dimensions: product.dimensions,
      details: product.details,
      measures: product.measures,
      imgs: [],
      price: product.price,
      price_type: product.price_type,
      category_data: category_data,
      installation: product.installation,
      available: product.available,
      topics: product.topics
    }
  }

  getProductId(): Observable<ProductData> {
    const product: ProductData = {
      productId: '1',
      title: 'Piso Laminado Eucafloor New Evidence Click',
      type: 'Piso',
      subType: 'Laminado',
      imageUrl: 'piso.png',
      price: '10.00',
      boxPrice: '50.00',
      amount: 10,
      status: OrderStatus.PENDING,
      date: "07:00 - 01/01/2023"
    };
    return of(product);
  }

  getProducts(): Observable<ProductTable[]> {
    return this.http.get<any[]>(`${this.apiUrl}/product/table`).pipe(
      map(apiResponse => apiResponse.map(item => ({
        productId: item["product_id"],
        productName: item["title"],
        categoryName: item["category_title"],
        subCategoryName: item["subcategory_title"]
      } as ProductTable)))
    );
  }

  getProduct(productId: string): Observable<ProductInfo> {
    let params = new HttpParams();
    if (productId) {
        params = params.append('product_id', productId);
    }
    return this.http.get<any>(`${this.apiUrl}/product`, { params }).pipe(
      map(apiResponse =>
        {
        return {
          product_id: apiResponse.product_id,
          title: apiResponse.title,
          price_type: apiResponse.price_type,
          price: apiResponse.price_input,
          category_data: apiResponse.category_data,
          details: apiResponse.category_data.details_id,
          dimensions: apiResponse.category_data.dimensions_id,
          topics: apiResponse.topics,
          imgs: apiResponse.imgs,
          measures: apiResponse.measures,
          installation: apiResponse.installation,
          available: apiResponse.available
        }
      })
    )
  }

  cleanProduct():Observable<ProductInfo> {
    let categoryData: CategoryData = {
      category_id: "",
      brand_id: "",
      subcategory_id: "",
      brand_title: "",
      subcategory_title: "",
      category_title: ""
    }

    return of({
      product_id: "",
      title: "",
      imgs: [],
      price_type: PriceType.BOX,
      price: [""],
      details: [],
      dimensions: [],
      topics: [],
      measures:0,
      category_data: categoryData,
      available: false,
      installation: false
    })
  }

  postProduct(product: any){
    return this.http.post<any>(`${this.apiUrl}/product/create`, product);
  }

  updateProduct(product: any){
    return this.http.post<any>(`${this.apiUrl}/product/update`, product);
  }

  uploadImgs(imgs: any, productId: string){
    let params = new HttpParams().set('product_id', productId);
    return this.http.post<any>(`${this.apiUrl}/product/upload`, imgs, { params })
  }

  getImgs(productId: string){
    let params = new HttpParams().set('product_id', productId);
    return this.http.get<any>(`${this.apiUrl}/product/img`, { params })
  }

  getDetails(categoryId: string, productId?: string): Observable<any[]>{
    let params = new HttpParams().set('category_id', categoryId);
    if (productId) {
      params = params.append('product_id', productId);
    }
    return this.http.get<any[]>(`${this.apiUrl}/details/list`, { params })
  }

  getDimensions(categoryId: string, productId?: string): Observable<any[]> {
    let params = new HttpParams().set('category_id', categoryId);
    if (productId) {
      params = params.append('product_id', productId);
    }
    return this.http.get<any[]>(`${this.apiUrl}/dimension/list`, { params });
  }

}
