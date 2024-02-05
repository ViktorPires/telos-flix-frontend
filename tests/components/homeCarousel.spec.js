import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MovieContext } from '../../src/contexts/MovieContext';
import { BrowserRouter as Router } from 'react-router-dom';
import HomeCarousel from '../../src/components/HomeCarousel/index';

const mockMovies = [
    { _id: '1', image: 'image1.jpg' },
    { _id: '2', image: 'image2.jpg' },
    { _id: '3', image: 'image3.jpg' },
];

test('renders HomeCarousel component with movies', () => {
    render(
        <MovieContext.Provider value={{ movies: mockMovies }}>
            <Router>
                <HomeCarousel />
            </Router>
        </MovieContext.Provider>
    );

    expect(screen.getAllByAltText(/movie/i)).toHaveLength(mockMovies.length);
});

test('renders HomeCarousel component without movies', () => {
    render(
        <MovieContext.Provider value={{ movies: [] }}>
            <Router>
                <HomeCarousel />
            </Router>
        </MovieContext.Provider>
    );

    expect(screen.queryByAltText(/movie/i)).not.toBeInTheDocument();
});

test('renders images with correct styles', () => {
    render(
        <MovieContext.Provider value={{ movies: mockMovies }}>
            <Router>
                <HomeCarousel />
            </Router>
        </MovieContext.Provider>
    );

    const movieImages = screen.getAllByAltText(/movie/i);

    movieImages.forEach((image) => {
        expect(image).toHaveStyle('width: 400px');
        expect(image).toHaveStyle('height: 500px');
        expect(image).toHaveStyle('object-fit: contain');
        expect(image).toHaveStyle('border-radius: 18px');
    });
});

test('renders links to movie details', () => {
    render(
        <MovieContext.Provider value={{ movies: mockMovies }}>
            <Router>
                <HomeCarousel />
            </Router>
        </MovieContext.Provider>
    );

    const movieLinks = screen.getAllByRole('link');

    movieLinks.forEach((link, index) => {
        expect(link).toHaveAttribute('href', `/films/${mockMovies[index]._id}`);
    });
});
