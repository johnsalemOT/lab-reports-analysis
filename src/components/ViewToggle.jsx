import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
import React from "react";

const ViewToggle = ({ viewMode, onToggle }) => {
  const handleChange = (event, newView) => {
    if (newView !== null) {
      onToggle(newView);
    }
  };
  return (
    <Box my={2} display={"flex"} justifyContent={"center"}>
      <ToggleButtonGroup
        value={viewMode}
        exclusive
        onChange={handleChange}
        aria-label="view mode"
      >
        <ToggleButton value={"table"} aria-label="Table View">
          Table View
        </ToggleButton>
        <ToggleButton value={"text"} aria-label="Text View">
          Text View
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};

export default ViewToggle;
