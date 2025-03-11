import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { map } from 'rxjs/operators'; // Importar map para aplicar no Observable
import { GenericSection, GenericCard } from "../data/card.data";

@Injectable({
    providedIn: 'root'
})
export class SectionService {
    constructor() {}

    getSections(): Observable<GenericSection[]> {
        const mockSections: GenericSection[] = [
            {
                id: 0,
                title: "Piso",
                type: "home",
                data: [
                    {
                        id: 0,
                        type: "card-category",
                        data: [
                            { 
                                id: 0,
                                title: "Laminado",
                                type: "category",
                                imageUrl: "",
                            }, 
                            {
                                id: 1,
                                title: "Vinílicos",
                                type: "category",
                                imageUrl: "",
                            }
                        ]
                    },
                    {
                        id: 1,
                        type: "card-product",
                        title: "P0Promocoes",
                        data: [
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

                        ]
                    }
                ]
            },
            {
                id: 1,
                title: "Rodape",
                type: "home",
                data: [
                    {
                        id: 0,
                        type: "card-category",
                        data: [
                            { 
                                id: 0,
                                title: "Laminado",
                                type: "category",
                                imageUrl: "",
                            }, 
                            {
                                id: 1,
                                title: "Vinílicos",
                                type: "category",
                                imageUrl: "",
                            }
                        ]
                    },
                    {
                        id: 1,
                        type: "card-product",
                        title: "R0Promocoes",
                        data: [
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

                        ]
                    }
                ]
            }
        ]; 
        return of(mockSections);
    }
    
}
