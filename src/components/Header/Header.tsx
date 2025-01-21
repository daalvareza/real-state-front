import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PageTitle, SearchContainer, SearchInput, StyledAppBar } from "./Header.styled";
import { Box, Button, IconButton, InputAdornment, Toolbar, Typography } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import { setQuery } from "../../store/moviesSlice";
import { RootState } from "../../store/store";
import { useNavigate } from 'react-router-dom';
import LoginModal from "../LoginModal/LoginModal";
import { getFavoritesByUser } from "../../services/favoriteService";
import { setFavorites } from "../../store/favoritesSlice";

const Header: React.FC = () => {
    const dispatch = useDispatch();
    const [search, setSearch] = useState("");
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const navigate = useNavigate();

    const favoritesCount = useSelector((state: RootState) => state.favorites.items.length);
    const userId = useSelector((state: RootState) => state.auth.userId);

    useEffect(() => {
        dispatch(setQuery("Harry Potter"));
        if (userId) {
            getFavoritesByUser(userId).then((favorites) => {
                dispatch(setFavorites(favorites));
            });
        }
    }, [userId]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            dispatch(setQuery((e.target as HTMLInputElement).value));
        }
    };

    const toggleLogin = () => setIsLoginOpen((prev) => !prev);

    return (
        <StyledAppBar position="static">
            <Toolbar>
                <PageTitle fontFamily="Roboto" variant="h4" onClick={() => navigate('/')}>
                    Movie Explorer
                </PageTitle>
                <SearchContainer borderRadius="1.5rem">
                    <SearchInput
                        placeholder="Search for a movie..."
                        value={search}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
                        onKeyDown={handleKeyDown}
                        endAdornment={
                            <InputAdornment
                                data-testid="search-icon"
                                position="start"
                                onClick={() => dispatch(setQuery(search))}
                                sx={{ cursor: "pointer" }}
                            >
                                <SearchIcon />
                            </InputAdornment>
                        }
                    />
                </SearchContainer>
                {userId && (
                    <Button color="inherit" onClick={() => navigate('/favorites')} data-testid="account-icon-button">
                        View Favorites ({favoritesCount})
                    </Button>
                )}
                <Box>
                    <IconButton color="inherit" onClick={toggleLogin}>
                        <AccountCircle />
                    </IconButton>
                </Box>
            </Toolbar>
            <LoginModal isOpen={isLoginOpen} onClose={toggleLogin} />
        </StyledAppBar>
    );
};

export default Header;