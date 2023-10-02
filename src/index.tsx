import "./index.scss";

import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./components/Root/Root";
import Main from "./components/Main/Main";
import { ErrorPage } from "./components/404/ErrorPage";
import { SingleProduct } from "./components/SingleProduct/SingleProduct";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    // mode: "light",
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        // path: "/",
        index: true,
        element: <Main />,
      },
      {
        path: "/product/:id",
        element: <SingleProduct />,
      },
      {
        path: "about",
        element: <div>About</div>,
      },
      {
        path: "blog",
        element: <div>Blog</div>,
      },
      {
        path: "registration",
        element: <div>Registration</div>,
      },
      {
        path: "privacy-policy",
        element: <div>privacy-policy</div>,
      },
    ],
  },
]);

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  </Provider>
);
