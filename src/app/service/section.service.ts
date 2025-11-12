import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { catchError, map, shareReplay } from 'rxjs/operators';
import { GenericSection } from "../data/card.data";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../enviroments/enviroment";

@Injectable({
    providedIn: 'root'
})
export class SectionService {
    private apiUrl = environment.apiUrl;
    constructor(private http: HttpClient) {}
  
    getSections(): Observable<GenericSection[]> {
      return this.http.get<any[]>(`${this.apiUrl}/section/home`).pipe(
        map(this.transformApiData),
        shareReplay(1),
        catchError(error => {
          console.error('Error fetching sections, returning empty array', error);
          return of([] as GenericSection[]);
        })
      );
    }

    private transformApiData = (apiSections: any[]): GenericSection[] =>
      apiSections.map(section => ({
        id: section.id,
        title: section.title,
        type: section.type,
        data: Array.isArray(section.data)
          ? section.data.map((item: any) => this.transformItem(item))
          : []
      }));
    
   private transformItem(item: any) {
    if (item.type === 'card-product') {
      return {
        id: item.id,
        type: item.type,
        title: item.title,
        format: item.format,
        data: Array.isArray(item.data)
          ? item.data.map((product: { id: any; title: any; type: any; imageUrl: any; data: { price: any; }; }) => ({
              id: product.id,
              title: product.title,
              type: product.type,
              imageUrl: product.imageUrl,
              data: { price: product.data?.price ?? null }
            }))
          : []
      };
    }

    if (item.type === 'card-category') {
      return {
        id: item.id,
        type: item.type,
        data: Array.isArray(item.data)
          ? item.data.map((category: { id: any; title: any; type: any; imageUrl: any; }) => ({
              id: category.id,
              title: category.title,
              type: category.type,
              imageUrl: category.imageUrl
            }))
          : []
      };
    }

    // Retorna o item original caso seja outro tipo
    return item;
  }
  
}
