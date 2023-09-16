// import { log } from "console";
// import { useLoaderData } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { IProduct } from "../../models";

import "./SingleProduct.scss";

export const SingleProduct = () => {
  const { id } = useParams();
  let productsState = useAppSelector((state) => state.products.products);
  // let myStorage = window.localStorage;
  localStorage.setItem("storageProducts", JSON.stringify(productsState));
  let storageProducts = JSON.parse(
    localStorage.getItem("storageProducts") || "null"
  );
  if (storageProducts === "null") {
    storageProducts = productsState;
    console.log("null");
  }
  // let storageProducts;
  // if (localStorage.getItem("storageProducts") != null) {
  //   storageProducts = JSON.parse(localStorage.getItem("storageProducts"));
  // }

  console.log("storage single", typeof storageProducts);
  console.log("storage single", storageProducts);

  // const product = productsState.find((item) => item.id === Number(id));
  const product = storageProducts?.find((item: any) => item.id === Number(id));

  // console.log("productsState", productsState);

  return (
    <div className="container">
      <div className="wrapper">
        {/* <span>SingleProduct {id}</span> */}
        <div className={"card single-card"}>
          <img
            src={product?.image}
            alt={product?.title}
            width={200}
            height={200}
          />
          <p>{product?.title}</p>
          <p>
            <b>Category:</b> {product?.category}
          </p>
          <strong className="price">
            <span>$</span>
            {product?.price}
          </strong>
          <div>
            <p>{product?.description}</p>
            <p>
              Rate:
              <span style={{ fontWeight: "bold", marginLeft: 5 }}>
                {product?.rating.rate}
              </span>
            </p>
            <p>
              Count:
              <span style={{ fontWeight: "bold", marginLeft: 5 }}>
                {product?.rating.count}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
