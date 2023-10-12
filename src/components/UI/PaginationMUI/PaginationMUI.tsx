import React from "react";

import Pagination from "@mui/material/Pagination";

type Props = {
  dataLength: number;
  elementsPerPage: number;
  page: number;
  handlePagination:
    | ((event: React.ChangeEvent<unknown>, page: number) => void)
    | undefined
    | undefined;
};

const PaginationMUI = ({
  dataLength,
  elementsPerPage,
  page,
  handlePagination,
}: Props) => {
  if (dataLength > elementsPerPage)
    return (
      <Pagination
        sx={{ width: "fit-content", margin: "20px auto" }}
        count={Math.ceil(dataLength / elementsPerPage)}
        page={page}
        onChange={handlePagination}
      />
    );
  else return null;
};

export default PaginationMUI;
