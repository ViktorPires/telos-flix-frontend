import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Home from '../../src/pages/home/index';

test('renders Home page with components', () => {
    render(<Home />);

    expect(screen.getByTestId('header-component')).toBeInTheDocument();
    expect(screen.getByTestId('home-carousel-component')).toBeInTheDocument();
    expect(screen.getByTestId('trending-component')).toBeInTheDocument();
    expect(screen.getByTestId('enjoy-for-free-component')).toBeInTheDocument();
    expect(screen.getByTestId('dont-know-what-to-watch-component')).toBeInTheDocument();
});