import { Injectable } from "@angular/core";
import { map, Observable, of } from "rxjs";
import { CategoryTable, CategoryType, CategoryInfo, TopicType, DetailsData, SubCategory } from '../data/category.data'
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../enviroments/enviroment';

@Injectable({
    providedIn: 'root'
})
export class CategoryAuthService {
    private apiUrl = environment.apiUrl;
    constructor(private http: HttpClient) {}


    mapToCategoryInfo(category: any): CategoryInfo {
        return {
            category_id: category.category_id,
            title: category.title,
            banner_id: category.banner_id || '',
            subcategory: category.subcategory || [],
            brand: category.brand || [],
            topic: category.topic || [],
            category_type: category.category_type,
            dimensions: category.dimensions || [],
            details: category.details || []
        };
    }

    getCategories(): Observable<CategoryTable[]> {
        return this.http.get<any[]>(`${this.apiUrl}/category/list`).pipe(
            map(apiResponse => apiResponse.map(item => ({
            category_id: item.category_id,
            category_title: item.category_title,
            category_type: item.category_type,
            items: item.items,
            subcategory: item.subcategory,
            topic: item.topic
            } as CategoryTable)))
        );
    }

    getCategoryInfo(categoryId?: string): Observable<CategoryInfo> {
        const url = `${this.apiUrl}/category`;
        let params = new HttpParams();
    
        if (categoryId) {
            params = params.append('category_id', categoryId);
        }
        
        return this.http.get<CategoryInfo>(url, { params }).pipe(
            map(apiResponse => ({
                category_id: apiResponse.category_id,
                title: apiResponse.title,
                banner_id: apiResponse.banner_id,
                subcategory: apiResponse.subcategory,
                brand: apiResponse.brand,
                topic: apiResponse.topic,
                category_type: apiResponse.category_type,
                dimensions: apiResponse.dimensions,
                details: apiResponse.details
            }))
        );
    }

    getCategoryTopic(category_id?: string): Observable<any[]>{
        let params = new HttpParams();
        if (category_id){
            params = params.append('category_id', category_id)
        }
        return this.http.get<any[]>(`${this.apiUrl}/topic/list`, { params })
    }

    getCategoryDetails(categoryId?: string): Observable<any[]> {
        let params = new HttpParams();
        if (categoryId) {
          params = params.append('category_id', categoryId);
        }
        return this.http.get<any[]>(`${this.apiUrl}/subcategory/list`, { params })
    }

    getBrandDetails(categoryId?: string): Observable<any[]>{
        let params = new HttpParams();
        if (categoryId) {
          params = params.append('category_id', categoryId);
        }
        return this.http.get<any[]>(`${this.apiUrl}/brand/list`, { params })
    }

    getDetails(categoryId?: string): Observable<any[]>{
        let params = new HttpParams();
        if (categoryId) {
          params = params.append('category_id', categoryId);
        }
        return this.http.get<any[]>(`${this.apiUrl}/details/list`, { params })
    }

    getDimensions(categoryId?: string): Observable<any[]>{
        let params = new HttpParams();
        if (categoryId) {
          params = params.append('category_id', categoryId);
        }
        return this.http.get<any[]>(`${this.apiUrl}/dimension/list`, { params })
    }

    cleanCategory(): Observable<CategoryInfo> {

        return of({
            category_id: "",
            title: "",
            banner_id: "",
            subcategory: [],
            brand: [],
            topic: [],
            category_type: CategoryType.PRODUCT,
            dimensions: [],
            details: []
        })
    }

    postCategory(category: any){
        return this.http.post<any>(`${this.apiUrl}/category/create`, category);
    }

    updateCategory(category: CategoryInfo){
        return this.http.post<any>(`${this.apiUrl}/category/update`, category);
    }

}