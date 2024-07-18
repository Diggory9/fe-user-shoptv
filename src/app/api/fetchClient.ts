// fetchClient.ts
import { store } from '@/redux/store';
import ApiAuth from '@/app/api/auth/auth';
import { setAuthData } from '@/redux/features/authSlice';
import { checkIfTokenExpired } from '@/utils/tokenUtils';

type Config = {
    param: string;
    method: "GET" | "POST" | "PUT" | "DELETE";
    body?: any;
};

export const fetchClient = async (config: Config) => {
    const auth = store.getState().authCredentials;
    let accessToken = auth.data?.jwToken;

    if (checkIfTokenExpired(auth.data?.jwToken || '')) {
        try {
            const res = await ApiAuth.authRefresh({ email: auth.data?.email, refreshToken: auth.data?.refreshToken });
            store.dispatch(setAuthData(res.data));
            accessToken = res.data.jwToken;
        } catch (error) {
            window.location.href = "/login";
            throw error; // Throw error to handle in calling function
        }
    }

    const response = await fetch(`${process.env.API_URL}/${config.param}`, {
        method: config.method,
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(config.body),
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return await response.json();
};
