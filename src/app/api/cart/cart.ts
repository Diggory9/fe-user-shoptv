// ApiCart.ts
import { fetchClient } from "@/app/api/fetchClient";

const ApiCart = {
    async getCartByUser(userId: string) {
        try {
            const res = await fetchClient({ method: "POST", param: `Cart/get-cart/${userId}`, body: {} });
            return res;
        } catch (error) {
            console.error("Fetch error: ", error);
            throw error; // Throw error to handle in calling function
        }
    },

    async addProductToCart(userId: string | null, productItemId: string, incr: number | null = null, quantity: number | null = null) {
        try {
            let body = {
                userId: userId,
                productItemId: productItemId,
                ...(quantity !== null && { quantity: quantity }),
                ...(incr !== null && { incrementBy: incr })
            };

            const res = await fetchClient({ method: "POST", param: `Cart/add-to-cart`, body });
            return res;
        } catch (error) {
            console.error("Fetch error: ", error);
            throw error; // Throw error to handle in calling function
        }
    },

    async deleteProductToCart({ userId, productItemId }: { userId: string, productItemId: string }) {
        try {
            const res = await fetchClient({ method: "DELETE", param: `Cart/${userId}/item/${productItemId}`, body: {} });
            return res;
        } catch (error) {
            console.error("Fetch error: ", error);
            throw error; // Throw error to handle in calling function
        }
    }
};

export default ApiCart;
