const ApiProduct = {
    async getProductPublished({ pageNumber = 1, pageSize = 10 }) {
        try {
            const response = await fetch(
                `${process.env.API_URL}/Product/list-publish?pageNumber=${pageNumber}&pageSize=${pageSize}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            // console.log(data);
            return data;
        } catch (error) {
            console.error("Fetch error: ", error);
            throw error;
        }
    },
    async getProductPublicByCategory({
        id,
        pageNumber = 1,
        pageSize = 10,
    }: {
        id: string;
        pageNumber: number;
        pageSize: number;
    }) {
        try {
            const response = await fetch(
                `${process.env.API_URL}/Product/get-product-by-category-publish/${id}?offset=${pageNumber}&limit=${pageSize}`,
                {
                    method: "POST",
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
    },
    async getDetailProducts(id: string) {
        try {
            const response = await fetch(
                `${process.env.API_URL}/Product/${id}`,
                {
                    method: "POST",
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
    },
    async queryProduct({
        query,
        offset,
        limit,
    }: {
        query: string;
        offset: number;
        limit: number;
    }) {
        try {
            const response = await fetch(
                `${process.env.API_URL}/Product/query-product?query=${query}&offset=${offset}&limit=${limit}`,
                {
                    method: "POST",
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
    },
};
export default ApiProduct;
