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

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import DragIndicatorSharpIcon from "@mui/icons-material/DragIndicatorSharp";
import AppsSharpIcon from "@mui/icons-material/AppsSharp";
import { FABToTopButton } from "../UI/Buttons/FABToTopButton/FABToTopButton";
import { deepPurple } from "@mui/material/colors";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchProducts } from "../../features/products/productsSlice";

function Main() {
  const dispatch = useAppDispatch();
  const { status, errorLoading } = useAppSelector((state) => state.products);

  let productsState = useAppSelector((state) => state.products.products);
  let selectState = useAppSelector((state) => state.products.select);

  const [select, setSelect] = useState(selectState);
  const [view, setView] = React.useState("viewMore");

  const handleChangeSelect = (event: SelectChangeEvent) => {
    setSelect(event.target.value as string);
    sortByProducts(searchProducts, event.target.value);
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

  const [search, setSearch] = useState<string>("");
  const [searchProducts, setSearchProducts] = useState<IProduct[]>([]);

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
    setSearchProducts(filteredCardsTitles);
    sortByProducts(filteredCardsTitles, select);
  }, [search, select, productsState]);

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
          flexWrap: "wrap",
          paddingTop: 15,
          paddingBottom: 15,
        }}
      >
        <Box>
          <FormControl size="small" fullWidth>
            <InputLabel id="demo-simple-select-label">Sorting</InputLabel>
            <Select
              sx={{ minWidth: 230, marginRight: "10px" }}
              labelId="sort-select-label"
              id="sort-select"
              value={select}
              label="Sorting"
              onChange={handleChangeSelect}
            >
              <MenuItem value={"0"}>Sort by rating</MenuItem>
              <MenuItem value={"1"}>From expensive to cheap</MenuItem>
              <MenuItem value={"2"}>From cheap to expensive</MenuItem>
            </Select>
          </FormControl>
        </Box>
        {/* <select
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
        </select> */}
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
          <ToggleButtonGroup
            size="small"
            value={view}
            exclusive
            onChange={handleChangeView}
          >
            <ToggleButton
              // style={{ width: 30, height: 30, padding: 5 }}
              sx={{
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
              aria-label="more"
              title="view more"
            >
              <AppsSharpIcon />
            </ToggleButton>
            <ToggleButton
              // style={{ width: 30, height: 30, padding: 5 }}
              sx={{
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
              aria-label="less"
              title="view less"
            >
              <DragIndicatorSharpIcon />
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
            {status === "loading" && (
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
              status === "resolved" &&
              searchProducts.map((product) => (
                <Product product={product} view={view} key={product.id} />
              ))}
          </ul>
        }
      </div>
      <FABToTopButton />
    </div>
  );
}

export default Main;
