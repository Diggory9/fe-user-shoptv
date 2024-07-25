import { fetchClient } from "@/app/api/fetchClient";


export const ApiCheckout = {
    async reviewCart(body: any) {
        try {
            const response = await fetchClient({ method: "POST", param: `Order/review-checkout`, body });
            return response;
        }
        catch (error) {
            console.error("Error during fetch:", error);

        }
    },
    async saveOrder(body: any) {
        const response = await fetchClient({ param: `Order/create`, method: "POST", body });
        return response;

    },
    async getUrlVnpay(body: any) {
        try {
            const response = await fetchClient({ method: "POST", param: `Payment/vnpay`, body });


            return response;

        } catch (error) {
            console.error("Get url:", error);
        }
    },
    async createOrderVnpay(txnRef: string) {
        try {

            const response = await fetch(
                `${process.env.API_URL}/Payment/create-order/${txnRef}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    }
                }
            );
            if (!response.ok) {
                throw new Error(`Create order failed`);
            }
            return response.json();
        }
        catch (error) {

            throw new Error(`Create order failed`);
        }

    }
}

