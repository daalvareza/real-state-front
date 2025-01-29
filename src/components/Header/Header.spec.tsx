import React from 'react';
import { render, screen, waitFor, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from './Header';
import LoginModal from '../LoginModal/LoginModal';
import userEvent from '@testing-library/user-event';

jest.mock('../LoginModal/LoginModal', () => ({
    __esModule: true,
    default: jest.fn(() => null),
}));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

const user = userEvent.setup({ delay: null });

const router = (props: { children?: React.ReactNode }) => (
    <MemoryRouter
        future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
        }}
        {...props}
    />
);

describe('Header Component', () => {
    afterEach(() => {
        cleanup();
        jest.clearAllMocks();
    });

    test('renders header title and hamburger menu button', () => {
        render(<Header />, { wrapper: router });
        expect(screen.getByTestId('header-title')).toBeInTheDocument();
        expect(screen.getByTestId('hamburger-button')).toBeInTheDocument();
    });

    test('opens and closes the mobile menu', async () => {
        render(<Header />, { wrapper: router });

        const menuButton = screen.getByTestId('hamburger-button');
        await user.click(menuButton);

        const menuItem = await screen.findByTestId('menu-item-Log in/Sign up');
        expect(menuItem).toBeInTheDocument();

        await user.click(menuItem);

        await waitFor(() => {
            expect(screen.queryByTestId('menu-item-Log in/Sign up')).not.toBeInTheDocument();
        });
    });

    test('opens LoginModal when clicking login menu item', async () => {
        render(<Header />, { wrapper: router });

        await user.click(screen.getByTestId('hamburger-button'));
        await user.click(screen.getByTestId('menu-item-Log in/Sign up'));

        expect(LoginModal).toHaveBeenCalledWith(
            expect.objectContaining({
                isOpen: true,
                onClose: expect.any(Function),
            }),
            expect.anything()
        );
    });

    test('navigates to home page when clicking title', async () => {
        render(<Header />, { wrapper: router });

        await user.click(screen.getByTestId('header-title'));
        expect(mockNavigate).toHaveBeenCalledWith('/');
    });
});
