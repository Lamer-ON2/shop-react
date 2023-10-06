import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

import "./singleProduct.scss";
import {
  fetchSingleProduct,
  addProductToCart,
  toggleCartModal,
} from "../../features/products/productsSlice";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { deepPurple, green } from "@mui/material/colors";
import { IProduct } from "../../models";

export const SingleProduct = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { status2 } = useAppSelector((state) => state.products);
  let productState = useAppSelector((state) => state.products.singleProduct);
  const { id } = useParams();
  const handleClickOpen = () => {
    dispatch(toggleCartModal());
  };
  let storageCartState = JSON.parse(localStorage.getItem("cart") || "{}");

  function checkAddedItem(checkedID: number) {
    return !!storageCartState.find((prod: IProduct) => prod.id === checkedID);
  }
  let checked = checkAddedItem(Number(id));

  useEffect(() => {
    dispatch(fetchSingleProduct({ id }));
  }, [dispatch]);

  return (
    <div className="container">
      <div className="wrapper">
        {status2 === "resolved" &&
          // Object.keys(productState).length &&
          productState.id && (
            <div className={"card single-card"}>
              <img
                src={productState?.image}
                alt={productState?.title}
                width={200}
                height={200}
              />
              <p>{productState?.title}</p>

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
                  sx={{ color: checked ? green[600] : deepPurple[900] }}
                  aria-label="add to the shopping cart"
                  onClick={
                    checked
                      ? () => handleClickOpen()
                      : () => dispatch(addProductToCart(Number(id)))
                  }
                >
                  <ShoppingCartIcon />
                </IconButton>
              </div>
              <div>
                <p>{productState?.description}</p>
                <p>
                  <b>Category:</b> {productState?.category}
                </p>
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
