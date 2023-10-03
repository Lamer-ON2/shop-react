import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

import "./SingleProduct.scss";
import {
  fetchSingleProduct,
  addProductToCart,
  fetchProducts,
} from "../../features/products/productsSlice";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { deepPurple } from "@mui/material/colors";

export const SingleProduct = () => {
  const dispatch = useAppDispatch();
  const { status2, errorLoading } = useAppSelector((state) => state.products);
  let productState = useAppSelector((state) => state.products.singleProduct);
  let maintState = useAppSelector((state) => state.products.products);
  const { id } = useParams();
  // console.log("productState.id", productState.id);
  // console.log("productState", productState);
  // console.log("id", id);
  // console.log("maintState", maintState);

  useEffect(() => {
    dispatch(fetchSingleProduct({ id }));
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="container">
      <div className="wrapper">
        {status2 === "resolved" &&
          Object.keys(productState).length &&
          productState.id && (
            <div className={"card single-card"}>
              <img
                src={productState?.image}
                alt={productState?.title}
                width={200}
                height={200}
              />
              <p>{productState?.title}</p>
              <p>
                <b>Category:</b> {productState?.category}
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <strong className="price">
                  <span>$</span>
                  {productState?.price}
                </strong>
                <IconButton
                  sx={{ color: deepPurple[900], marginLeft: "15px" }}
                  aria-label="add to the shopping cart"
                  onClick={() => {
                    dispatch(addProductToCart(Number(id)));
                  }}
                >
                  <ShoppingCartIcon />
                </IconButton>
              </div>
              <div>
                <p>{productState?.description}</p>
                <p>
                  Rate:
                  <span style={{ fontWeight: "bold", marginLeft: 5 }}>
                    {productState?.rating.rate}
                  </span>
                </p>
                <p>
                  Count:
                  <span style={{ fontWeight: "bold", marginLeft: 5 }}>
                    {productState?.rating.count}
                  </span>
                </p>
              </div>
            </div>
          )}
      </div>
    </div>
  );
};
