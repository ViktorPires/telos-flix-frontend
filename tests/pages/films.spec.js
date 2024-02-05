import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter, Route, useParams } from 'react-router-dom';
import { MovieContext } from '../../src/contexts/MovieContext'; 
import Films from '../../src/pages/Films/index';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: jest.fn(),
}));

const mockMovieContextValue = {
    movies: [],
    createComment: jest.fn(),
    comments: [],
    getComments: jest.fn(),
    searchById: jest.fn(),
};

const mockMovieData = {
    title: 'Test Movie',
    src: 'test-movie.jpg',
};

test('renders Films page with movie description and comments', async () => {
    useParams.mockReturnValue({ id: '1' });

    mockMovieContextValue.searchById.mockResolvedValue({ data: mockMovieData });

    render(
        <MemoryRouter initialEntries={['/films/1']}>
            <MovieContext.Provider value={mockMovieContextValue}>
                <Route path="/films/:id">
                    <Films />
                </Route>
            </MovieContext.Provider>
        </MemoryRouter>
    );

    expect(screen.getByText('Test Movie')).toBeInTheDocument();
    expect(screen.getByText('Rating')).toBeInTheDocument();
});

test('renders Films page with movie description and no comments', async () => {
    useParams.mockReturnValue({ id: '2' });

    mockMovieContextValue.searchById.mockResolvedValue({ data: mockMovieData });

    render(
        <MemoryRouter initialEntries={['/films/2']}>
            <MovieContext.Provider value={mockMovieContextValue}>
                <Route path="/films/:id">
                    <Films />
                </Route>
            </MovieContext.Provider>
        </MemoryRouter>
    );

    expect(screen.getByText('Test Movie')).toBeInTheDocument();
    expect(screen.getByText('Rating')).toBeInTheDocument();
    expect(screen.getByText('0 Reviews')).toBeInTheDocument();
});
