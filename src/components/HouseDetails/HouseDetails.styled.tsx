import { styled } from '@mui/material/styles';

export const HouseHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'flex-start',
    width: '100%',
    alignItems: 'center',
    padding: theme.spacing(2, 0),
}));

export const FavoriteIconContainer = styled('div')(() => ({
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    marginLeft: 'auto',
}));

export const HouseImageContainer = styled('div')(({ theme }) => ({
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(2),
}));

export const HouseImage = styled('img')(({ theme }) => ({
    height: '40vh',
    [theme.breakpoints.down('sm')]: {
        height: '35vh',
        width: '100%',
    },
    width: 'auto',
    objectFit: 'cover',
}));

export const HouseDetailContainer = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 4),
    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(0, 2),
    },
}));

export const HouseName = styled('span')(({ theme }) => ({
    fontSize: '2em',
    textAlign: 'left',
    fontWeight: 'bold',
    display: 'block',
    marginBottom: theme.spacing(1),
}));

export const HouseDetail = styled('div')(({ theme }) => ({
    fontSize: '1.5em',
    textAlign: 'left',
    marginBottom: theme.spacing(1),
}));

export const HouseKeyInfo = styled('div')(({ theme }) => ({
    padding: theme.spacing(2, 0),
    display: 'flex',
    gap: theme.spacing(2),
    alignItems: 'center',
}));

export const HouseKeyText = styled('span')(() => ({
    fontSize: '1.2em',
}));
