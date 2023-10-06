import React from "react";
// import "./footer.scss";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

import IconButton from "@mui/material/IconButton";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import TelegramIcon from "@mui/icons-material/Telegram";
import { Link } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    // <footer
    //   className="main-footer"
    //   style={{ marginTop: "auto", background: deepPurple[900] }}
    // >
    <AppBar
      className="main-footer"
      component="footer"
      position="absolute"
      color="primary"
      sx={{ top: "auto", bottom: 0, background: deepPurple[900] }}
    >
      <div className="container">
        <Toolbar
          disableGutters
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <div
            style={{
              width: "fit-content",
              margin: "0 auto",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Link href="https://uk-ua.facebook.com/" target="_blank">
              <IconButton
                style={{ color: deepPurple[50] }}
                aria-label="facebook"
              >
                <FacebookIcon />
              </IconButton>
            </Link>
            <Link href="https://www.instagram.com/" target="_blank">
              <IconButton
                style={{ color: deepPurple[50] }}
                aria-label="instagram"
              >
                <InstagramIcon />
              </IconButton>
            </Link>
            <Link href="https://twitter.com/" target="_blank">
              <IconButton
                style={{ color: deepPurple[50] }}
                aria-label="twitter"
              >
                <TwitterIcon />
              </IconButton>
            </Link>
            <Link href="https://web.telegram.org/" target="_blank">
              <IconButton
                style={{ color: deepPurple[50], marginRight: "20px" }}
                aria-label="telegram"
              >
                <TelegramIcon />
              </IconButton>
            </Link>
            <NavLink
              to={"/"}
              style={{ color: deepPurple[50], fontSize: "18px" }}
            >
              Contacts
            </NavLink>
          </div>
        </Toolbar>
      </div>
    </AppBar>
    // </footer>
  );
}
