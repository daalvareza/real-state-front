import { useQuery } from "@tanstack/react-query";
import { searchMovies } from "../services/movieService";

export const useMovies = (movieName: string, page: number) => {
    return useQuery({
        queryKey: ['movies', movieName, page],
        queryFn: () => searchMovies(movieName, page),
        enabled: !!movieName,
    });
};
