

export const ApiCheckout = {
    async reviewCart(body: any) {
        try {
            const response = await fetch(`${process.env.API_URL}/Order/review-checkout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        }
        catch (error) {
            console.error("Error during fetch:", error);

        }
    },
    async saveOrder(body: any) {

        console.log(process.env.API_URL),
            console.log(body)
        const response = await fetch(`${process.env.API_URL}/Order/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });


        return response;

    },
    async getUrlVnpay(body: any) {
        try {
            const response = await fetch(
                `${process.env.API_URL}/Payment/vnpay`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(body),
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = response.json();
            return data;

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

