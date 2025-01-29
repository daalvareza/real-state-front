import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HorizontalImageCarousel from './HorizontalImageCarousel';
import { act } from 'react';

beforeAll(() => {
    jest.useFakeTimers();
});

afterAll(() => {
    jest.useRealTimers();
});

describe('HorizontalImageScroll', () => {
    it('renders the correct number of slides', () => {
        render(<HorizontalImageCarousel />);
        const slides = screen.getAllByRole('img', { name: /slide/i });
        expect(slides).toHaveLength(6);
    });

    it('lazy loads all images', () => {
        render(<HorizontalImageCarousel />);
        const slides = screen.getAllByRole('img', { name: /slide/i });
        slides.forEach((slide) => {
            expect(slide).toHaveAttribute('loading', 'lazy');
        });
    });

    it('automatically changes slides after 7 seconds', () => {
        render(<HorizontalImageCarousel />);        
        const slideshowWrapper = screen.getByTestId('slideshow-wrapper');
        expect(slideshowWrapper).toHaveStyle('transform: translateX(-0%)');
    
        act(() => {
          jest.advanceTimersByTime(7000);
        });
    
        expect(slideshowWrapper).toHaveStyle('transform: translateX(-100%)');
      });
});
