import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import HouseDetails from './HouseDetails';
import { House } from '../../utilities/interfaces';

describe('HouseDetails Component', () => {
    const mockHouse: House = {
        idProperty: 100,
        name: 'Luxury Villa',
        address: '123 Paradise Road',
        price: '500000',
        firstImage: 'BASE64_IMAGE_DATA',
    };

    const routeWithState = {
        pathname: '/house-details',
        state: mockHouse, 
    };

    const router = (props: { children?: React.ReactNode }) => (
        <MemoryRouter 
            initialEntries={[routeWithState]}
            future={{
                v7_startTransition: true,
                v7_relativeSplatPath: true,
            }}
        >
            <Routes>
                <Route path="/house-details" element={props.children} />
                <Route path="/" element={<div data-testid="home-page">Home Page</div>} />
            </Routes>
        </MemoryRouter>
    );

    function renderHouseDetails() {
        return render(<HouseDetails />, { wrapper: router });
    }

    it('renders the house details from location.state', () => {
        const locationState = {
            pathname: '/house-details',
            state: mockHouse,
        };

        renderHouseDetails();

        expect(screen.getByTestId('house-details-page')).toBeInTheDocument();

        const img = screen.getByTestId('house-image');
        expect(img).toHaveAttribute('src', expect.stringContaining(mockHouse.firstImage));

        expect(screen.getByTestId('house-name')).toHaveTextContent('Luxury Villa');
        expect(screen.getByTestId('house-address')).toHaveTextContent('123 Paradise Road');
        expect(screen.getByTestId('house-price')).toHaveTextContent('$500,000');

        expect(screen.getByTestId('bed-icon')).toBeInTheDocument();
        expect(screen.getByTestId('bath-icon')).toBeInTheDocument();

        expect(screen.getByTestId('house-description')).toBeInTheDocument();
    });

    it('navigates to home when clicking the Back button', async () => {
        const user = userEvent.setup();

        const locationState = {
            pathname: '/house-details',
            state: mockHouse,
        };

        renderHouseDetails();

        const backButton = screen.getByTestId('back-button');
        await user.click(backButton);

        expect(await screen.findByTestId('home-page')).toBeInTheDocument();
    });

    it('renders the favorite button', () => {
        const locationState = {
            pathname: '/house-details',
            state: mockHouse,
        };

        renderHouseDetails();

        const favButton = screen.getByTestId('favorite-button');
        expect(favButton).toBeInTheDocument();
    });
});
