import "./headerMUI.scss";
import * as React from "react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CloseIcon from "@mui/icons-material/Close";
import CartEmpty from "./../../img/modal-cart-empty.svg";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { deepPurple } from "@mui/material/colors";

import { NavLink } from "react-router-dom";
import { Divider } from "@mui/material";
import {
  deleteProductFromCart,
  toggleCartModal,
} from "../../features/products/productsSlice";
import { IProduct } from "../../models";

const pages = ["Home", "About"];
const settingsLogged = ["Profile", "Account", "Logout"];
const settingsNotLogged = ["Login"];

function ResponsiveAppBar() {
  const dispatch = useAppDispatch();
  const [isLogged, setIsLogged] = React.useState<boolean>(true);
  const settings = isLogged ? settingsLogged : settingsNotLogged;

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  // const [open, setOpen] = React.useState(false);
  let shoppingCartModal = useAppSelector(
    (state) => state.products.shoppingCartModal
  );
  let cartState = useAppSelector((state) => state.products.shoppingCart);

  useEffect(() => {}, [cartState]);

  let shoppingCartState: IProduct[] = JSON.parse(
    localStorage.getItem("cart") || "{}"
  );

  const handleClickOpen = () => {
    // setOpen(true);
    dispatch(toggleCartModal());
  };

  const handleClose = () => {
    // setOpen(false);
    dispatch(toggleCartModal());
  };

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="fixed" style={{ background: deepPurple[900] }}>
      <div className="container">
        <Toolbar
          disableGutters
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <MonetizationOnIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <NavLink to={"/"} style={{ color: "inherit" }}>
              Shop
            </NavLink>
          </Typography>

          <Box sx={{ flexGrow: 0, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <NavLink
                      to={page === "Home" ? "/" : `${page.toLowerCase()}`}
                      style={{
                        margin: "0 15px",
                        color: "inherit",
                        display: "block",
                      }}
                    >
                      {page}
                    </NavLink>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 0, display: "flex", alignItems: "center" }}>
            <MonetizationOnIcon
              sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
            />
            <Typography
              variant="h5"
              noWrap
              component={NavLink}
              to="/"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              SHOP
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <NavLink
                key={page + "md"}
                onClick={handleCloseNavMenu}
                to={page === "Home" ? "/" : `${page.toLowerCase()}`}
                style={{
                  margin: "0 15px",
                  color: "inherit",
                  display: "block",
                }}
              >
                {page}
              </NavLink>
            ))}
          </Box>

          <Box style={{ marginLeft: "auto", marginRight: "10px" }}>
            <IconButton
              sx={{ color: deepPurple[50] }}
              aria-label="add to the shopping cart"
              onClick={handleClickOpen}
            >
              <ShoppingCartIcon />
            </IconButton>
          </Box>
          <Dialog
            id="cart-modal"
            sx={{
              overflow: "hidden",
              "& .MuiPaper-root": { width: "100%", margin: "32px auto" },
            }}
            maxWidth="lg"
            open={shoppingCartModal}
            // open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <div
              className="modal-header"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "15px",
                background: deepPurple[600],
              }}
            >
              <h1 id="alert-dialog-title" style={{ margin: 0, fontSize: 20 }}>
                Shop Cart
              </h1>
              <IconButton
                sx={{
                  color: deepPurple[50],
                  "&:hover": {
                    background: deepPurple[50],
                    color: deepPurple[800],
                    // color: (theme) => theme.palette.grey[900],
                  },
                }}
                aria-label="close modal"
                onClick={handleClose}
              >
                <CloseIcon />
              </IconButton>
            </div>
            <div
              className="modal-content"
              style={{
                overflowY: "auto",
                backgroundColor: "#FFFFFF",
                color: "#221f1f",
              }}
            >
              {shoppingCartState.length ? (
                shoppingCartState?.map((product: IProduct) => (
                  <div
                    className="cart-item"
                    key={product.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: 15,
                      borderBottom: "2px solid #e9e9e9",
                    }}
                  >
                    <img
                      style={{
                        maxWidth: 50,
                        marginRight: 10,
                        flex: "1 0 auto",
                        objectFit: "contain",
                      }}
                      src={product.image}
                      alt={product.title}
                      width={50}
                      height={50}
                    />
                    <Divider
                      orientation="vertical"
                      flexItem
                      sx={{
                        borderWidth: 1,
                        borderColor: "#e9e9e9",
                        marginRight: "10px",
                      }}
                    />
                    <div
                      style={{
                        width: "100%",
                        paddingRight: "10px",
                        borderRight: "2px solid #e9e9e9",
                      }}
                    >
                      <h2
                        id="alert-dialog-description"
                        style={{
                          width: "100%",
                          margin: 0,
                          fontSize: 18,
                        }}
                      >
                        {product.title}
                      </h2>
                      <p
                        id="alert-dialog-description"
                        style={{
                          width: "100%",
                          margin: 0,
                          fontSize: 16,
                        }}
                      >
                        {product.description}
                      </p>
                    </div>
                    <strong
                      className="price"
                      style={{
                        minWidth: "45px",
                        margin: "0 10px",
                      }}
                    >
                      <span>$</span>
                      {product.price}
                    </strong>

                    <IconButton
                      sx={{
                        padding: "8px",
                        marginLeft: "auto",
                        color: deepPurple[50],
                        "&:hover": {
                          background: deepPurple[50],
                          color: deepPurple[800],
                        },
                      }}
                      aria-label="close modal"
                      onClick={() =>
                        dispatch(deleteProductFromCart(product.id))
                      }
                    >
                      <DeleteForeverIcon fontSize="medium" color="error" />
                    </IconButton>
                  </div>
                ))
              ) : (
                <div
                  style={{
                    padding: "30px 15px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <img
                    style={{
                      display: "block",
                      margin: "0px auto 20px",
                      objectFit: "contain",
                    }}
                    src={CartEmpty}
                    alt={"shoping cart empty"}
                    width={200}
                    height={200}
                  />
                  <b>Cart is empty</b>
                  <span>But it's never too late to fix it :)</span>
                </div>
              )}
            </div>
          </Dialog>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings" arrow>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Vlad" src="/avatar.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </div>
    </AppBar>
  );
}
export default ResponsiveAppBar;
