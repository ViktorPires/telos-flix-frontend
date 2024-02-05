import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PrimaryGradientButton from '../../src/components/primaryGrandientButton/index';

test('renders PrimaryGradientButton component with text', () => {
    render(<PrimaryGradientButton text="Click me" />);
    expect(screen.getByText('Click me')).toBeInTheDocument();
});

test('renders PrimaryGradientButton component with icon', () => {
    const mockIcon = <svg>Mock Icon</svg>;
    render(<PrimaryGradientButton icon={mockIcon} />);
    expect(screen.getByText('Mock Icon')).toBeInTheDocument();
});

test('renders PrimaryGradientButton component with image', () => {
    const imageUrl = 'https://image.tmdb.org/t/p/original/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg';
    render(<PrimaryGradientButton img={<img src={imageUrl} alt="Movie Poster" />} />);

    const image = screen.getByAltText('Movie Poster');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', imageUrl);
});

test('calls onClick handler when button is clicked', () => {
    const mockOnClick = jest.fn();
    render(<PrimaryGradientButton text="Click me" onClick={mockOnClick} />);

    const button = screen.getByText('Click me');
    fireEvent.click(button);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
});
