export interface ProductData {
  price: string;
}

export interface Product {
  id: string;
  title: string;
  type: string;
  imageUrl: string;
  data: ProductData;
}


export interface ModalFilter{
  subCategorys: string[];
  installTypes: string[];
  brands: string[];
  priceRange: string[];

  selectedSubCategories: string;
  selectedInstallTypes: string;
  selectedBrands: string;
}