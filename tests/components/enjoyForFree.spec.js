import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { EnjoyForFree } from '../../src/components/enjoyForFree/index';
import { MovieContext } from '../../src/contexts/MovieContext'; 
import { BrowserRouter as Router } from 'react-router-dom';

const mockMovies = [
    {
        _id: '1',
        title: 'Movie 1',
        image: 'movie1.jpg',
    },
    {
        _id: '2',
        title: 'Movie 2',
        image: 'movie2.jpg',
    },
    {
        _id: '3',
        title: 'Movie 3',
        image: 'movie3.jpg',
    },
];

test('renders EnjoyForFree component with movies', () => {
    render(
        <MovieContext.Provider value={{ movies: mockMovies }}>
            <Router>
                <EnjoyForFree />
            </Router>
        </MovieContext.Provider>
    );

    expect(screen.getByText('Popular')).toBeInTheDocument();
    expect(screen.getAllByAltText('Movie poster')).toHaveLength(3);
    expect(screen.getByText('Movie 1')).toBeInTheDocument();
    expect(screen.getByText('Movie 2')).toBeInTheDocument();
    expect(screen.getByText('Movie 3')).toBeInTheDocument();
});

test('renders EnjoyForFree component without movies', () => {
    render(
        <MovieContext.Provider value={{ movies: [] }}>
            <Router>
                <EnjoyForFree />
            </Router>
        </MovieContext.Provider>
    );

    expect(screen.getByText('Popular')).toBeInTheDocument();
    expect(screen.queryByAltText('Movie poster')).not.toBeInTheDocument();
    expect(screen.queryByText('Movie 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Movie 2')).not.toBeInTheDocument();
    expect(screen.queryByText('Movie 3')).not.toBeInTheDocument();
});
