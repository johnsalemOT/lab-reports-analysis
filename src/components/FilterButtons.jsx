import { Box, Button, ButtonGroup } from "@mui/material";
import React from "react";
import theme from "../theme";

const filterOptions = [
  "Chronological",
  "Last Month",
  "Last 3 Months",
  "Last 3 Weeks",
  "Summarize",
];

const FilterButtons = ({ onFilterSelect, onProcess, disabled, filterOption }) => {
  return (
    <Box
      my={2}
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <ButtonGroup variant="text">
        {filterOptions.map((option) => (
          <Button key={option} onClick={() => onFilterSelect(option)} 
          sx={{
            textTransform: "none",
            bgcolor: filterOption === option ? theme.palette.filterSelected.main : undefined,
            color: filterOption === option ? theme.palette.filterSelected.contrastText : undefined,
            "&:hover": {
              bgcolor: filterOption === option
                ? theme.palette.filterSelected.main
                : undefined,
            },
          }}
          >
            {option}
          </Button>
        ))}
      </ButtonGroup>
      <Button
        variant="contained"
        color="primary"
        onClick={onProcess}
        disabled={disabled}
        sx={{ml:2}}
      >
        Process Data
      </Button>
    </Box>
  );
};

export default FilterButtons;
