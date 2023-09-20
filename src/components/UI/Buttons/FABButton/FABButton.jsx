import React from "react";
import { useState } from "react";
import Fab from "@mui/material/Fab";
import KeyboardDoubleArrowUpSharpIcon from "@mui/icons-material/KeyboardDoubleArrowUpSharp";
import { deepPurple } from "@mui/material/colors";

export const FABButton = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  window.addEventListener("scroll", toggleVisible);
  return (
    <Fab
      onClick={scrollToTop}
      sx={{
        display: visible ? "flex" : "none",
        position: "fixed",
        right: 15,
        bottom: 15,
        background: deepPurple[900],
        color: "white",
        "&:hover": { background: deepPurple[700] },
      }}
      size="small"
      aria-label="to top"
    >
      <KeyboardDoubleArrowUpSharpIcon />
    </Fab>
  );
};
