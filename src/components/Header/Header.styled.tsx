import { AppBar, Box, InputBase, Paper, Typography } from "@mui/material";
import { Theme, styled } from "@mui/material/styles";

export const StyledAppBar = styled(AppBar)(({ theme }: { theme: Theme }) => ({
    backgroundColor: theme.palette.primary.main,
    height: "10vh",
    justifyContent: "center",
}));
  
export const SearchContainer = styled(Box)(() => ({
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
}));
  
export const SearchInput = styled(InputBase)(({ theme }: { theme: Theme }) => ({
    backgroundColor: theme.palette.background.paper,
    padding: "0 10px",
    width: "100%",
    maxWidth: "400px",
    boxShadow: theme.shadows[1],
}));

export const PageTitle = styled(Typography)(() => ({
    flexGrow: 0.2,
    fontWeight: "bold",
    cursor: "pointer",
}));
