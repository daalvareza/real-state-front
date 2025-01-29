import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HouseListWrapper } from './HouseListContainer.styled';
import { Box, Card, CardContent, CardMedia, Typography, CircularProgress, Alert, Pagination } from '@mui/material';
import { searchProperties } from '../../services/propertyService';
import { Filters, House, SearchPropertiesResponse } from '../../utilities/interfaces';
import { formatPrice } from '../../utilities/helpers';

interface HouseListContainerProps {
    filters: Filters;
}

const HouseListContainer: React.FC<HouseListContainerProps> = ({ filters }) => {
    const navigate = useNavigate();
    const [houses, setHouses] = useState<House[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);

    useEffect(() => {
        let isMounted = true;
        const fetchHouses = async () => {
            setLoading(true);
            setError(null);
            try {
                const data: SearchPropertiesResponse = await searchProperties(filters, page);
                if (!isMounted) return;

                setHouses(data.properties || []);
                setTotalPages(calcTotalPages(data.totalCount));
            } catch (err) {
                if (isMounted) {
                    setError(err instanceof Error ? err.message : 'Error fetching houses');
                }
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchHouses();
        return () => {
            isMounted = false;
        };
    }, [filters, page, error]);

    const calcTotalPages = (totalCount: number) => {
        return Math.ceil(totalCount / 6);
    };

    const handleNavigate = (house: House) => {
        navigate('/house-details', { state: house });
    };

    return (
        <>
            <HouseListWrapper>
                {loading ? (
                    <Box 
                        sx={{ display: 'grid', placeItems: 'center', height: '40vh' }}
                        data-testid="loading-container"
                    >
                        <CircularProgress color="secondary" data-testid="loading-spinner"/>
                    </Box>
                ) : error ? (
                    <Box 
                        sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}
                        data-testid="error-container"
                    >
                        <Alert severity="error" data-testid="error-alert">{error}</Alert>
                    </Box>
                ) : houses.length === 0 ? (
                    <Box sx={{ p: 2 }} data-testid="empty-container">
                        <Alert severity="error" data-testid="empty-alert">No houses found with the given filters</Alert>
                    </Box>
                ) : (
                    houses.map((house) => (
                        <Card
                            key={`${house.idProperty}-${house.name}`}
                            sx={{ width: '100%', mb: 2, cursor: 'pointer' }}
                            onClick={() => handleNavigate(house)}
                            data-testid="house-card"
                        >
                            <CardMedia
                                component="img"
                                alt={`house-img-${house.name}`}
                                height="200"
                                image={`data:image/png;base64,${house.firstImage}`}
                                data-testid="house-image"
                            />
                            <CardContent>
                                <Typography variant="body2" data-testid="house-address">
                                    {house.address}
                                </Typography>
                                <Typography variant="h5" data-testid="house-name">
                                    {house.name}
                                </Typography>
                                <Typography variant="h6" data-testid="house-price">
                                    {formatPrice(house.price)}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))
                )}
            </HouseListWrapper>

            {!loading && !error && houses.length > 0 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                    <Pagination
                        data-testid="pagination"
                        count={totalPages}
                        page={page}
                        onChange={(_, value) => setPage(value)}
                        size="large"
                    />
                </Box>
            )}
        </>
    );
};

export default HouseListContainer;
