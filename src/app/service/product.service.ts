import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { GenericCard } from '../data/card.data';

@Injectable({
  providedIn: 'root' 
})
export class ProductService {
  constructor() { }

  getProductsCategories(): Observable<GenericCard[]> {
    const mockCards: GenericCard[] = [
      { id: 0, title: "PISOS", type: "category", imageUrl: ""},
      { id: 1, title: "RODAPES", type: "category", imageUrl: ""},
      { id: 2, title: "OUTROS", type: "category", imageUrl: ""}
    ];
    return of(mockCards);
  }

  getProductPromotionMainList(): Observable<GenericCard[]> {
    const mockCards: GenericCard[] = [
      { id: 0, title: "Piso Laminado Eucafloor Cappuccino", type: "product", imageUrl: "", data: { price: "49,99" } },
      { id: 1, title: "Piso Laminado Eucafloor Prime", type: "product", imageUrl: "", data: { price: "48,99" } },
      { id: 2, title: "Piso Laminado Eucafloor Colado", type: "product", imageUrl: "", data: { price: "47,99" } },
      { id: 3, title: "Piso Laminado Eucafloor", type: "product", imageUrl: "", data: { price: "46,99" } },
      { id: 3, title: "Piso Laminado Eucafloor", type: "product", imageUrl: "", data: { price: "46,99" } },
      { id: 3, title: "Piso Laminado Eucafloor", type: "product", imageUrl: "", data: { price: "46,99" } },
      { id: 3, title: "Piso Laminado Eucafloor", type: "product", imageUrl: "", data: { price: "46,99" } },
      { id: 3, title: "Piso Laminado Eucafloor", type: "product", imageUrl: "", data: { price: "46,99" } },
      { id: 3, title: "Piso Laminado Eucafloor", type: "product", imageUrl: "", data: { price: "46,99" } },
      { id: 3, title: "Piso Laminado Eucafloor", type: "product", imageUrl: "", data: { price: "46,99" } }
    ];
    return of(mockCards)
  }

  getProdutctsCategoryId(): Observable<GenericCard[]> {
    const mockCards: GenericCard[] = [
      { id: 0, title: "Vinílicos", type: "category", imageUrl: ""},
      { id: 1, title: "Laminados", type: "category", imageUrl: ""},
    ];
    return of(mockCards);
  }

  getProdutctsCategoryIdInstallType(): Observable<GenericCard[]> {
    const mockCards: GenericCard[] = [
      { id: 0, title: "Cola", type: "category", imageUrl: ""},
      { id: 1, title: "Click", type: "category", imageUrl: ""},
    ];
    return of(mockCards);
  }
}