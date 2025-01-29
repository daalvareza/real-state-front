import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import FilterBar from './FilterBar';
import { Filters } from '../../utilities/interfaces';

describe('FilterBar Component', () => {
    let onFiltersChange: jest.Mock;
    let user: ReturnType<typeof userEvent.setup>;

    beforeEach(() => {
        onFiltersChange = jest.fn();
        user = userEvent.setup({ delay: null });
    });

    test('renders all filter fields', () => {
        render(<FilterBar onFiltersChange={onFiltersChange} />);

        expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/address/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/min price/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/max price/i)).toBeInTheDocument();

        expect(screen.getByRole('button', { name: /apply/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /reset/i })).toBeInTheDocument();
    });

    test('typing updates local fields and clicking Apply calls onFiltersChange with correct data', async () => {
        render(<FilterBar onFiltersChange={onFiltersChange} />);

        await user.type(screen.getByLabelText(/name/i), 'Alice');
        await user.type(screen.getByLabelText(/address/i), 'Wonderland');
        await user.type(screen.getByLabelText(/min price/i), '100');
        await user.type(screen.getByLabelText(/max price/i), '200');

        await user.click(screen.getByRole('button', { name: /apply/i }));

        expect(onFiltersChange).toHaveBeenCalledTimes(1);
        expect(onFiltersChange).toHaveBeenCalledWith({
            name: 'Alice',
            address: 'Wonderland',
            minPrice: 100,
            maxPrice: 200,
        });
    });

    test('reset button clears all fields and calls onFiltersChange with empty filters', async () => {
        const initialFilters: Filters = {
            name: 'Bob',
            address: 'Builderland',
            minPrice: '50',
            maxPrice: '150',
        };

        render(<FilterBar initialFilters={initialFilters} onFiltersChange={onFiltersChange} />);

        expect(screen.getByLabelText(/name/i)).toHaveValue('Bob');
        expect(screen.getByLabelText(/address/i)).toHaveValue('Builderland');
        expect(screen.getByLabelText(/min price/i)).toHaveValue(50);
        expect(screen.getByLabelText(/max price/i)).toHaveValue(150);

        await user.click(screen.getByRole('button', { name: /reset/i }));

        expect(screen.getByLabelText(/name/i)).toHaveValue('');
        expect(screen.getByLabelText(/address/i)).toHaveValue('');
        expect(screen.getByLabelText(/min price/i)).toHaveValue(null);
        expect(screen.getByLabelText(/max price/i)).toHaveValue(null);

        expect(onFiltersChange).toHaveBeenCalledWith({
            name: '',
            address: '',
            minPrice: undefined,
            maxPrice: undefined,
        });
    });
});
