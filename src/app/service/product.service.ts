import { Injectable } from '@angular/core';
import { catchError, distinctUntilChanged, map, Observable, of, shareReplay, switchMap, throwError, timeout } from 'rxjs';
import { GenericCard, ProductData, CartCardItemData, CartData } from '../data/card.data';
import { ProductDetailsTable } from '../data/table.data';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ProductInfo } from '../admin/data/category.data';
import { environment } from '../../enviroments/enviroment';

@Injectable({
  providedIn: 'root' 
})
export class ProductService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getProductsCategories(): Observable<GenericCard[]> {
    return this.http.get<GenericCard[]>(`${this.apiUrl}/section/header`).pipe(
      distinctUntilChanged(),
      shareReplay(1),
      map(apiProducts => this.transformApiDataCategories(apiProducts)),
      timeout(5000),
      catchError(error => throwError(() => error))
    );
  }

  private transformApiDataCategories(apiCategories: any[]): GenericCard[] {
    return apiCategories.map(category => ({
      id: category.id,
      title: category.title,
      type: category.type,
      imageUrl: category.imageUrl,
      data: category.data
    }))
  }

  getProductPromotionMainList(): Observable<GenericCard[]> {
    return this.http.get<GenericCard[]>(`${this.apiUrl}/section/promotions`).pipe(
      distinctUntilChanged(),
      shareReplay(1),
      map(apiProducts => this.transformApiDataPromotions(apiProducts)),
      timeout(5000),
      catchError(error => throwError(() => error))
    );
  }

  private transformApiDataPromotions(apiProducts: any[]): GenericCard[] {
    return apiProducts.map(product => ({
      id: product.id,
      title: product.title,
      type: product.type,
      imageUrl: product.imageUrl,
      data: {
        price: product.data.price
      }
    }));
  }

  getInstallationsByCategory(categoryId: string): Observable<GenericCard[]> {
    return this.http.get<any[]>(`${this.apiUrl}/installations/list`, {
      params: { category_id: categoryId }
    }).pipe(
      distinctUntilChanged(),
      shareReplay(1),
      map(apiInstallations => this.transformApiDataInstallations(apiInstallations)),
      timeout(5000),
      catchError(error => throwError(() => error))
    );
  }
  
  getBrandsByCategory(categoryId: string): Observable<GenericCard[]> {
    return this.http.get<any[]>(`${this.apiUrl}/brand/list`, {
      params: { category_id: categoryId }
    }).pipe(
      distinctUntilChanged(),
      shareReplay(1),
      map(apiInstallations => this.transformApiDataInstallations(apiInstallations)),
      timeout(5000),
      catchError(error => throwError(() => error))
    );
  }

  private transformApiDataInstallations(apiInstallations: any[]): GenericCard[] {
    return apiInstallations.map(installation => ({
      id: installation.installation_id,
      title: installation.title,
      type: '',
      imageUrl: installation.banner_id, 
      data: installation
    }));
  }

  getAllProducts(): Observable<GenericCard[]> {
    const mockCards: GenericCard[] = [];
    return of(mockCards)
  }

  getProductsFiltered(params: {
    category_id?: string;
    brand_id?: string;
    subcategory_id?: string;
    product_id?: string;
    installation_id?: string;
    price_min?: number;
    price_max?: number;
  }): Observable<any[]> {
    
    const formatToBRL = (value: number): string => {
      return value.toString().replace('.', ',');
    };
  
    return this.http.get<any[]>(`${this.apiUrl}/product/list`, {
      params: {
        ...(params.category_id && { category_id: params.category_id }),
        ...(params.brand_id && { brand_id: params.brand_id }),
        ...(params.subcategory_id && { subcategory_id: params.subcategory_id }),
        ...(params.product_id && { product_id: params.product_id }),
        ...(params.installation_id && { installation_id: params.installation_id }),
        ...(params.price_min && { price_min: formatToBRL(params.price_min) }),
        ...(params.price_max && { price_max: formatToBRL(params.price_max) })
      }
    }).pipe(
      timeout(5000),
      catchError(error => throwError(() => error))
    );
  }
  

  getProductId(productId: string): Observable<ProductInfo> {

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
          measure: apiResponse.measure,
          measures: apiResponse.measures,
          installation: apiResponse.installation,
          installations: apiResponse.installations,
          available: apiResponse.available,
          about: apiResponse.about
        }
      })
    )
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

  getImgs(productId: string){
    let params = new HttpParams().set('product_id', productId);
    return this.http.get<any>(`${this.apiUrl}/product/img`, { params })
  }

  getBrandAndThenBanner(brand_id: string) {
    return this.getBrand(brand_id).pipe(
      switchMap((brandResponse) => {
        const newBrandId = brandResponse.banner_id;
        return this.getBanner(newBrandId);
      })
    );
  }

  getBrand(brand_id: string){
    let params = new HttpParams().set('brand_id', brand_id);
    return this.http.get<any>(`${this.apiUrl}/brand`, { params })
  }

  getBanner(banner_id: string){
    let params = new HttpParams().set('path_id', banner_id);
    return this.http.get<any>(`${this.apiUrl}/banner/upload`, { params })
  }


  getCart(token: string): Observable<CartData> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<CartData>(this.apiUrl, { headers });
  }

  getCartData(): Observable<CartCardItemData[]> {
    const mockCards: CartCardItemData[] = [
      {
        id: "1",
        title: 'Piso Laminado Eucafloor New Evidence Click',
        type: 'Piso Laminado',
        imageUrl: 'piso.png',
        price: 'R$ 192,50',
        product_id: "%1231",
        amount: "1",
        select: false
      },
      {
        id: "2",
        title: 'Piso Laminado Eucafloor New Evidence Click',
        type: 'Piso Laminado',
        imageUrl: 'piso.png',
        price: 'R$ 192,50',
        amount: "1",
        product_id: "%1231",
        select: false
      },
      {
        id: "3",
        title: 'Piso Laminado Eucafloor New Evidence Click',
        type: 'Piso Laminado',
        imageUrl: 'piso.png',
        price: 'R$ 192,50',
        amount: "1",
        product_id: "%1231",
        select: false
      }
    ];
    return of(mockCards);
  }
}