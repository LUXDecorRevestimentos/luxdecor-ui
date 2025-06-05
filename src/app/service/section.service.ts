import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError, map } from 'rxjs/operators';
import { GenericSection } from "../data/card.data";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class SectionService {
    private apiUrl = 'http://localhost:5050/section';

    constructor(private http: HttpClient) {}
  
    getSections(): Observable<GenericSection[]> {
      return this.http.get<GenericSection[]>(this.apiUrl + "/home").pipe(
        map(apiSections => this.transformApiData(apiSections)),
        catchError(error => {
          console.error('Error fetching sections, using mock data', error);
          return [];
        })
      );
    }
  
    private transformApiData(apiSections: any[]): GenericSection[] {
      return apiSections.map(section => ({
        id: section.id,
        title: section.title,
        type: section.type,
        data: section.data.map((item: { type: string; id: any; title: any; data: any[]; }) => {
          if (item.type === 'card-product') {
            return {
              id: item.id,
              type: item.type,
              title: item.title,
              data: item.data.map((product: { id: any; title: any; type: any; imageUrl: any; data: { price: any; }; }) => ({
                id: product.id,
                title: product.title,
                type: product.type,
                imageUrl: product.imageUrl,
                data: { price: product.data.price }
              }))
            };
          } else if (item.type === 'card-category') {
            return {
              id: item.id,
              type: item.type,
              data: item.data.map((category: { id: any; title: any; type: any; imageUrl: any; }) => ({
                id: category.id,
                title: category.title,
                type: category.type,
                imageUrl: category.imageUrl
              }))
            };
          }
          return item;
        })
      }));
    }
  
}
