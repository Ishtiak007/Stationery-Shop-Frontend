import { RootState } from "@/redux/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface productState {
  filter: Record<string, string>;
  sort: string;
  search: string;
}

const initialState: productState = {
  search: "",
  filter: {},
  sort: "createdAt",
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setFilter: (state, action: PayloadAction<Record<string, string>>) => {
      state.filter = action.payload;
    },
    setSort: (state, action: PayloadAction<string>) => {
      state.sort = action.payload;
    },
  },
});

export const { setFilter, setSort, setSearch } = productSlice.actions;
export const selectProductState = (state: RootState) => state.product;
export default productSlice.reducer;
