import { useRouteError } from "react-router-dom";

import HeaderMUI from "../HeaderMUI/HeaderMUI";

export const ErrorPage = () => {
  const error = useRouteError();
  return (
    <div>
      <HeaderMUI />
      <main style={{ textAlign: "center" }}>
        <h1>Oops!</h1>
        <p>Sorry, something went wrong</p>
        <p>{error.statusText ?? error.message}</p>
      </main>
    </div>
  );
};
