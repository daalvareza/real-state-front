import { Backdrop, Paper, styled, Theme } from "@mui/material";

export const FloatingLogin = styled(Paper)(({ theme }: { theme: Theme }) => ({
  position: "absolute",
  width: "300px",
  padding: theme.spacing(2),
  zIndex: 1200,
  boxShadow: theme.shadows[5],
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  "&:focus": {
    outline: "none",
  },
}));

export const StyledBackdrop = styled(Backdrop)(({ theme }: { theme: Theme }) => ({
  zIndex: 1200,
  color: "#fff",
  backgroundColor: "rgba(0, 0, 0, 0.5)"
}));

export const CloseButtonContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'flex-end',
}));
