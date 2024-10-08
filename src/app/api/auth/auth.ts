import { fetchClient } from "@/app/api/fetchClient";

const ApiAuth = {
    async authLogin({
        email,
        password,
    }: {
        email?: string;
        password?: string;
    }) {
        try {
            const response = await fetch(
                `${process.env.API_URL}/Account/authenticate`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ UserNameOrEmail: email, password }),
                }
            );

            return response;
        } catch (error) {
            console.error("Fetch error:", error);
        }
    },
    async authLogout({ email }: { email: string }) {
        try {
            const response = await fetchClient({
                method: "POST",
                param: `Account/logout?userEmail=${email}`,
                body: {},
            });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Fetch error:", error);
        }
    },
    async authRefresh({
        email,
        refreshToken,
    }: {
        email?: string;
        refreshToken?: string;
    }) {
        try {
            const body = {
                email,
                token: refreshToken,
            };
            const response = await fetch(
                `${process.env.API_URL}/Account/refreshtoken`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(body),
                }
            );
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Fetch error:", error);
        }
    },
    async authRegister({
        email,
        userName,
        password,
        confirmPassword,
    }: {
        email: string;
        userName: string;
        password: string;
        confirmPassword: string;
    }) {
        try {
            const response = await fetch(
                `${process.env.API_URL}/Account/register`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        userName,
                        email,
                        password,
                        confirmPassword,
                    }),
                }
            );

            return response;
        } catch (error) {
            return Promise.reject(error);
        }
    },
    async authExternalLogin({
        provider,
        idToken,
    }: {
        provider: string;
        idToken: string;
    }) {
        try {
            const response = await fetch(
                `${process.env.API_URL}/Account/ExternalLogin`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        provider,
                        idToken,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            return data;
        } catch (error) {
            return Promise.reject(error);
        }
    },

    async authChangePassWord({
        email,
        currentPassword,
        password,
        confirmPassword,
    }: {
        email: string;
        currentPassword: string;
        password: string;
        confirmPassword: string;
    }) {
        try {
            const response = await fetchClient({
                method: "POST",
                param: `Account/reset-password`,
                body: { email, currentPassword, password, confirmPassword },
            });
            console.log("djhskds", response);

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            return response;
            // const response = await fetch(
            //     `${process.env.API_URL}/Account/reset-password`,
            //     {
            //         method: "POST",
            //         headers: {
            //             "Content-Type": "application/json",

            //         },
            //         body: JSON.stringify({
            //             email,
            //             currentPassword,
            //             password,
            //             confirmPassword,
            //         }),
            //     }
            // );

            // if (!response.ok) {
            //     throw new Error("Network response was not ok");
            // }
            // return response;
        } catch (error) { }
    },
    async authUpdateInfo(body: any) {
        try {
            const response = await fetchClient({ method: "PUT", param: `Account/update-user`, body })
            return response;
        } catch (error) {
            throw error
        }


    },

    async authGetInfo({ userId }: { userId: string }) {

        try {
            const response = await fetchClient({ method: "GET", param: `Account/user/${userId}` })
            return response;
        } catch (error) {
            throw error; // Throw error to handle in calling function
        }
    }
};
export default ApiAuth;
