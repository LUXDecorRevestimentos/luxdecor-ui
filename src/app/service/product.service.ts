import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { GenericCard, ProductData } from '../data/card.data';
import { ProductDetailsTable } from '../data/table.data';

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
      { id: 0, title: "Vinílicos", type: "sub-category", imageUrl: ""},
      { id: 1, title: "Laminados", type: "sub-category", imageUrl: ""},
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

  getAllProducts(): Observable<GenericCard[]> {
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
      { id: 3, title: "Piso Laminado Eucafloor", type: "product", imageUrl: "", data: { price: "46,99" } },
      { id: 0, title: "Piso Laminado Eucafloor Cappuccino", type: "product", imageUrl: "", data: { price: "49,99" } },
      { id: 1, title: "Piso Laminado Eucafloor Prime", type: "product", imageUrl: "", data: { price: "48,99" } },
      { id: 2, title: "Piso Laminado Eucafloor Colado", type: "product", imageUrl: "", data: { price: "47,99" } },
      { id: 3, title: "Piso Laminado Eucafloor", type: "product", imageUrl: "", data: { price: "46,99" } },
      { id: 3, title: "Piso Laminado Eucafloor", type: "product", imageUrl: "", data: { price: "46,99" } },
      { id: 3, title: "Piso Laminado Eucafloor", type: "product", imageUrl: "", data: { price: "46,99" } },
      { id: 3, title: "Piso Laminado Eucafloor", type: "product", imageUrl: "", data: { price: "46,99" } },
      { id: 3, title: "Piso Laminado Eucafloor", type: "product", imageUrl: "", data: { price: "46,99" } },
      { id: 3, title: "Piso Laminado Eucafloor", type: "product", imageUrl: "", data: { price: "46,99" } },
      { id: 0, title: "Piso Laminado Eucafloor Cappuccino", type: "product", imageUrl: "", data: { price: "49,99" } },
      { id: 1, title: "Piso Laminado Eucafloor Prime", type: "product", imageUrl: "", data: { price: "48,99" } },
      { id: 2, title: "Piso Laminado Eucafloor Colado", type: "product", imageUrl: "", data: { price: "47,99" } },
      { id: 3, title: "Piso Laminado Eucafloor", type: "product", imageUrl: "", data: { price: "46,99" } },
      { id: 3, title: "Piso Laminado Eucafloor", type: "product", imageUrl: "", data: { price: "46,99" } },
      { id: 3, title: "Piso Laminado Eucafloor", type: "product", imageUrl: "", data: { price: "46,99" } },
      { id: 3, title: "Piso Laminado Eucafloor", type: "product", imageUrl: "", data: { price: "46,99" } },
      { id: 3, title: "Piso Laminado Eucafloor", type: "product", imageUrl: "", data: { price: "46,99" } },
      { id: 3, title: "Piso Laminado Eucafloor", type: "product", imageUrl: "", data: { price: "46,99" } }
    ];
    return of(mockCards)
  }

  getProductId(): ProductData {

    const productDetails: ProductDetailsTable[] =  [
        { label: 'Marca', value: 'Eucafloor' },
        { label: 'Linha', value: 'New Evidence' },
        { label: 'Cor',  value: 'Veneto'},
        { label: 'Tipo de instalação', value: 'Click' },
        { label: 'Garantia Fábrica ', value: '14 anos' },
        { label: 'Garantia Comercial ', value: '5 anos' }
      ]

    const productDimensions: ProductDetailsTable[] = [
        { label: 'Rendimento (m²/caixa)', value: '2,77 m²' },
        { label: 'Réguas', value: '1.357 x 292 mm' },
        { label: 'Espessura', value: '7 mm' },
        { label: 'Quantidade de réguas', value: '7' },
        { label: 'Combinação Rodapés e Perfis Tecno', value: 'Acessórios N° 9 e N° 22' },
      ]

    const data: ProductData = {
      id: 101,
      title: 'Piso Laminado Eucafloor Click New Evidence Veneto',
      brand: 'brands/eucaflor.png',
      price: '69,50',       
      box_price: '192,50',
      box_size: '2,77mm²',
      tamanho: '7x190x1200',
      medida: 'm²',
      details: 'O Piso Laminado Eucafloor New Evidence Click é indHicado para uso em ambientes Residenciais e Comerciais: Quartos e Salas, Quarto de Hotel e pequenas Salas comerciais. Possui conforto térmico e aplicação do tipo click, o que garante maior agilidade na aplicação e a liberação do ambiente de imediato. Agora em novas dimensões e novos padrões.',
      spec: 'Ideal para ambientes internos e externos, resistente à água.',
      images: [
        'piso.png',
        'piso.png',
        'piso.png',
        'piso.png',
        'piso.png'
      ],
      productDetailsTable: productDetails,
      productDimensionsTable: productDimensions

    }
    return data;
  }
}