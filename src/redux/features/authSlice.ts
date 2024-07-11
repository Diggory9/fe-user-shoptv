
import ApiAuth from '@/app/api/auth/auth';
import { AuthModel } from '@/models/auth-model';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import Item from 'antd/es/list/Item';
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


export const refreshToken = createAsyncThunk('user/refresh-token', async ({ email, refreshToken }: { email: string, refreshToken: string }) => {

    const response = await ApiAuth.authRefresh({ email: email, refreshToken: refreshToken });
    return response.data;
});
export const login = createAsyncThunk('user/login', async ({ email, password }: { email?: string, password?: string }) => {
    const response = await ApiAuth.authLogin({ email, password });
    return response.data;
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
    }, extraReducers(buiders) {
        buiders.addCase(refreshToken.fulfilled, (state, action) => {
            state.data = action.payload;
            state.error = null;
            state.status = 'succeeded';
        });
        buiders.addCase(refreshToken.rejected, (state, action) => {
            state.error = action.error.message || "";
            state.status = 'failed';
        });
        buiders.addCase(login.fulfilled, (state, action) => {
            state.data = action.payload;
            state.isLogin = true;
            state.error = null;
            state.status = 'succeeded';
        });
        buiders.addCase(login.rejected, (state, action) => {
            state.error = action.error.message || "";
            state.status = 'failed';
        });
        buiders.addCase(logout.fulfilled, (state) => {
            state.data = null;
            state.isLogin = false;
            state.error = null;
            state.status = null;
        });
    }
});

export const { resetAuthStatus } = authSlice.actions;
export default authSlice.reducer;