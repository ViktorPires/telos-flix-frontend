import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import { MovieContext } from '../../contexts/MovieContext';
import Trending from '../../src/components/trending/index';
const mockMovies = [
    { _id: '1', title: 'Movie 1', image: 'path/to/image1.jpg' },
    { _id: '2', title: 'Movie 2', image: 'path/to/image2.jpg' },
    { _id: '3', title: 'Movie 3', image: 'path/to/image3.jpg' },
];

test('renders Trending component with movies', () => {
    render(
        <Router>
            <MovieContext.Provider value={{ movies: mockMovies }}>
                <Trending />
            </MovieContext.Provider>
        </Router>
    );

    expect(screen.getByText('Trending')).toBeInTheDocument();
    expect(screen.getAllByAltText(/Movie \d/)).toHaveLength(3);
    expect(screen.getAllByText(/Movie \d/)).toHaveLength(3);
});

test('renders Trending component with fewer than 3 movies', () => {
    const fewerMovies = mockMovies.slice(0, 2);

    render(
        <Router>
            <MovieContext.Provider value={{ movies: fewerMovies }}>
                <Trending />
            </MovieContext.Provider>
        </Router>
    );

    expect(screen.getByText('Trending')).toBeInTheDocument();
    expect(screen.getAllByAltText(/Movie \d/)).toHaveLength(2);
    expect(screen.getAllByText(/Movie \d/)).toHaveLength(2);
});

test('does not render Trending component when no movies are available', () => {
    const noMovies = [];

    render(
        <Router>
            <MovieContext.Provider value={{ movies: noMovies }}>
                <Trending />
            </MovieContext.Provider>
        </Router>
    );

    expect(screen.queryByText('Trending')).not.toBeInTheDocument();
});
