import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import { MovieContext } from '../../src/contexts/MovieContext';
import CardsFilms from '../../src/pages/cardsFilms/index';

const mockMovieGenres = ['Action', 'Drama', 'Comedy'];

const mockSearchFunction = jest.fn((searchTerm, selectedCategory) => {
    return Promise.resolve([
        { _id: '1', title: 'Movie 1', image: 'movie1.jpg' },
        { _id: '2', title: 'Movie 2', image: 'movie2.jpg' },
    ]);
});

test('renders CardsFilms component with movies', async () => {
    render(
        <MemoryRouter>
            <MovieContext.Provider value={{ search: mockSearchFunction, movieGenres: mockMovieGenres }}>
                <CardsFilms />
            </MovieContext.Provider>
        </MemoryRouter>
    );

    await waitFor(() => expect(mockSearchFunction).toHaveBeenCalled());

    expect(screen.getByText('Movie 1')).toBeInTheDocument();
    expect(screen.getByText('Movie 2')).toBeInTheDocument();
});

test('handles input change and updates search term', async () => {
    render(
        <MemoryRouter>
            <MovieContext.Provider value={{ search: mockSearchFunction, movieGenres: mockMovieGenres }}>
                <CardsFilms />
            </MovieContext.Provider>
        </MemoryRouter>
    );

    const inputElement = screen.getByPlaceholderText('Title');

    fireEvent.change(inputElement, { target: { value: 'Action Movie' } });

    await waitFor(() => expect(mockSearchFunction).toHaveBeenCalledWith('Action Movie', ''));
});

test('handles category selection and updates selected category', async () => {
    render(
        <MemoryRouter>
            <MovieContext.Provider value={{ search: mockSearchFunction, movieGenres: mockMovieGenres }}>
                <CardsFilms />
            </MovieContext.Provider>
        </MemoryRouter>
    );

    const selectElement = screen.getByLabelText('Categoria');

    fireEvent.change(selectElement, { target: { value: 'Action' } });

    await waitFor(() => expect(mockSearchFunction).toHaveBeenCalledWith('', 'Action'));
});
