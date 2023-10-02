import { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { IProduct } from "../../models";
import "./Product.scss";

import { addProductToCart } from "../../features/products/productsSlice";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { deepPurple } from "@mui/material/colors";

interface IProductProps {
  product: IProduct;
  view: string;
}

export function Product({ product, view }: IProductProps): JSX.Element {
  const dispatch = useAppDispatch();

  const CardWidthStyleClassName = view === "viewMore" ? "viewMore" : "viewLess";

  const cardClasses = ["card", CardWidthStyleClassName];

  const handleAddToCart = () => {
    // setShowDetails((prev) => !prev);
    // setCardStyle((prev) => !prev);
  };
  return (
    // <div className="card">
    <li className={cardClasses.join(" ")}>
      <Link key={product.id} to={`/product/${product.id}`}></Link>
      <img src={product.image} alt={product.title} width={100} height={100} />
      <p className="product-title">{product.title}</p>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "auto",
        }}
      >
        <strong className="price">
          <span>$</span>
          {product.price}
        </strong>
        <IconButton
          sx={{ color: deepPurple[900] }}
          aria-label="add to the shopping cart"
          onClick={() => dispatch(addProductToCart(product.id))}
        >
          <ShoppingCartIcon />
        </IconButton>
      </div>
      <div className="hidden-details">
        <div className="hidden-details__content">
          <div>
            <p className="description">{product.description}</p>
            <p>
              Rate:
              <span style={{ fontWeight: "bold", marginLeft: 5 }}>
                {product.rating.rate}
              </span>
            </p>
            <p>
              Count:
              <span style={{ fontWeight: "bold", marginLeft: 5 }}>
                {product.rating.count}
              </span>
            </p>
          </div>
        </div>
      </div>
    </li>
  );
}
