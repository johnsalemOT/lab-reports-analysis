import React from "react";
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";

function generateFormattedText(data) {
  let formattedText = "";
  Object.keys(data).forEach((section) => {
    if (section === "formattedText") return;
    formattedText += `${section}:\n`;
    if (data[section].headers && data[section].rows) {
      formattedText += `Date: ${data[section].headers.join(", ")}\n\n`;
      data[section].rows.forEach((row) => {
        if (row.length > 0) {
          formattedText += `${row[0]}: ${row.slice(1).join(", ")}\n`;
        }
      });
    } else if (typeof data[section] === "string") {
      // Handle plain string like 'Summary'
      formattedText += `${data[section]}\n`;
    }
    formattedText += `\n`;
  });
  return formattedText.trim();
}

function DataView({ viewMode, data }) {
  if (viewMode === "table") {
    return (
      <Box my={2}>
        {Object.keys(data)
          .filter((key) => key !== "formattedText")
          .map((section) => (
            <Paper key={section} sx={{ my: 2, p: 2 }}>
              <Typography variant="h6" gutterBottom>
                {section}
              </Typography>

              {data[section]?.headers && data[section]?.rows ? (
                <Table>
                  <TableHead>
                    <TableRow>
                      {data[section].headers?.map((header, index) => (
                        <TableCell key={index}>{header}</TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data[section]?.rows?.map((row, rowIndex) => (
                      <TableRow key={rowIndex}>
                        {row?.map((cell, cellIndex) => (
                          <TableCell key={cellIndex}>{cell}</TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                // Handle plain string section like 'Summary'
                <Typography
                  variant="body1"
                  sx={{ whiteSpace: "pre-wrap", textAlign: "left", mt: 1 }}
                >
                  {data[section] ? data[section] : ""}
                </Typography>
              )}
            </Paper>
          ))}
      </Box>
    );
  } else {
    const textOutput = generateFormattedText(data);
    return (
      <Box my={2}>
        <Typography
          sx={{
            textAlign: "left",
            wordBreak: "break-word",
            whiteSpace: "pre-wrap", // wrap long lines and preserve line breaks
          }}
          variant="body1"
        >
          {textOutput}
        </Typography>
      </Box>
    );
  }
}

export default DataView;
