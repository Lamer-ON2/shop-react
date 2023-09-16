import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { IProduct } from "../../models";
// import { useAppDispatch } from "../../app/hooks";

// const initialState: IProduct[] = [
//   {
//     id: 0,
//     title: "",
//     price: 0,
//     description: "",
//     category: "",
//     image: "",
//     rating: {
//       rate: 1,
//       count: 1,
//     },
//   },
// ];

// const initialState: any = [];
// const dispatch = useAppDispatch();

const initialState = {
  products: [] as IProduct[],
  status: "" as string,
  errorLoading: "" as any,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.get<IProduct[]>(
        "https://fakestoreapi.com/products?limit=2"
      );
      if (response.status < 200 || response.status >= 300) {
        throw new Error("Server Error!");
      }
      return response.data;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.message);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // addProducts(state, action: PayloadAction<IProduct[]>) {
    //   state = action.payload;
    // },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state, action) => {
      // console.log("pending");
      state.status = "loading";
      state.errorLoading = "";
    });

    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      // console.log("fulfilled");
      state.status = "resolved";
      state.products = action.payload;
      localStorage.setItem("storageProducts", JSON.stringify(action.payload));
      // return (state = action.payload)
    });

    builder.addCase(fetchProducts.rejected, (state, action) => {
      console.log("rejected", action.payload);
      state.status = "rejected";
      state.errorLoading = action.payload;
      // state.error = toString(action.payload);
    });
  },
});

// export const { addProducts } = productsSlice.actions;
export default productsSlice.reducer;
