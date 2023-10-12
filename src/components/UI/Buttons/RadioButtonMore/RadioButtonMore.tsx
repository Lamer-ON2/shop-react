import React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import AppsSharpIcon from "@mui/icons-material/AppsSharp";

import { deepPurple } from "@mui/material/colors";

type Props = {
  view: string;
};

// const RadioButtonMore = ({ view }: { view: string }) => {
const RadioButtonMore = ({ view }: Props) => {
  return (
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
      value={view}
      // value="viewMore"
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
  );
};

export default RadioButtonMore;
