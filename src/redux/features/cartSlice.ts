import ApiCart from "@/app/api/cart/cart";
import { CartModel } from "@/models/cart-model";
import { logout } from "@/redux/features/authSlice";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface CartState {
    data: CartModel[] | null;
    error: string | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed' | 'addSuccessed' | 'deleteSuccessed';
}
const initialState: CartState = {
    data: [],
    status: 'idle',
    error: null as string | null

}
export const getCart = createAsyncThunk('cart/fetchCart', async ({ userId, }: { userId: string }) => {
    const response = await ApiCart.getCartByUser(userId);
    return response.data;
});
export const addToCart = createAsyncThunk('cart/addToCart', async ({ userId, productItem, incr, quantity }: { userId: string | null, productItem: string, incr?: number, quantity: number | null }) => {
    const response = await ApiCart.addProductToCart(userId, productItem, incr, quantity);
    return response.data;
});
export const deleteProductFromCart = createAsyncThunk('cart/deleteToCart', async ({
    userId, productItemId }: { userId: string, productItemId: string }) => {
    const response = await ApiCart.deleteProductToCart({ userId: userId, productItemId: productItemId });
    console.log(response);
    return response.data;
});


const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        resetCartStatus(state) {
            state.status = 'idle';
        },
        resetCart(state) {
            state = initialState
        }

    }, extraReducers(buiders) {
        buiders
            .addCase(logout.fulfilled, (state) => {
                state.data = null;
                state.error = null;
                state.status = 'idle';
            });
        buiders.addCase(getCart.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = 'succeeded';
            state.error = null;
        });
        buiders.addCase(addToCart.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = 'addSuccessed';
            state.error = null;
        });
        buiders.addCase(deleteProductFromCart.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = 'deleteSuccessed';
            state.error = null;
        });
        buiders.addCase(getCart.rejected, (state, action) => {
            state.error = action.error.message || "";
            state.status = 'failed';
        });
        buiders.addCase(addToCart.rejected, (state, action) => {
            state.error = action.error.message || "";
            state.status = 'failed';
        });
        buiders.addCase(deleteProductFromCart.rejected, (state, action) => {
            state.error = action.error.message || "";
            state.status = 'failed';
        });
    }
});

export const { resetCartStatus, resetCart } = cartSlice.actions;
export default cartSlice.reducer;