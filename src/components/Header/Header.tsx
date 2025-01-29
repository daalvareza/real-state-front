import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  HeaderContainer,
  HeaderWrapper,
  PageTitle,
  PageMenuContainer,
} from './Header.styled';
import { Box, IconButton, Typography, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import LoginModal from '../LoginModal/LoginModal';

const PAGES = ['Log in/Sign up'];

const Header: React.FC = () => {
    const navigate = useNavigate();

    const [loginModalOpen, setLoginModalOpen] = useState(false);
    const toggleLoginModal = () => setLoginModalOpen((prev) => !prev);

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleMenuClick = (page: string) => {
        setAnchorEl(null);
        if (page === 'Log in/Sign up') {
            setLoginModalOpen(true);
        }
    };

    const handleTitleClick = () => {
        navigate('/');
    };

    return (
        <HeaderContainer>
            <HeaderWrapper>
                <PageTitle
                    fontFamily="Roboto"
                    variant="h5"
                    data-testid="header-title"
                    onClick={handleTitleClick}
                >
                    Find<span style={{ color: 'red' }}>a</span>House
                </PageTitle>

            <PageMenuContainer>
                <Box>
                    <IconButton
                        color="inherit"
                        onClick={handleOpenMenu}
                        data-testid="hamburger-button"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleCloseMenu}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                    >
                        {PAGES.map((page) => (
                            <MenuItem
                                key={page}
                                onClick={() => handleMenuClick(page)}
                                data-testid={`menu-item-${page}`}
                            >
                                <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>
            </PageMenuContainer>

            {loginModalOpen && (
                <LoginModal
                isOpen={true}
                onClose={toggleLoginModal}
                />
            )}
            </HeaderWrapper>
        </HeaderContainer>
    );
};

export default Header;
