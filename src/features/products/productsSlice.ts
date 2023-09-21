import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { IProduct } from "../../models";

const initialState = {
  products: [] as IProduct[],
  singleProduct: {} as IProduct,
  status: "" as string,
  status2: "" as string,
  errorLoading: "" as any,
  select: "" as string,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.get<IProduct[]>(
        "https://fakestoreapi.com/products?limit=5"
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

export const fetchSingleProduct = createAsyncThunk(
  "products/fetchSingleProduct",
  async (data: { id: string | undefined }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.get<IProduct>(
        `https://fakestoreapi.com/products/${data?.id || {}}?limit=1`
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
    addSelect(state, action: PayloadAction<string>) {
      state.select = action.payload;
    },
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
      // localStorage.setItem("storageProducts", JSON.stringify(action.payload));
    });

    builder.addCase(fetchProducts.rejected, (state, action) => {
      console.log("rejected", action.payload);
      state.status = "rejected";
      state.errorLoading = action.payload;
    });

    builder.addCase(fetchSingleProduct.pending, (state, action) => {
      // console.log("pending");
      state.status2 = "loading";
      state.errorLoading = "";
      state.singleProduct = {} as IProduct;
    });

    builder.addCase(fetchSingleProduct.fulfilled, (state, action) => {
      // console.log("fulfilled");
      state.status2 = "resolved";
      state.singleProduct = action.payload;
    });

    builder.addCase(fetchSingleProduct.rejected, (state, action) => {
      // console.log("rejected", action.payload);
      state.status2 = "rejected";
      state.errorLoading = action.payload;
    });
  },
});

export const { addSelect } = productsSlice.actions;
export default productsSlice.reducer;
