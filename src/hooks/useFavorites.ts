import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { addFavorite, removeFavorite, updateFavorite } from "../store/favoritesSlice";

export const useFavorites = () => {
    const dispatch = useDispatch();
    const favorites = useSelector((state: RootState) => state.favorites.items);

    return {
        favorites, 
        addFavorite: (movie: any) => dispatch(addFavorite(movie)),
        removeFavorite: (id: string) => dispatch(removeFavorite(id)),
        updateFavorite: (movie: any) => dispatch(updateFavorite(movie)),
    };
};