import { styled } from '@mui/material/styles';

export const FilterBarContainer = styled('div')(({ theme }) => ({
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
    backgroundColor: '#f5f5f5',
    borderRadius: theme.shape.borderRadius,
}));
  
export const FilterRow = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    gap: theme.spacing(2),
    alignItems: 'center',

    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
    },
}));

export const ButtonRow = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    gap: theme.spacing(1),
    width: 'auto',

    [theme.breakpoints.down('sm')]: {
        width: '100%',
        flexDirection: 'column',
    },
}));
