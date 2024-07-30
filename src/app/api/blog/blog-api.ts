const ApiBlog = {
    async getAllBlog(pageNumber = 1, pageSize = 20) {
        try {
            const response = await fetch(
                `${process.env.API_URL}/Blog?pageNumber=${pageNumber}&pageSize=${pageSize}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (!response) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.log(error);
        }
    },
    async getAllGroupBlog() {
        try {
            const response = await fetch(`${process.env.API_URL}/GroupBlog`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.log(error);
        }
    },
    async getBlogByGroupId(id: string, pageNumber: number, pageSize: number) {
        try {
            const response = await fetch(
                `${process.env.API_URL}/Blog/blog-group/${id}?pageNumber=${pageNumber}&pageSize=${pageSize}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (!response) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.log(error);
        }
    },
    async getBlogById(id: string) {
        try {
            const response = await fetch(`${process.env.API_URL}/Blog/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.log(error);
        }
    },
};
export default ApiBlog;
