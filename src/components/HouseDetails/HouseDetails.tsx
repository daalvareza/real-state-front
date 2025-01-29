import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, IconButton, Divider } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BedIcon from '@mui/icons-material/Bed';
import BathtubIcon from '@mui/icons-material/Bathtub';
import { House } from '../../utilities/interfaces';
import {
    HouseHeader,
    FavoriteIconContainer,
    HouseImageContainer,
    HouseImage,
    HouseDetailContainer,
    HouseName,
    HouseDetail,
    HouseKeyInfo,
    HouseKeyText,
} from './HouseDetails.styled';
import { formatPrice } from '../../utilities/helpers';

const HouseDetails: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const house = location.state as House;

    const handleNavigate = () => {
        navigate('/');
    };

    return (
        <div data-testid="house-details-page">
            <HouseHeader>
                <Button
                    variant="contained"
                    startIcon={<ArrowBackIcon />}
                    onClick={handleNavigate}
                    color="primary"
                    data-testid="back-button"
                >
                    Back
                </Button>
                <FavoriteIconContainer>
                    <IconButton data-testid="favorite-button">
                        <FavoriteIcon />
                    </IconButton>
                </FavoriteIconContainer>
            </HouseHeader>

            <HouseImageContainer>
                <HouseImage
                    src={`data:image/png;base64,${house.firstImage}`}
                    loading="lazy"
                    alt={`${house.name}-img`}
                    data-testid="house-image"
                />
            </HouseImageContainer>

            <HouseDetailContainer>
                <HouseName data-testid="house-name">{house.name}</HouseName>
                <HouseDetail data-testid="house-address">{house.address}</HouseDetail>
                <HouseDetail data-testid="house-price">{formatPrice(house.price)}</HouseDetail>
                <Divider variant="middle" />
                <HouseKeyInfo>
                    <BedIcon data-testid="bed-icon" />
                    <HouseKeyText>2 Bedrooms</HouseKeyText>
                    <BathtubIcon data-testid="bath-icon" />
                    <HouseKeyText>3 Bathrooms</HouseKeyText>
                </HouseKeyInfo>
                <Divider variant="middle" />
                <HouseDetail>Description</HouseDetail>
                <p data-testid="house-description">
                    Welcome to Your Dream Home!
                    Nestled in a serene neighborhood, this charming 2-bedroom, 3-bathroom
                    house is the perfect blend of comfort and elegance. As you step inside,
                    you’ll be greeted by a spacious living area filled with natural light,
                    ideal for relaxing or entertaining.

                    The modern kitchen features sleek countertops, ample cabinet space,
                    and state-of-the-art appliances, making it a chef’s delight. Each of
                    the two bedrooms offers a cozy retreat, with the primary suite boasting
                    an en-suite bathroom and a walk-in closet.
                </p>
            </HouseDetailContainer>
        </div>
    );
};

export default HouseDetails;
