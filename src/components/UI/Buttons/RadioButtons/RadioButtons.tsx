import React from "react";

import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import DragIndicatorSharpIcon from "@mui/icons-material/DragIndicatorSharp";
import AppsSharpIcon from "@mui/icons-material/AppsSharp";

import { deepPurple } from "@mui/material/colors";

type Props = {
  view: string;
  handleChangeView:
    | ((event: React.MouseEvent<HTMLElement, MouseEvent>, value: any) => void)
    | undefined;
};

const RadioButtons = ({ view, handleChangeView }: Props) => {
  return (
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
  );
};

export default RadioButtons;
