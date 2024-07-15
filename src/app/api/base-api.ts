import { checkIfTokenExpired } from '@/utils/tokenUtils';
import ApiAuth from '@/app/api/auth/auth';
import { redirect } from 'next/navigation';
import { store } from '@/redux/store';
import { resetCart } from '@/redux/features/cartSlice';
import { removeAuth } from '@/redux/features/authSlice';
import { signOut } from 'next-auth/react';

const fetchBaseAuth = async (input: RequestInfo, init?: RequestInit): Promise<Response> => {
    try {

        let accessToken = localStorage.getItem('accessToken') ? JSON.parse(localStorage.getItem('accessToken') || '') : null;
        const refreshToken = localStorage.getItem('refreshToken') ? JSON.parse(localStorage.getItem('refreshToken') || '') : null;
        const email = localStorage.getItem('email') ? JSON.parse(localStorage.getItem('email') || '') : null;

        if (accessToken) {
            const checkAccessTokenExpired = checkIfTokenExpired(accessToken)

            if (checkAccessTokenExpired) {

                try {

                    const response = await ApiAuth.authRefresh({ email: email || "", refreshToken: refreshToken || "" });

                    const data = response.data;

                    localStorage.setItem('accessToken', JSON.stringify(data?.jwToken));
                    localStorage.setItem('refreshToken', JSON.stringify(data?.refreshToken));
                    accessToken = data?.jwToken;
                } catch (error) {

                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                    localStorage.removeItem('email');

                    signOut();
                    redirect('/login');
                }
            }

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
