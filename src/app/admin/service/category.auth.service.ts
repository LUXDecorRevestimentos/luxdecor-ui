import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { CategoryTable, CategoryType, CategoryInfo, TopicType, DetailsData } from '../data/category.data'

@Injectable({
    providedIn: 'root'
})
export class CategoryAuthService {
    constructor() {}

    getCategoryData(): Observable<CategoryTable[]> {
        const mockCategories: CategoryTable[] = [
            {
                categoryId: "001",
                categoryName: "Piso",
                subCategory: "00002",
                topic: 2,
                items: 30,
                type: CategoryType.PRODUCT,
            },
            {
                categoryId: "002",
                categoryName: "Rodape",
                subCategory: "00002",
                topic: 2,
                items: 30,
                type: CategoryType.PRODUCT,
            }
        ];
        return of(mockCategories);
    }


    getCategoryInfo(): Observable<CategoryInfo> {

        const detailsData: DetailsData = {
            title: "Detalhes",
            data: [
                { label: "Marca", value: "" },
                { label: "Linha", value: "" },
                { label: "Cor", value: "" },
                { label: "Tipo de Instalação", value: "" },
                { label: "Garantia da Fábrica", value: "" }
            ]
        };

        const dimensionsData: DetailsData = {
            title: "Dimensoes",
            data: [
                { label: "Rendimento(m²/caixa)", value: "" },
                { label: "Réguas", value: "" },
                { label: "Quantidade de réguas", value: "" },
                { label: "Combinação Rodapés e Perfis Tecno", value: "" }
            ]
        };

        const mockCategoryInfos: CategoryInfo = {
            categoryId: "001",
            categoryName: "Piso",
            imgBanner: "assets/images/banner-piso.jpg",
            subCategories: [
                {
                    subCategoryId: "00001",
                    subCategoryName: "Azulejo",
                    imgBannerSub: "assets/images/azulejo.jpg",
                    items: 10
                },
                {
                    subCategoryId: "00002",
                    subCategoryName: "Porcelanato",
                    imgBannerSub: "assets/images/porcelanato.jpg",
                    items: 10
                    }
                ],
            brands: [
                {
                    brandId: "00001",
                    brandName: "BrandA",
                    imgBrand: "assets/images/brand-a.jpg",
                    items: 20
                }
            ], 
            topics: [
                {
                    topicId: "00001",
                    topicName: "Vinilico",
                    topicType: TopicType.CARROUSEL,
                    items: 10
                },
                {
                    topicId: "00002",
                    topicName: "Laminado",
                    topicType: TopicType.GALLERY,
                    items: 10
                }
            ], 
            type: CategoryType.PRODUCT,
            details: detailsData,
            dimensions: dimensionsData
        }
        return of(mockCategoryInfos);
    }
}