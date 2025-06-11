export interface CategoryTable {
    category_id: string;
    category_title: string;
    subcategory: number;
    topic: number;
    items: number;
    category_type: number;
}

export interface ProductTable {
    productId: string;
    productName: string;
    categoryName: string;
    subCategoryName: string;
}

export enum CategoryType {
    PRODUCT = 1,
    SERVICE = 2,
    OTHER = 3
}
//1 (m), 2 (m2), 0 (Nao presente)
export enum MeasureType {
    METRO = 1,
    METRO2 = 2,
    NPRESENTE = 0 
}

export const CategoryStatusLabels: { [key: number]: string } = {
    [CategoryType.PRODUCT]: "Produto",
    [CategoryType.SERVICE]: "Serviço",
    [CategoryType.OTHER]: "Outro"
};

export enum PriceType {
    BOX = "DUAL",
    UNITARY = "SINGLE"
}

export interface SubCategory {
    subcategory_id: string;
    title: string;
    banner_id: string;
    items: number;
    category_id: string;
}

export interface Brand {
    brand_id: string;
    title: string;
    banner_id: string;
    items: number;
}

export interface Installation {
    installation_id: string;
    title: string;
    banner_id: string;
}

export interface Topic {  
    topic_id: string;
    title: string;
    topic_type: TopicType;
    items: number;
}

// {
//     "category_id": "#0000001",
//     "category_type": 1,
//     "items": 2,
//     "title": "Laminado",
//     "topic_id": "#N0irBrhv"
//   }

export enum TopicType {
    CARROUSEL = 1,
    GALLERY = 2
}

export const TopicTypeLabels: { [key: number]: string } = {
    [TopicType.CARROUSEL]: "Carrossel",
    [TopicType.GALLERY]: "Galeria"
};

export interface CategoryInfo {
    category_id: string;
    title: string;
    banner_id: string;
    subcategory: SubCategory[];
    brand: Brand[];
    topic: Topic[];
    category_type: CategoryType;
    dimensions: any[];
    details: any[];
    installations: any[];
}

export interface ProductInfo {
    product_id: string;
    title: string;
    category_data: CategoryData;
    imgs: string[];
    price_type: PriceType;
    price: string[];
    details: any[];
    dimensions: any[];
    topics: any[];
    measures: MeasureType;
    installation: boolean;
    available: boolean;
}

export interface DetailsData {
    title: string;
    data: Data[];
}

export interface Data {
    data_id: string;
    key: string;
    value: string;
}

export interface CategoryData {
    brand_id: string;
    category_id: string;
    subcategory_id: string;
    brand_title: string;
    category_title: string;
    subcategory_title: string;
}
