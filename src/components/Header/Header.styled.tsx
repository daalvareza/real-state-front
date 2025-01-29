import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

export const HeaderContainer = styled("div")(() => ({
    display: "grid",
    borderBottom: "1px solid red",
}));

export const HeaderWrapper = styled("div")(() => ({
    display: "flex",
}));

export const PageTitle = styled(Typography)(() => ({
    textAlign: "center",
    width: "94%",
    flexGrow: 0.2,
    cursor: "pointer",
    color: "black",
}));

export const PageMenuContainer = styled("div")(() => ({
    width:"5%",
    display:"grid",
    justifyContent: "end",
}));
