import fetchBaseAuth from "@/app/api/base-api";


const ApiCart = {
    async getCartByUser(userId: string) {
        console.log(userId);
        try {
            const response = await fetchBaseAuth(
                `${process.env.API_URL}/Cart/get-cart/${userId}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*"
                    },
                }
            );
            console.log(response);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Fetch error: ", error);
            throw error;
        }
    },
    async addProductToCart(UserId: string | null, productItemId: string, incr: number | null = null, quantity: number | null = null) {
        try {
            let body = {
                userId: UserId,
                productItemId: productItemId,
                ...(quantity !== null && { quantity: quantity }),
                ...(incr !== null && { incrementBy: incr })
            }

            const response = await fetchBaseAuth(
                `${process.env.API_URL}/Cart/add-to-cart`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(body)
                }
            );

            const data = await response.json();
            console.log("res", data);

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            return data;
        } catch (error) {
            console.error("Fetch error: ", error);
            throw error;
        }
    },
    async deleteProductToCart({ userId, productItemId }: { userId: string, productItemId: string }) {
        try {
            const response = await fetchBaseAuth(
                `${process.env.API_URL}/Cart/${userId}/item/${productItemId}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Fetch error: ", error);
            throw error;
        }
    }

}


export default ApiCart