import { useEffect, useState } from "react";
import { SpinnerCircular } from "spinners-react";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import { Product } from "../Product/Product";
import { useProducts } from "../../hooks/products";
import { IProduct } from "../../models";
import { SvgViewLess } from "../UI/Buttons/SvgViewLess";
import { SvgViewMore } from "../UI/Buttons/SvgViewMore";
import { Link } from "react-router-dom";

function Main() {
  const { products, error, loading, loaded } = useProducts();

  const [select, setSelect] = useState("");
  const [view, setView] = useState(true);
  // const [sortProducts, setSortProducts] = useState<IProduct[]>([]);

  const [search, setSearch] = useState<string>("");
  const [searchProducts, setSearchProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    sortByProducts(products, "0");
    setSearch("");
  }, [products]);

  useEffect(() => {
    const filteredCardsTitles = searchFilter(products, search);
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
    // setSortProducts(tmpProducts);
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
            // sortByProducts(sortProducts, e.target.value);
            sortByProducts(searchProducts, e.target.value);
          }}
          style={{ width: 195, height: 30, marginRight: 10 }}
        >
          <option value="0">Sort by rating</option>
          <option value="1">From expensive to cheap</option>
          <option value="2">From cheap to expensive</option>
        </select>
        <input
          typeof="search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          style={{
            width: 180,
            height: 30,
            marginRight: 10,
          }}
          placeholder="Search"
          type="text"
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
            {loading && (
              <SpinnerCircular
                color={"green"}
                secondaryColor={"white"}
                size={80}
                thickness={120}
                speed={120}
              />
            )}
            {/* {loading && <Spinner />} */}
            {error && <ErrorMessage error={error} />}
            {/* {searchProducts.toString() && */}
            {!!searchProducts.length &&
              searchProducts.map((product) => (
                // <Link key={product.id} to={`/product/${product.id}`}>
                <Product product={product} view={view} key={product.id} />
                // </Link>
                // <Product product={product} view={view} key={product.id} />
              ))}
          </ul>
        }
      </div>
    </div>
  );
}

export default Main;
