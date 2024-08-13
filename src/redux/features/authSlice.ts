
import ApiAuth from '@/app/api/auth/auth';
import { AuthModel } from '@/models/auth-model';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
interface UserState {
    isLogin: boolean;
    data: AuthModel | null;
    error: string | null;
    status?: 'loading' | 'succeeded' | 'failed' | null;

}

const initialState: UserState = {
    isLogin: false,
    data: null,
    error: null,
    status: null,
}
// export const login = createAsyncThunk('user/login', async ({ email, password }: { email?: string, password?: string }) => {
//     const response = await ApiAuth.authLogin({ email, password });
//     const data = response.data;
//     return data;
// });
export const externalLogin = createAsyncThunk('user/externalLogin', async ({ provider, idToken }: { provider: string, idToken: string }) => {
    const response = await ApiAuth.authExternalLogin({ provider, idToken });
    const data = response.data;
    console.log(data);
    return data;
});
export const logout = createAsyncThunk('user/logout', async ({ email }: { email: string }) => {
    await ApiAuth.authLogout({ email })
});
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        resetAuthStatus(state) {
            state.status = null;
        },
        setAuthData(state, action) {
            state.isLogin = true;
            state.data = action.payload;
        },
        removeAuth(state) {
            state.data = null;
            state.isLogin = false;
            state.error = null;
            state.status = null;
        }

    }, extraReducers(buiders) {
        buiders.addCase(logout.fulfilled, (state) => {
            state.data = null;
            state.isLogin = false;
            state.error = null;
            state.status = null;
        });
        buiders.addCase(externalLogin.fulfilled, (state, action) => {
            state.data = action.payload;
            state.isLogin = true;
            state.error = null;
            state.status = 'succeeded';
        });
        buiders.addCase(externalLogin.rejected, (state, action) => {
            state.error = action.error.message || "";
            state.status = 'failed';
        });
    }
});

export const { resetAuthStatus, setAuthData, removeAuth } = authSlice.actions;
export default authSlice.reducer;