const ApiBanner = {
    async getGroupBannersById(id: string) {
        try {
            const response = await fetch(
                `${process.env.API_URL}/GroupBanner/groups-banner/${id}`,
                {
                    method: "GET",
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
    async getGroupBannersByName(name: string) {
        try {
            const response = await fetch(
                `${process.env.API_URL}/GroupBanner/groups-banner?name=${name}`,
                {
                    method: "GET",
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
export default ApiBanner;
