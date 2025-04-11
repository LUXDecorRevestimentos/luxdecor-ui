import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ProductData } from '../data/product.data';
import { OrderStatus } from '../../data/table.data';
import { ProductTable, ProductInfo, CategoryType, DetailsData } from '../data/category.data';

@Injectable({
  providedIn: 'root' 
})
export class ProductAuthService {
  constructor() { }
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
    const products: ProductTable[] = [
      {
        productId: '1',
        productName: 'Piso Laminado Eucafloor New Evidence Click',
        categoryName: 'Piso',
        subCategoryName: 'Laminado'
      },
      {
        productId: '2',
        productName: 'Piso Vinílico Cromo Elegance',
        categoryName: 'Piso',
        subCategoryName: 'Vinílico'
      },
    ];
    return of(products);
  }

  getProductInfo(): Observable<ProductInfo> {
    const detailsData: DetailsData = {
      title: "Detalhes",
      data: [
          { label: "Marca", value: "Eucafloor" },
          { label: "Linha", value: "New Evidence" },
          { label: "Cor", value: "Veneto" },
          { label: "Tipo de Instalação", value: "Click" },
          { label: "Garantia da Fábrica", value: "14 anos" }
      ]
    };

    const dimensionsData: DetailsData = {
      title: "Dimensoes",
      data: [
          { label: "Rendimento(m²/caixa)", value: "2,77m²" },
          { label: "Réguas", value: "1.357 x 292 mm" },
          { label: "Espessura", value: "7 mm" },
          { label: "Quantidade de réguas", value: "7" },
          { label: "Combinação Rodapés e Perfis Tecno", value: "Acessórios N° 9 e N° 22" }
      ]
    };

    const productInfo: ProductInfo = {
      productId: '1',
      productName: 'Piso Laminado Eucafloor New Evidence Click',
      categoryId: '1',
      categoryName: 'Piso',
      imgs: ['piso.png'],
      price: 10.00,
      brandId: '1',
      brandName: 'Eucafloor',
      categoryType: CategoryType.PRODUCT,
      dimensions: dimensionsData,
      details: detailsData
    };
    return of(productInfo);
  }

}
