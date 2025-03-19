import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Cart Item Interface
export interface IcartItem {
  product: string;
  name: string;
  price: number;
  quantity: number;
  stock: number;
  image: string;
  userEmail?: string;
}

// Cart State Interface (Fixed Duplicate Declaration)
export interface CartState {
  items: IcartItem[];
  totalQuantity: number;
  totalPrice: number;
}

// Initial State
const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};

// Cart Slice
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Add Item to Cart
    addToCart: (state, action: PayloadAction<IcartItem>) => {
      const existingItem = state.items.find(
        (item) => item.product === action.payload.product
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }

      state.totalQuantity += action.payload.quantity;
      state.totalPrice += action.payload.price * action.payload.quantity;
    },

    // Update Item Quantity
    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.product === id);

      if (existingItem && quantity > 0) {
        const difference = quantity - existingItem.quantity;
        existingItem.quantity = quantity;
        state.totalQuantity += difference; // Fixed incorrect calculation
        state.totalPrice += existingItem.price * difference;
      }
    },

    // Remove Item from Cart
    removeFromCart: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;
      const existingItem = state.items.find((item) => item.product === itemId);

      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.totalPrice -= existingItem.price * existingItem.quantity;
        state.items = state.items.filter((item) => item.product !== itemId);
      }
    },

    // Place Order (Clear Cart & Update Stock)
    placeOrder: (state) => {
      state.items.forEach((item) => {
        item.stock = Math.max(0, item.stock - item.quantity);
      });

      // Clear Cart
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
  },
});

// Export Actions
export const { addToCart, updateQuantity, removeFromCart, placeOrder } =
  cartSlice.actions;

// Export Reducer
export default cartSlice.reducer;
