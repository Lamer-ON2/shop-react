import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { IProduct } from "../../models";

const initialState = {
  products: [] as IProduct[],
  singleProduct: {} as IProduct,
  shoppingCart: [] as IProduct[],
  shoppingCartModal: false as boolean,
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
        "https://fakestoreapi.com/products"
        // "https://fakestoreapi.com/products?limit=15"
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
        `https://fakestoreapi.com/products/${data?.id}?limit=1`
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
    addProductToCart(state, action: PayloadAction<number>) {
      let arrForStorage = [];
      let productsStorage = JSON.parse(
        localStorage.getItem("products") || "{}"
      );
      if (!localStorage.getItem("cart")) {
        arrForStorage.push(
          productsStorage.find((prod: IProduct) => prod.id === action.payload)
        );
        localStorage.setItem("cart", JSON.stringify(arrForStorage));
        console.log("! local");
      } else {
        arrForStorage = JSON.parse(localStorage.getItem("cart") || "{}");

        let productCheck = arrForStorage.find(
          (prod: IProduct) => prod.id === action.payload
        );

        productCheck === undefined
          ? arrForStorage.push(
              productsStorage.find(
                (prod: IProduct) => prod.id === action.payload
              )
            )
          : console.log("false");
        localStorage.setItem("cart", JSON.stringify(arrForStorage));
      }

      let product = state.shoppingCart.find(
        (prod) => prod.id === action.payload
      );

      product === undefined
        ? state.shoppingCart.push(
            state.products.find((p) => p.id === action.payload) ||
              ({} as IProduct)
          )
        : console.log("false");
    },
    deleteProductFromCart(state, action: PayloadAction<number>) {
      let productsStorage = JSON.parse(localStorage.getItem("cart") || "{}");

      localStorage.setItem(
        "cart",
        JSON.stringify(
          productsStorage.filter((prod: IProduct) => prod.id !== action.payload)
        )
      );
      state.shoppingCart = state.shoppingCart.filter(
        (prod) => prod.id !== action.payload
      );
    },
    toggleCartModal(state) {
      state.shoppingCartModal = !state.shoppingCartModal;
    },
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

      // localStorage.removeItem("products");

      if (!localStorage.getItem("products")) {
        localStorage.setItem("products", JSON.stringify(action.payload));
      }
      if (!localStorage.getItem("cart")) {
        localStorage.setItem("cart", JSON.stringify([]));
      }
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

export const {
  addSelect,
  addProductToCart,
  deleteProductFromCart,
  toggleCartModal,
} = productsSlice.actions;
export default productsSlice.reducer;
