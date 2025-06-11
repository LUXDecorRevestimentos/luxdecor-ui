import { Injectable } from '@angular/core';
import { catchError, distinctUntilChanged, map, Observable, of, shareReplay, throwError, timeout } from 'rxjs';
import { GenericCard, ProductData, CartCardData } from '../data/card.data';
import { ProductDetailsTable } from '../data/table.data';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ProductInfo } from '../admin/data/category.data';

@Injectable({
  providedIn: 'root' 
})
export class ProductService {
  private apiUrl = 'http://127.0.0.1:5050/'; 

  constructor(private http: HttpClient) {}

  getProductsCategories(): Observable<GenericCard[]> {
    return this.http.get<GenericCard[]>(`${this.apiUrl}section/header`).pipe(
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
    return this.http.get<GenericCard[]>(`${this.apiUrl}section/promotions`).pipe(
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
    return this.http.get<any[]>(`${this.apiUrl}/installation`, {
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
  }): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/product/list`, {
      params: {
        ...(params.category_id && { category_id: params.category_id }),
        ...(params.brand_id && { brand_id: params.brand_id }),
        ...(params.subcategory_id && { subcategory_id: params.subcategory_id }),
        ...(params.product_id && { product_id: params.product_id })
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
          measures: apiResponse.measures,
          installation: apiResponse.installation,
          available: apiResponse.available
        }
      })
    )
  }

  getCartData(): Observable<CartCardData[]> {
    const mockCards: CartCardData[] = [
      {
        id: 1,
        title: 'Piso Laminado Eucafloor New Evidence Click',
        type: 'Piso Laminado',
        imageUrl: 'piso.png',
        price: 'R$ 192,50',
        amount: 1,
        select: false
      },
      {
        id: 2,
        title: 'Piso Laminado Eucafloor New Evidence Click',
        type: 'Piso Laminado',
        imageUrl: 'piso.png',
        price: 'R$ 192,50',
        amount: 1,
        select: false
      },
      {
        id: 3,
        title: 'Piso Laminado Eucafloor New Evidence Click',
        type: 'Piso Laminado',
        imageUrl: 'piso.png',
        price: 'R$ 192,50',
        amount: 1,
        select: false
      }
    ];
    return of(mockCards);
  }
}