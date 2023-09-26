import * as React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { deepPurple } from "@mui/material/colors";

import { NavLink } from "react-router-dom";
import { Divider } from "@mui/material";

const pages = ["Home", "About", "Blog"];
const settingsLogged = ["Profile", "Account", "Dashboard", "Logout"];
const settingsNotLogged = ["Login"];

function ResponsiveAppBar() {
  const [isLogged, setIsLogged] = React.useState<boolean>(true);
  const settings = isLogged ? settingsLogged : settingsNotLogged;

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const [open, setOpen] = React.useState(false);
  let shoppingCartState = useAppSelector(
    (state) => state.products.shoppingCart
  );

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
    // <AppBar position="fixed" style={{ background: "#3e77aa" }}>
    <AppBar position="fixed" style={{ background: deepPurple[900] }}>
      <Container maxWidth="xl">
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
            // component="a"
            // href="/"
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

          {/* <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}> */}
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
          {/* box tmp */}
          <Box sx={{ flexGrow: 0, display: "flex", alignItems: "center" }}>
            <MonetizationOnIcon
              sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
            />
            <Typography
              variant="h5"
              noWrap
              // component="a"
              // href="/"
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
                key={page}
                onClick={handleCloseNavMenu}
                // sx={{ my: 2, color: "white", display: "block" }}
                to={page === "Home" ? "/" : `${page.toLowerCase()}`}
                style={{ margin: "0 15px", color: "inherit", display: "block" }}
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
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <div
              className="modal-content"
              style={{ backgroundColor: "#FFFFFF", color: "#221f1f" }}
            >
              <div
                className="modal-header"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "15px",
                  borderBottom: "1px solid #e9e9e9",
                }}
              >
                <h1 id="alert-dialog-title" style={{ margin: 0, fontSize: 20 }}>
                  Shop Cart
                </h1>
                <IconButton
                  sx={{
                    color: deepPurple[500],
                    "&:hover": { background: deepPurple[50], color: "red" },
                  }}
                  aria-label="close modal"
                  onClick={handleClose}
                >
                  <CloseIcon />
                </IconButton>
              </div>

              {shoppingCartState?.map((product) => (
                <div
                  className="cart-item"
                  key={product.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: 15,
                    borderBottom: "1px solid #e9e9e9",
                  }}
                >
                  <img
                    style={{ marginRight: 10 }}
                    src={product.image}
                    alt={product.title}
                    width={50}
                    height={50}
                  />
                  <h2
                    id="alert-dialog-description"
                    style={{ margin: 0, fontSize: 16 }}
                  >
                    {product.description}
                  </h2>
                </div>
              ))}
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
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
