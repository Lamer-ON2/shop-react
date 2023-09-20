import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { IProduct } from "../../models";

import "./SingleProduct.scss";
import { fetchSingleProduct } from "../../features/products/productsSlice";

export const SingleProduct = () => {
  const dispatch = useAppDispatch();
  const { status2, errorLoading } = useAppSelector((state) => state.products);
  let productState = useAppSelector((state) => state.products.singleProduct);
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchSingleProduct({ id }));
  }, [dispatch]);

  return (
    <div className="container">
      <div className="wrapper">
        {status2 === "resolved" && Object.keys(productState).length && (
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
            <strong className="price">
              <span>$</span>
              {productState?.price}
            </strong>
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
