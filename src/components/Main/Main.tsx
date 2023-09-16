import { useEffect, useState } from "react";
import { SpinnerCircular } from "spinners-react";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import { Product } from "../Product/Product";
import { useProducts } from "../../hooks/products";
import { IProduct } from "../../models";
import { SvgViewLess } from "../UI/Buttons/SvgViewLess";
import { SvgViewMore } from "../UI/Buttons/SvgViewMore";
import { Link } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchProducts } from "../../features/products/productsSlice";
// ===================

function Main() {
  const dispatch = useAppDispatch();
  const { status, errorLoading } = useAppSelector((state) => state.products);
  let storageProducts = JSON.parse(
    localStorage.getItem("storageProducts") || "null"
  );
  let productsState = useAppSelector((state) => state.products.products);

  if (localStorage.getItem("storageProducts") != "null") {
    productsState = storageProducts;
    //  storageProducts = localStorage.getItem("storageProducts")
    //  storageProducts = JSON.parse(localStorage.getItem("storageProducts"))
  }
  console.log("storage main", typeof storageProducts);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // =====================================================

  const [select, setSelect] = useState("");
  const [view, setView] = useState(true);

  const [search, setSearch] = useState<string>("");
  const [searchProducts, setSearchProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    sortByProducts(
      // JSON.parse(localStorage.getItem("storageProducts")) || productsState,
      // localStorage.getItem("storageProducts") || productsState,
      productsState,
      "0"
    );
    setSearch("");
    console.log(storageProducts);
    // }, [productsState]);
  }, []);

  useEffect(() => {
    const filteredCardsTitles = searchFilter(productsState, search);
    setSearchProducts(filteredCardsTitles);
    sortByProducts(filteredCardsTitles, select);
  }, [search]);

  function sortByProducts(arr: IProduct[], value: string) {
    const tmpProducts = JSON.parse(JSON.stringify(arr));

    if (value === "0") {
      tmpProducts.sort((a: IProduct, b: IProduct) =>
        a.rating.rate < b.rating.rate ? 1 : -1
      );
    } else if (value === "1") {
      tmpProducts.sort((a: IProduct, b: IProduct) =>
        a.price < b.price ? 1 : -1
      );
    } else if (value === "2") {
      tmpProducts.sort((a: IProduct, b: IProduct) =>
        a.price > b.price ? 1 : -1
      );
    }
    setSearchProducts(tmpProducts);
  }

  function searchFilter(arr: IProduct[], searchText: string) {
    if (!searchText.trim()) {
      return arr;
    }
    return arr.filter(({ title }: IProduct) => {
      return title.toLowerCase().includes(searchText.toLowerCase());
    });
  }

  return (
    <div className="container">
      <div
        className="catalog-settings"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "start",
          paddingTop: 15,
          paddingBottom: 15,
        }}
      >
        <select
          value={select}
          onChange={(e) => {
            setSelect(e.target.value);
            sortByProducts(searchProducts, e.target.value);
          }}
          style={{ width: 195, height: 30, marginRight: 10 }}
        >
          <option value="0">Sort by rating</option>
          <option value="1">From expensive to cheap</option>
          <option value="2">From cheap to expensive</option>
        </select>
        <input
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          style={{
            width: 180,
            height: 30,
            marginRight: 10,
          }}
          type="search"
          value={search}
          placeholder="Search"
        />

        <div style={{ color: "red", width: 100 }}>
          {!searchProducts.toString() && search && <span>No results</span>}
        </div>
        <div
          className="catalog-buttons"
          style={{
            display: "flex",
            alignItems: "center",
            marginLeft: "auto",
          }}
        >
          {/* view less */}
          <button
            className={`card-size-btn ${view ? "" : "active"}`}
            onClick={() => {
              setView(false);
            }}
            style={{ width: 30, height: 30, padding: 5 }}
            title="view less"
            aria-label="view less"
          >
            <SvgViewLess fill="#3e77aa" width="16" height="16" />
          </button>
          {/* view more */}
          <button
            className={`card-size-btn ${view ? "active" : ""}`}
            onClick={() => setView(true)}
            style={{ width: 30, height: 30, padding: 5 }}
            title="view more"
            aria-label="view more"
          >
            <SvgViewMore fill="#3e77aa" width="16" height="16" />
          </button>
        </div>
      </div>
      <div
        className="card-wrapper"
        style={{ paddingTop: 20, paddingBottom: 20 }}
      >
        {
          <ul className="card-list">
            {status == "loading" && (
              <div
                style={{
                  width: "100%",
                  position: "absolute",
                  zIndex: 2,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <SpinnerCircular
                  color={"green"}
                  secondaryColor={"grey"}
                  size={80}
                  thickness={120}
                  speed={120}
                />
              </div>
            )}
            {errorLoading && <ErrorMessage error={errorLoading} />}
            {!!searchProducts.length &&
              searchProducts.map((product) => (
                <Product product={product} view={view} key={product.id} />
              ))}
          </ul>
        }
      </div>
    </div>
  );
}

export default Main;
