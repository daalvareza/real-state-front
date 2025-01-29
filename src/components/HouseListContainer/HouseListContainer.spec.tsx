import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import HouseListContainer from './HouseListContainer';
import { Filters, House, SearchPropertiesResponse } from '../../utilities/interfaces';
import { MemoryRouter } from 'react-router-dom';
import { searchProperties } from '../../services/propertyService';

jest.mock('../../services/propertyService', () => ({
    __esModule: true,
    searchProperties: jest.fn(),
}));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'), 
    useNavigate: () => mockNavigate,
}));

const router = (props: { children?: React.ReactNode }) => (
    <MemoryRouter
        future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
        }}
        {...props}
    />
);

describe('HouseListContainer (with test IDs)', () => {
    const user = userEvent.setup();
    const mockFilters: Filters = { name: 'Test Filter' };

    function renderComponent(filters = mockFilters) {
        return render(<HouseListContainer filters={filters} />, { wrapper: router });
    }

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('displays loading spinner while fetching', () => {
        (searchProperties as jest.Mock).mockReturnValue(new Promise(() => {}));

        renderComponent();

        expect(screen.getByTestId('loading-container')).toBeInTheDocument();
        expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    });

    test('displays empty state if no houses are returned', async () => {
        const response: SearchPropertiesResponse = {
            properties: [],
            totalCount: 0,
        };
        (searchProperties as jest.Mock).mockResolvedValue(response);

        renderComponent();

        expect(await screen.findByTestId('empty-container')).toBeInTheDocument();
        expect(screen.getByTestId('empty-alert')).toHaveTextContent(
            /no houses found with the given filters/i
        );
        expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
    });

    test('displays houses on successful fetch', async () => {
        const mockHouses: House[] = [
            {
            idProperty: 1,
            name: 'House 1',
            address: '123 Test St',
            price: '100000',
            firstImage: 'BASE64_ENCODED_IMG_1',
            },
            {
            idProperty: 2,
            name: 'House 2',
            address: '456 Demo Rd',
            price: '200000',
            firstImage: 'BASE64_ENCODED_IMG_2',
            },
        ];
        const response: SearchPropertiesResponse = {
            properties: mockHouses,
            totalCount: 12,
        };
        (searchProperties as jest.Mock).mockResolvedValue(response);

        renderComponent();

        const houseCards = await screen.findAllByTestId('house-card');
        expect(houseCards).toHaveLength(2);

        const [firstCard] = houseCards;
        expect(firstCard).toBeInTheDocument();

        const address = screen.getAllByTestId('house-address');
        const name = screen.getAllByTestId('house-name');
        const price = screen.getAllByTestId('house-price');

        expect(address[0]).toHaveTextContent('123 Test St');
        expect(name[0]).toHaveTextContent('House 1');
        expect(price[0]).toHaveTextContent('$100,000');

        expect(address[1]).toHaveTextContent('456 Demo Rd');
        expect(name[1]).toHaveTextContent('House 2');
        expect(price[1]).toHaveTextContent('$200,000');

        expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();

        const pagination = screen.getByTestId('pagination');
        expect(pagination).toBeInTheDocument();
    });

    test('clicking on a house card navigates to house details with state', async () => {
        const mockHouse: House = {
            idProperty: 3,
            name: 'Clicked House',
            address: '789 Click Ln',
            price: '300000',
            firstImage: 'CLICK_IMG',
        };
        const response: SearchPropertiesResponse = {
            properties: [mockHouse],
            totalCount: 6,
        };
        (searchProperties as jest.Mock).mockResolvedValue(response);

        renderComponent();

        const card = await screen.findByTestId('house-card');
        await user.click(card);

        expect(mockNavigate).toHaveBeenCalledWith('/house-details', {
            state: mockHouse,
        });
    });

    test('changing page calls fetch again', async () => {
        const response: SearchPropertiesResponse = {
            properties: [
            {
                idProperty: 1,
                name: 'House 1',
                address: '123 Test St',
                price: '100000',
                firstImage: 'IMG',
            },
            ],
            totalCount: 12,
        };
        (searchProperties as jest.Mock).mockResolvedValue(response);

        renderComponent();

        await screen.findByTestId('house-card');

        expect(searchProperties).toHaveBeenCalledWith(expect.any(Object), 1);

        const page2Btn = screen.getByLabelText('Go to next page')
        await user.click(page2Btn);

        expect(searchProperties).toHaveBeenCalledTimes(2);
        expect(searchProperties).toHaveBeenLastCalledWith(expect.any(Object), 2);
    });
});
