import { AppBar, Box, InputBase, Paper, Typography } from "@mui/material";
import { Theme, styled } from "@mui/material/styles";

const isMobile = () => {
    return window.innerWidth <= 500;
}

export const WhiteDivider = styled("div")(() => ({
    height: "5vh",
    width: "100%"
}));

export const HouseListWrapper = styled("div")(() => ({
    display: "grid",
    gridTemplateColumns: isMobile() ? "repeat(1, 1fr)" : "repeat(2, 1fr)",
    width: "90%",
    margin: "0 auto",
    gap: isMobile() ? "35px" : "50px",
}));