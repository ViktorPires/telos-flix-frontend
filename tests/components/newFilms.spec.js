import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { FilmDescription } from '../../src/components/newFilms/index';
import { AuthenticateContext } from '../../src/contexts/AuthenticateContext';
import { BrowserRouter as Router } from 'react-router-dom';

const mockContextValue = {
    savedUser: true,
};

const mockMovie = {
    _id: 1,
    title: 'Test Movie',
    image: 'test-image-url',
};

test('renders FilmDescription component for authenticated user', () => {
    render(
        <Router>
            <AuthenticateContext.Provider value={mockContextValue}>
                <FilmDescription movie={mockMovie} />
            </AuthenticateContext.Provider>
        </Router>
    );

    expect(screen.getByText('Test Movie')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'movie image' })).toBeInTheDocument();
    expect(screen.getByText('Watch')).toBeInTheDocument();
});


test('renders FilmDescription component for unauthenticated user', () => {
    const mockContextValueNotAuthenticated = {
        savedUser: false,
    };

    render(
        <Router>
            <AuthenticateContext.Provider value={mockContextValueNotAuthenticated}>
                <FilmDescription movie={mockMovie} />
            </AuthenticateContext.Provider>
        </Router>
    );

    expect(screen.getByText('Test Movie')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'movie image' })).toBeInTheDocument();
    expect(screen.getByText('Watch')).toBeInTheDocument();
});
