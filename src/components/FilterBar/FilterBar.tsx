import React, { useState, ChangeEvent } from 'react';
import { TextField, Button } from '@mui/material';
import { Filters } from '../../utilities/interfaces';
import { ButtonRow, FilterBarContainer, FilterRow } from './FilterBar.styled';

interface FilterBarProps {
    initialFilters?: Filters;
    onFiltersChange: (newFilters: Filters) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
    initialFilters = {},
    onFiltersChange,
}) => {
    const [localFilters, setLocalFilters] = useState<Filters>({
        name: initialFilters.name ?? '',
        address: initialFilters.address ?? '',
        minPrice: initialFilters.minPrice ?? undefined,
        maxPrice: initialFilters.maxPrice ?? undefined,
    });

    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setLocalFilters((prev) => ({
            ...prev,
            [name]:
                name === 'minPrice' || name === 'maxPrice'
                    ? value === '' ? undefined : Number(value)
                    : value,
        }));
    };

    const handleApply = () => {
        onFiltersChange(localFilters);
    };

    const handleReset = () => {
        const resetFilters: Filters = {
            name: '',
            address: '',
            minPrice: undefined,
            maxPrice: undefined,
        };
        setLocalFilters(resetFilters);
        onFiltersChange(resetFilters);
    };

    return (
        <FilterBarContainer>
            <FilterRow>
                <TextField
                    label="Name"
                    variant="outlined"
                    fullWidth
                    name="name"
                    value={localFilters.name}
                    onChange={handleInputChange}
                />

                <TextField
                    label="Address"
                    variant="outlined"
                    fullWidth
                    name="address"
                    value={localFilters.address}
                    onChange={handleInputChange}
                />

                <TextField
                    label="Min Price"
                    variant="outlined"
                    type="number"
                    fullWidth
                    name="minPrice"
                    value={localFilters.minPrice ?? ''}
                    onChange={handleInputChange}
                />

                <TextField
                    label="Max Price"
                    variant="outlined"
                    type="number"
                    fullWidth
                    name="maxPrice"
                    value={localFilters.maxPrice ?? ''}
                    onChange={handleInputChange}
                />

                <ButtonRow>
                    <Button variant="contained" color="primary" fullWidth onClick={handleApply}>
                        Apply
                    </Button>
                    <Button variant="outlined" color="secondary" fullWidth onClick={handleReset}>
                        Reset
                    </Button>
                </ButtonRow>
            </FilterRow>
        </FilterBarContainer>
    );
};

export default FilterBar;
