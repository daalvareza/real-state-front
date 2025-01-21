import { styled } from "@mui/material/styles";
import { Card, CardMedia, CardContent, Typography, Grid2, Box, Pagination } from '@mui/material';

export const MoviesSearchContainer = styled(Box)(() => ({
    height: "80vh",
    display: "flex",
    flexDirection: "column",
}));

export const MoviesContainer = styled(Grid2)(() => ({
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gap: "2.5rem",
    justifyContent: "center",
    alignContent: "center",
    margin: "2.5rem"
}));
  
export const MovieItem = styled("div")(() => ({
    display: "flex",
    width: "100%",
    position: "relative",
    height: "calc((80vh - 100px) / 2)",
    justifyContent: "center",
}));

export const MovieCard = styled(Card)(() => ({
    position: "absolute",
    width: "20vh",
    height: "35vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    cursor: "pointer",
}));
  
export const MoviePoster = styled(CardMedia)(() => ({
    width: "100%",
    height: "100%",
    objectFit: "contain",
}));
  
export const MovieCardContent = styled(CardContent)(() => ({
    height: "20%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    overflow: "hidden",
    padding: "1rem",
}));
  
export const MovieTitle = styled(Typography)(() => ({
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
}));

export const PaginationContainer = styled(Box)(() => ({
    marginTop: "1rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
}));

export const StyledPagination = styled(Pagination)({
    "& .MuiPaginationItem-root": {
      fontSize: "1.5rem",
      padding: "0.5rem 1rem",
    },
});
