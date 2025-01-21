import { Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { FormContent, FormModal } from './FavoritesFormModal.styled';
import { Favorite } from '../../store/types';
import { addFavorite, updateFavorite } from '../../store/favoritesSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { addFavoriteToUser, updateUserFavorite } from '../../services/favoriteService';

interface FavoritesFormModalProps {
    isFormOpen: boolean;
    setIsFormOpen: (isOpen: boolean) => void;
    movie: Favorite;
    toUpdate?: boolean;
}

const FavoritesFormModal: React.FC<FavoritesFormModalProps> = ({
    isFormOpen,
    setIsFormOpen,
    movie,
    toUpdate = false,
}) => {
    const [title, setTitle] = useState(movie.Title);
    const [notes, setNotes] = useState(movie.Notes ?? '');
    const [errorMessage, setErrorMessage] = useState('');
    const dispatch = useDispatch();

    const userId = useSelector((state: RootState) => state.auth.userId);

    const handleFormSubmit = () => {
        if (userId) {
            const { Title, Year, Genre, Plot, Poster, imdbID } = movie;
            const cleanedDetails = {
                Title,
                Year,
                Genre,
                Plot,
                imdbID,
                Poster,
                Notes: notes,
            };
            if (toUpdate) {
                dispatch(updateFavorite(cleanedDetails));
                updateUserFavorite(cleanedDetails, userId);
            } else {
                dispatch(addFavorite(cleanedDetails));
                addFavoriteToUser(cleanedDetails, userId);
            }
            setIsFormOpen(false);
        } else {
            setErrorMessage("You need to login to add favorites");
        }
    };

    return (
        <FormModal open={isFormOpen} onClose={() => setIsFormOpen(false)}>
            <FormContent>
                {errorMessage ? (
                    <>
                        <Typography variant="h6" color="error">
                            {errorMessage}
                        </Typography>
                        <Button variant="contained" color="primary" onClick={() => setIsFormOpen(false)}>
                            Close
                        </Button>
                    </>
                ) : (
                    <>
                        <Typography>Add to Favorites</Typography>
                        <TextField 
                            label="Title"
                            fullWidth
                            value={title}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                        />
                        <TextField 
                            label="Notes"
                            fullWidth
                            multiline
                            rows={4}
                            value={notes}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNotes(e.target.value)}
                        />
                        <Button variant="contained" color="secondary" onClick={handleFormSubmit}>
                            {toUpdate ? (
                                "Update Movie"
                            ) : (
                                "Add Movie"
                            )}
                        </Button>
                    </>
                )}
            </FormContent>
        </FormModal>
    );
};

export default FavoritesFormModal;
