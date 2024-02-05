import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MiniVideoCard from '../../src/components/miniVideoCard/index';

const mockProps = {
    image: 'https://www.themoviedb.org/t/p/original/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg',
    title: 'Mock Title',
};

test('renders MiniVideoCard component with provided image and title', () => {
    render(<MiniVideoCard {...mockProps} />);

    const imageElement = screen.getByRole('img');
    const titleElement = screen.getByText('Mock Title');

    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src', mockProps.image);
    expect(titleElement).toBeInTheDocument();
    expect(screen.getByTestId('miniVideoCard')).toBeInTheDocument();
});
