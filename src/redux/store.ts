import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { baseApi } from "./api/baseApi";
import storage from "redux-persist/lib/storage";
import { cartSlice } from "./features/cart/cartSlice";
import { auth } from "./features/auth/authSlice";
import { productSlice } from "./features/products/productSlice";

// Root Reducer
const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  auth: auth.reducer,
  cart: cartSlice.reducer,
  product: productSlice.reducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "cart", "product"],
};

// Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure Store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
});

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Redux Persist Store
export const persistor = persistStore(store);
