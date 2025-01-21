import { Box, Modal } from "@mui/material";
import { Theme, styled } from "@mui/material/styles";

export const FormModal = styled(Modal)(() => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
}));

export const FormContent = styled(Box)(({ theme }: { theme: Theme }) => ({
    width: "400px",
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
}));
