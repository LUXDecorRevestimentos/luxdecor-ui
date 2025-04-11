export interface CategoryTable {
  categoryId: string;
  categoryName: string;
  subCategory: string;
  topic: number;
  items: number;
  type: CategoryType;
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

export const CategoryStatusLabels: { [key: number]: string } = {
    [CategoryType.PRODUCT]: "Produto",
    [CategoryType.SERVICE]: "Serviço",
    [CategoryType.OTHER]: "Outro"
};

export enum PriceType {
    BOX = 1,
    UNITARY = 2
}

export const PriceTypeLabels: { [key: number]: string } = {
    [PriceType.BOX]: "Caixa",
    [PriceType.UNITARY]: "Unitário"
};

export interface SubCategory {
    subCategoryId: string;
    subCategoryName: string;
    imgBannerSub: string;
    items: number;
}

export interface Brand {
    brandId: string;
    brandName: string;
    imgBrand: string;
    items: number;
}

export interface Topic {  
    topicId: string;
    topicName: string;
    topicType: TopicType;
    items: number;
}

export enum TopicType {
    CARROUSEL = 1,
    GALLERY = 2
}

export const TopicTypeLabels: { [key: number]: string } = {
    [TopicType.CARROUSEL]: "Carrossel",
    [TopicType.GALLERY]: "Galeria"
};

export interface CategoryInfo {
    categoryId: string;
    categoryName: string;
    imgBanner: string;
    subCategories: SubCategory[];
    brands: Brand[];
    topics: Topic[];
    type: CategoryType;
    dimensions: DetailsData;
    details: DetailsData;
}

export interface ProductInfo {
    productId: string;
    productName: string;
    categoryId: string;
    categoryName: string;
    imgs: string[];
    price: number;
    brandId: string;
    brandName: string;
    categoryType: CategoryType;
    dimensions: DetailsData;
    details: DetailsData;
}

export interface DetailsData {
    title: string;
    data: Data[];
}

export interface Data {
    value: string;
    label: string;
}


export interface SpecData {
    value: string;
    label: string;
}

// Title
// [SELECT] Produtct Name *
// [TABLE] products *
// [INPUT] ADD 
// [INPUT] EDIT
// [INPUT] TITLE
// [SELECT] CATEGORY []
// [SELECT] SubCategory []
// [SELECT] BrandName []
// [IMG] BRAND IMG *
// [IMG] BRAND IMG *
// [IMG] BRAND IMG *
// [IMG] BRAND IMG *
// [SELECT] PRICETYPE []
// [SELECT] MEDIDA []
// [INPUT] PRICE_UNIT *
// [INPUT] PRICE_BOX *
// [TABLE] ESPECIFICACOES
// [TABLE] DEFINICOES

// Title
// [SELECT] Category Name *
// [SELECT] ImgBanner 
// [IMG] BANNER *
// [TABLE] subCategories *
// [BTN] Add SubCategory *
// [INPUT] SUBNAME *
// [SELECT] ImgBannerSub 
// [IMG] BANNER SUB *
// [TABLE] brands *
// [BTN] Add Brand
/// [INPUT] BRANDNAME
// [IMG] BRAND IMG *
// [TABLE] topics *
// [INPUT] TOPICNAME *
// [SELECT] TYPE 
// [SELECT] TYPEPRICE

// [CREATE_TABLE] CAMPOS_ESPECIFICAOES
// [CREATE_TABLE] CAMPOS_DEFINICOES
