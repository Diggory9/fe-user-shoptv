export interface ReviewModel {
    id: string;
    rating: number;
    content: string;
    userName: string;
    createAt: string;
    reviewImages?: { url: string }[];
}

export interface CreateReviewModel {


    productId?: string,
    userId?: string,
    rating?: number,
    content?: string,
    reviewImages?: {
        url: string,
    }
}