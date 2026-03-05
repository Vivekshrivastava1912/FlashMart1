import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

const initialState = {
    cartItems: [],
    totalPrice: 0,
    totalItems: 0,
};

// Helper function to calculate totals
const calculateTotals = (state) => {
    state.totalItems = state.cartItems.reduce((total, item) => total + item.quantity, 0);
    state.totalPrice = state.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const product = action.payload;
            const existingItem = state.cartItems.find(item => item._id === product._id);

            if (existingItem) {
                existingItem.quantity += 1;
                toast.success(`Increased quantity of ${product.name}`);
            } else {
                state.cartItems.push({ ...product, quantity: 1 });
                toast.success(`Added ${product.name} to cart`);
            }
            calculateTotals(state);
        },
        removeFromCart: (state, action) => {
            const productId = action.payload;
            state.cartItems = state.cartItems.filter(item => item._id !== productId);
            calculateTotals(state);
        },
        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const item = state.cartItems.find(item => item._id === id);

            if (item && quantity > 0) {
                item.quantity = quantity;
                calculateTotals(state);
            }
        },
        clearCart: (state) => {
            state.cartItems = [];
            state.totalPrice = 0;
            state.totalItems = 0;
        }
    }
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
