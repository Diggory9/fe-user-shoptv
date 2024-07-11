export interface ProductImageModel {
    id?: string;
    url?: string;
}

export interface ProductItemModel {
    selected: unknown;

    id: string;
    quantity?: number;
    color?: { id?: string, colorName?: string, colorCode?: string };
    productImages?: ProductImageModel[];
}
export interface ProductModel {
    id?: string;
    name?: string;
    description?: string;
    productQuantity?: number;
    productBrand?: string;
    price?: number;
    supplier?: { id: string, name: string };
    image?: string;
    category: { id: string, name: string };
    categoryId?: string;
    discountId?: string;
    productItems: ProductItemModel[];
    productSpecifications?: ProductSpecificationModel[];
    rating?: { rate?: number, count?: number };
    productDiscount?: { id?: null, type?: null, value?: number };

}
export interface ProductSpecificationModel {
    id?: string;
    specValue: string;
    specType: string;
}
