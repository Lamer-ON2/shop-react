import * as React from "react";
import { useEffect, useState } from "react";
import { Product } from "../Product/Product";
import { IProduct } from "../../models";

//select
import { addSelect } from "../../features/products/productsSlice";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
//end select

import TextField from "@mui/material/TextField";

import Skeleton from "@mui/material/Skeleton";

import { FABToTopButton } from "../UI/Buttons/FABToTopButton/FABToTopButton";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchProducts } from "../../features/products/productsSlice";
import { product as skeletonProduct } from "../../data/products";

import PaginationMUI from "../UI/PaginationMUI/PaginationMUI";
import RadioButtons from "../UI/Buttons/RadioButtons/RadioButtons";

function Main() {
  const dispatch = useAppDispatch();
  let productsState = useAppSelector((state) => state.products.products);
  let storageCartState = JSON.parse(localStorage.getItem("cart") || "{}");

  let selectState = useAppSelector((state) => state.products.select);
  // const { status, errorLoading } = useAppSelector((state) => state.products);
  const { status } = useAppSelector((state) => state.products);

  const [select, setSelect] = useState(selectState);
  const [view, setView] = React.useState("viewMore");

  const [search, setSearch] = useState<string>("");
  const [productsData, setProductsData] = useState<IProduct[]>([]);

  const elementsPerPage = 10;
  const skeletonArr = Array(elementsPerPage).fill(0);
  const [page, setPage] = React.useState(1);
  const handlePagination = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  useEffect(() => {
    if (!productsState.length) {
      dispatch(fetchProducts());
    }
  }, [dispatch]);

  useEffect(() => {
    sortByProducts(productsState, selectState);
    setSearch("");
  }, [productsState, selectState]);

  useEffect(() => {
    const filteredCardsTitles = searchFilter(productsState, search);
    setProductsData(filteredCardsTitles);
    sortByProducts(filteredCardsTitles, select);
  }, [search, select, productsState]);

  const handleChangeSelect = (event: SelectChangeEvent) => {
    setSelect(event.target.value as string);
    sortByProducts(productsData, event.target.value);
    dispatch(addSelect(event.target.value));
  };

  const handleChangeView = (
    event: React.MouseEvent<HTMLElement>,
    nextView: string
  ) => {
    if (nextView !== null) {
      setView(nextView);
    }
  };

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
    setProductsData(tmpProducts);
  }

  function searchFilter(arr: IProduct[], searchText: string) {
    if (!searchText.trim()) {
      setProductsData(arr);
      return arr;
    }
    return arr.filter(({ title }: IProduct) => {
      setProductsData(arr);
      setPage(1);

      return title.toLowerCase().includes(searchText.toLowerCase());
    });
  }

  function checkAddedItem(checkedID: number) {
    return !!storageCartState.find((prod: IProduct) => prod.id === checkedID);
  }

  return (
    <div className="container">
      <div
        className="catalog-settings"
        style={{
          display: "flex",
          alignItems: "start",
          justifyContent: "start",
          flexWrap: "wrap",
          paddingTop: 15,
          paddingBottom: 15,
        }}
      >
        <Box component="form">
          <FormControl size="small">
            <InputLabel id="sort-select-label">Sorting</InputLabel>
            <Select
              sx={{ minWidth: 230, marginRight: "10px", marginBottom: "10px" }}
              size="small"
              labelId="sort-select-label"
              id="sort-select"
              value={select}
              label="Sorting"
              onChange={handleChangeSelect}
            >
              <MenuItem value={"0"}>by rating</MenuItem>
              <MenuItem value={"1"}>from expensive to cheap</MenuItem>
              <MenuItem value={"2"}>from cheap to expensive</MenuItem>
            </Select>
          </FormControl>
          <TextField
            sx={{
              minWidth: 230,
              marginRight: "10px",
              marginBottom: "10px",
            }}
            id="outlined-search"
            error={!productsData.toString() && !!search}
            helperText={
              !productsData.toString() && !!search ? "No results" : null
            }
            label="Search"
            type="search"
            size="small"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            value={search}
            placeholder="Input text"
          />
        </Box>
        <div
          className="catalog-buttons"
          style={{
            display: "flex",
            alignItems: "center",
            marginLeft: "auto",
          }}
        >
          <RadioButtons view={view} handleChangeView={handleChangeView} />
        </div>
      </div>
      <div
        className="card-wrapper"
        style={{ paddingTop: 20, paddingBottom: 20 }}
      >
        {
          <ul className="card-list">
            {status === "loading" ? (
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "12px 10px",
                  justifyContent: "center",
                }}
              >
                {skeletonArr.map((_, i) => (
                  <Skeleton
                    component="div"
                    variant="rounded"
                    animation="wave"
                    key={"skeleton-" + i}
                    width={225}
                    height={300}
                  >
                    <Product
                      product={skeletonProduct}
                      view={view}
                      checked={false}
                    />
                  </Skeleton>
                ))}
              </div>
            ) : (
              status === "resolved" &&
              productsData?.map(
                (product: IProduct, idx: number) =>
                  idx >= page * elementsPerPage - elementsPerPage &&
                  idx < page * elementsPerPage && (
                    <Product
                      product={product}
                      view={view}
                      checked={checkAddedItem(product.id)}
                      key={product.id}
                    />
                  )
              )
            )}
          </ul>
        }
      </div>
      <FABToTopButton />

      <PaginationMUI
        dataLength={productsData.length}
        elementsPerPage={elementsPerPage}
        page={page}
        handlePagination={handlePagination}
      />
    </div>
  );
}

export default Main;
