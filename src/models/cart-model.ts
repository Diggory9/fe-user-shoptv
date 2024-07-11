export interface CartModel {
    color?: { colorName?: string, colorCode?: string },
    id?: string,
    image?: { id?: string, url?: string },
    name?: string,
    discount?: { type?: string, value?: number },
    price?: number,
    quantity?: number,
    quantityInStock?: number,
}
