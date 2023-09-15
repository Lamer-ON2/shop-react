import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { IProduct } from "../models";
// import { useAppDispatch } from "../app/hooks";
// import { addProducts } from "../features/products/productsSlice";

export function useProducts() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");

  async function fetchProducts() {
    // const headers = {
    //   "Content-Type": "application/json",
    //   "Access-Control-Allow-Origin": "*",
    //   "Access-Control-Allow-Methods": "POST,PATCH,OPTIONS",
    // };
    try {
      setError("");
      setLoading(true);
      const response = await axios.get<IProduct[]>(
        "https://fakestoreapi.com/products?limit=10",
        {
          headers: {
            // "Access-Control-Allow-Origin": true,
            "Content-Type": null,
          },
        }
      );
      setProducts(response.data);
      setLoading(false);
      setLoaded(true);
      // add
      // useAppDispatch(addProducts(response.data));
    } catch (e: unknown) {
      const error = e as AxiosError;
      setLoading(false);
      setError(error.message);
    }
  }
  useEffect(() => {
    fetchProducts();
  }, []);
  return { products, error, loading, loaded };
}
