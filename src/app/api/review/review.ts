import { CreateReviewModel } from "@/models/review-model";

const ApiReview = {
    async createReview(values: {}) {

        const response = await fetch(`${process.env.API_URL}/Review/create-review`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        })
        return response
    },
    async getReviews({ productId, pageNumber = 1, pageSize = 10 }: { productId: string, pageNumber: number, pageSize: number }) {
        try {
            const response = await fetch(`${process.env.API_URL}/Review/${productId}?pageNumber=${pageNumber}&pageSize=${pageSize}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error create review:", error);
        }

    }
}
export default ApiReview;