import { useState } from "react";
import { IProduct } from "../../models";
import "./Product.scss";
import { Link } from "react-router-dom";

interface IProductProps {
  product: IProduct;
  view: string;
}

export function Product({ product, view }: IProductProps): JSX.Element {
  // const [showDetails, setShowDetails] = useState(false);
  // const btnBgClassName = showDetails ? "" : "hide";
  // const btnClasses = ["details", btnBgClassName];

  // const [cardStyle, setCardStyle] = useState(false);
  // const cardStyleClassName = cardStyle ? "" : "hide";

  const CardWidthStyleClassName = view === "viewMore" ? "viewMore" : "viewLess";

  const cardClasses = ["card", CardWidthStyleClassName];

  // const handleShowDetails = () => {
  //   // setShowDetails(!showDetails);
  //   setShowDetails((prev) => !prev);
  //   setCardStyle((prev) => !prev);
  // };
  return (
    // <div className="card">
    <li className={cardClasses.join(" ")}>
      <Link key={product.id} to={`/product/${product.id}`}></Link>
      <img src={product.image} alt={product.title} width={100} height={100} />
      <p>{product.title}</p>
      <strong className="price">
        <span>$</span>
        {product.price}
      </strong>

      <div className="hidden-details">
        <div className="hidden-details__content">
          <div>
            <p style={{ marginTop: 0 }}>{product.description}</p>
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
