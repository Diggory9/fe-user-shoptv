

const token = process.env.TOKEN_GHN;
export const ApiDHN = {
    async getProvinces() {
        console.log('gnh', token)
        const url =
            "https://online-gateway.ghn.vn/shiip/public-api/master-data/province";

        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    token: `${token}`,
                },
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            } else {

            }
            const result = await response.json();
            return result;
        } catch (error) {
            console.error("Error during fetch:", error);
        }
    },
    async getDistricts({ provinceId }: { provinceId: string }) {
        const url = `https://online-gateway.ghn.vn/shiip/public-api/master-data/district?province_id=${provinceId}`;
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    token: `${token}`,
                },
            });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const result = await response.json();
            return result;

        } catch (error) {
            console.error("Error during fetch:", error);
        }
    },
    async getWards({ districtId }: { districtId: string }) {
        const url = `https://online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=${districtId}`;
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    token: `${token}`,
                },
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const result = await response.json();
            return result;

        } catch (error) {
            console.error("Error during fetch:", error);

        }
    }
}