import React, { useState } from 'react';
import { Filters } from '../../utilities/interfaces';
import FilterBar from '../../components/FilterBar/FilterBar';
import HouseListContainer from '../../components/HouseListContainer/HouseListContainer';
import HorizontalImageCarousel from '../HorizontalImageCarousel/HorizontalImageCarousel';

const HouseListPage: React.FC = () => {
  const [filters, setFilters] = useState<Filters>({});

  return (
    <div>
        <HorizontalImageCarousel data-testid="horizontal-image-carousel"/>
        <FilterBar
            initialFilters={filters}
            onFiltersChange={(newFilters) => setFilters(newFilters)}
        />

        <HouseListContainer filters={filters} />
    </div>
  );
};

export default HouseListPage;
