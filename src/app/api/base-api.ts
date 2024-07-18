import { checkIfTokenExpired } from '@/utils/tokenUtils';
import ApiAuth from '@/app/api/auth/auth';
import { store } from '@/redux/store';
import { removeAuth } from '@/redux/features/authSlice';
import { signOut } from 'next-auth/react';
import { resetCart } from '@/redux/features/cartSlice';

const fetchBaseAuth = async (input: RequestInfo, init?: RequestInit): Promise<Response> => {
    try {
        let accessToken = localStorage.getItem('accessToken') ? JSON.parse(localStorage.getItem('accessToken') || '') : null;
        const refreshToken = localStorage.getItem('refreshToken') ? JSON.parse(localStorage.getItem('refreshToken') || '') : null;
        const email = localStorage.getItem('email') ? JSON.parse(localStorage.getItem('email') || '') : null;

        if (accessToken) {
            const checkAccessTokenExpired = checkIfTokenExpired(accessToken)
            console.log(checkAccessTokenExpired);
            if (checkAccessTokenExpired) {

                try {

                    const response = await ApiAuth.authRefresh({ email: email || "", refreshToken: refreshToken || "" });

                    const data = response.data;
                    console.log(checkAccessTokenExpired);
                    localStorage.setItem('accessToken', JSON.stringify(data?.jwToken));
                    localStorage.setItem('refreshToken', JSON.stringify(data?.refreshToken));
                    accessToken = data?.jwToken;
                } catch (error) {

                    console.error("Fetch error:", error);
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                    localStorage.removeItem('email');
                    store.dispatch(resetCart());
                    store.dispatch(removeAuth());
                    signOut();
                    window.location.href = "/login"
                    throw error;
                }
            }

        }
        if (accessToken === null) {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('email');

            //store.dispatch(resetCart());
            //store.dispatch(removeAuth());
            console.log('Access token')
            signOut();
            //window.location.href = "/login"
        }
        const updatedInit = {
            ...init,
            headers: {
                ...init?.headers,
                'Authorization': `Bearer ${accessToken || ""}`,
            },
        };
        return fetch(input, updatedInit);
    } catch (error) {
        throw error;
    }

};

export default fetchBaseAuth;
