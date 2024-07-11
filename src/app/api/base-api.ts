import { checkIfTokenExpired } from '@/utils/tokenUtils';
import { RootState, store } from '../../redux/store';
import { refreshToken } from '@/redux/features/authSlice';

const fetchBaseAuth = async (input: RequestInfo, init?: RequestInit): Promise<Response> => {
    try {
        const { data } = store.getState().auth;// null
        if (data?.jwToken) {
            const checkAccessTokenExpired = checkIfTokenExpired(data?.jwToken)
            if (checkAccessTokenExpired)
                store.dispatch(refreshToken({ email: data.email || "", refreshToken: data.refreshToken || "" }));
        }



        const updatedInit = {
            ...init,
            headers: {
                ...init?.headers,
                'Authorization': `Bearer ${data?.jwToken || ""}`,
            },
        };

        return fetch(input, updatedInit);
    } catch (error) {
        throw error;
    }

};

export default fetchBaseAuth;
