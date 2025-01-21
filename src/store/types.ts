export interface Movie {
    imdbID: string;
    Title: string;
    Year: string;
    Genre?: string;
    Plot?: string;
    Poster: string;
}

export interface Favorite extends Movie {
    Notes?: string;
}