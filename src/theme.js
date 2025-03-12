import { createTheme } from "@mui/material/styles"

const theme = createTheme({
    palette: {
        primary:{
            main: '#665dfe',
        },
        background: {
            default: '#fafbfd',
        },
        text: {
            primary: '#333',
        },
        filterSelected: {
            main: '#e0e7ff', // light blue background for selected
            contrastText: '#1e3a8a', // dark blue text for selected
          },
    }
});

export default theme;