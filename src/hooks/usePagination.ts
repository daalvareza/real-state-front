import { useState } from "react";

export const usePagination = (totalResults: number, resultsPerPage: number = 10) => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(totalResults / resultsPerPage);

    const goToNextPage = () => {
        if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    };

    return {
        currentPage,
        totalPages,
        goToNextPage,
        goToPreviousPage,
        setCurrentPage,
    };
};