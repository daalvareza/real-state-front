import { styled } from "@mui/material/styles";

export const SlideshowContainer = styled('div')(() => ({
    width: '100%',
    maxWidth: '800px',
    height: '30vh',
    overflow: 'hidden',
    margin: '0 auto',
    position: 'relative',
}));

export const SlideshowWrapper = styled('div')(() => ({
    display: 'flex',
    width: '100%',
    height: '100%',
    transition: 'transform 0.5s ease-in-out',
}));

export const Slide = styled('div')(() => ({
    minWidth: '100%',
    height: '100%',
    boxSizing: 'border-box',
}));

export const SlideImage = styled('img')(() => ({
    width: '100%',
    height: '100%',
    objectFit: 'fill',
}));
