import React, { useContext } from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MovieContext } from '../../src/contexts/MovieContext';

const TestComponent = () => {
    const movies = useContext(MovieContext);

    return (
        <div>
            <h1>Movies List</h1>
            <ul>
                {movies.map((movie, index) => (
                    <li key={index}>{movie.title}</li>
                ))}
            </ul>
        </div>
    );
};

test('context provides movies list', () => {
    const mockMovies = [
        { title: 'Movie 1' },
        { title: 'Movie 2' },
        { title: 'Movie 3' },
    ];

    render(
        <MovieContext.Provider value={mockMovies}>
            <TestComponent />
        </MovieContext.Provider>
    );

    expect(screen.getByText('Movies List')).toBeInTheDocument();
    expect(screen.getByText('Movie 1')).toBeInTheDocument();
    expect(screen.getByText('Movie 2')).toBeInTheDocument();
    expect(screen.getByText('Movie 3')).toBeInTheDocument();
});
