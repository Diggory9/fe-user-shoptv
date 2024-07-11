export interface ReviewCheckoutModel {
    reviewCheckoutItems: ReviewCheckoutItemModel[],
    subTotal: number,
    discountAmount: number,
    total: number
}

export interface ReviewCheckoutItemModel {
    productItemId: string,
    productName: string,
    quantity: number,
    price: number,
    image: string,
    amountDiscount: number,
    total: number
}
