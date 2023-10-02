import * as React from "react";
import { useEffect, useState } from "react";
import { SpinnerCircular } from "spinners-react";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
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

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";

import Skeleton from "@mui/material/Skeleton";

import DragIndicatorSharpIcon from "@mui/icons-material/DragIndicatorSharp";
import AppsSharpIcon from "@mui/icons-material/AppsSharp";
import { FABToTopButton } from "../UI/Buttons/FABToTopButton/FABToTopButton";
import { deepPurple } from "@mui/material/colors";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchProducts } from "../../features/products/productsSlice";
import { product as skeletonProduct } from "../../data/products";

import Pagination from "@mui/material/Pagination";

function Main() {
  const dispatch = useAppDispatch();
  let productsState = useAppSelector((state) => state.products.products);
  let selectState = useAppSelector((state) => state.products.select);
  const { status, errorLoading } = useAppSelector((state) => state.products);

  const [select, setSelect] = useState(selectState);
  const [view, setView] = React.useState("viewMore");

  const [search, setSearch] = useState<string>("");
  const [productsData, setProductsData] = useState<IProduct[]>([]);

  const elementsPerPage = 12;
  const skeletonArr = Array(elementsPerPage).fill(0);
  const [page, setPage] = React.useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
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

      console.log("page", page);
      return title.toLowerCase().includes(searchText.toLowerCase());
    });
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
          <ToggleButtonGroup
            size="small"
            value={view}
            exclusive
            onChange={handleChangeView}
          >
            <ToggleButton
              sx={{
                width: 40,
                height: 40,
                color: deepPurple[900],
                backgroundColor: deepPurple[50],
                transition: "0.2s",
                "&:hover": {
                  backgroundColor: deepPurple[100],
                },
                "&[aria-pressed='true']": {
                  color: deepPurple[50],
                  backgroundColor: deepPurple[900],
                  "&:hover": {
                    backgroundColor: deepPurple[800],
                  },
                },
              }}
              value="viewMore"
              aria-label="view more"
            >
              <Tooltip title="View more" arrow TransitionComponent={Zoom}>
                <div
                  style={{
                    display: "flex",
                    position: "absolute",
                    top: "0",
                    right: "0",
                    bottom: "0",
                    left: "0",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <AppsSharpIcon />
                </div>
              </Tooltip>
            </ToggleButton>

            <ToggleButton
              sx={{
                width: 40,
                height: 40,
                color: deepPurple[900],
                backgroundColor: deepPurple[50],
                transition: "0.2s",
                "&:hover": {
                  backgroundColor: deepPurple[100],
                },
                "&[aria-pressed='true']": {
                  color: deepPurple[50],
                  backgroundColor: deepPurple[900],
                  "&:hover": {
                    backgroundColor: deepPurple[800],
                  },
                },
              }}
              value="viewLess"
              aria-label="view less"
            >
              <Tooltip title="View less" arrow TransitionComponent={Zoom}>
                <div
                  style={{
                    display: "flex",
                    position: "absolute",
                    top: "0",
                    right: "0",
                    bottom: "0",
                    left: "0",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <DragIndicatorSharpIcon />
                </div>
              </Tooltip>
            </ToggleButton>
          </ToggleButtonGroup>
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
                  >
                    <Product product={skeletonProduct} view={view} />
                  </Skeleton>
                ))}
              </div>
            ) : (
              !!productsData.length &&
              status === "resolved" &&
              productsData.map(
                (product, idx) =>
                  idx >= page * elementsPerPage - elementsPerPage &&
                  idx < page * elementsPerPage && (
                    <Product product={product} view={view} key={product.id} />
                  )
              )
            )}
          </ul>
        }
      </div>
      <FABToTopButton />
      {productsData.length > elementsPerPage && (
        <Pagination
          sx={{ width: "fit-content", margin: "20px auto" }}
          count={Math.ceil(productsData.length / elementsPerPage)}
          page={page}
          onChange={handleChange}
        />
      )}
    </div>
  );
}

export default Main;
