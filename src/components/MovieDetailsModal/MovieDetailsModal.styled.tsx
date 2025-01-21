import { Button, Modal } from "@mui/material";
import { Theme, styled } from "@mui/material/styles";

export const StyledModal = styled(Modal)(() => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
}));

export const ModalContent = styled("div")(({ theme }: { theme: Theme }) => ({
    width: "80%",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[24],
    padding: theme.spacing(4),
    borderRadius: theme.shape.borderRadius,
}));

export const DetailsContainer = styled("div")(() => ({
    display: "flex",
    gap: "2rem",
    marginBottom: "2rem",
}));

export const PosterCard = styled("div")(() => ({
    maxWidth: 400,
}));

export const InfoContainer = styled("div")(() => ({
    flex: 1,
    position: "relative",
    paddingBottom: "40px",
}));

export const AddToFavoriesButton = styled(Button)(({ theme }: { theme: Theme }) => ({
    position: "absolute",
    bottom: 0,
    right: 0,
    margin: theme.spacing(2),
}));

export const Separator = styled("div")(({ theme }: { theme: Theme }) => ({
    height: "1px",
    backgroundColor: theme.palette.divider,
    margin: `${theme.spacing(4)} 0`,
}))

export const RecommendedSection = styled("div")(() => ({
    marginTop: "2rem",
}));

export const RecommendationCard = styled("div")(() => ({
    width: "100%",
    maxWidth: "200px",
    minWidth: "150px",
    margin: "auto",
    textAlign: "center",
}));

export const RecommendationImage = styled("img")(() => ({
    width: "100%",
    height: "auto",
    objectFit: "cover",
    borderRadius: "4px",
}));

export const LoadingPlaceholder = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '15rem',
    borderRadius: '4px',
});
