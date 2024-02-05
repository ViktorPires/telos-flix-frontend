import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { DontKnowWhatToWatch } from '../../src/components/dontKnowWhatToWatch/index';
import { MovieContext } from '../../src/contexts/MovieContext';

const mockMovieGenres = ['Action', 'Drama', 'Comedy'];

test('renders DontKnowWhatToWatch component with genres', () => {
    render(
        <MovieContext.Provider value={{ movieGenres: mockMovieGenres }}>
            <DontKnowWhatToWatch />
        </MovieContext.Provider>
    );

    expect(screen.getByText('Find by genre')).toBeInTheDocument();
    expect(screen.getByText('Action')).toBeInTheDocument();
    expect(screen.getByText('Drama')).toBeInTheDocument();
    expect(screen.getByText('Comedy')).toBeInTheDocument();
});

test('renders DontKnowWhatToWatch component without genres', () => {
    render(
        <MovieContext.Provider value={{ movieGenres: [] }}>
            <DontKnowWhatToWatch />
        </MovieContext.Provider>
    );

    expect(screen.getByText('Find by genre')).toBeInTheDocument();
    expect(screen.queryByText('Action')).not.toBeInTheDocument();
    expect(screen.queryByText('Drama')).not.toBeInTheDocument();
    expect(screen.queryByText('Comedy')).not.toBeInTheDocument();
});

test('renders a link for each genre', () => {
    render(
        <MovieContext.Provider value={{ movieGenres: mockMovieGenres }}>
            <DontKnowWhatToWatch />
        </MovieContext.Provider>
    );

    const actionLink = screen.getByText('Action');
    const dramaLink = screen.getByText('Drama');
    const comedyLink = screen.getByText('Comedy');

    expect(actionLink).toHaveAttribute('href', '/cardsFilms/Action');
    expect(dramaLink).toHaveAttribute('href', '/cardsFilms/Drama');
    expect(comedyLink).toHaveAttribute('href', '/cardsFilms/Comedy');
});
