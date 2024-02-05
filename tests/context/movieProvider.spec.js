/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import React, { useContext } from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MovieContext, MovieProvider } from '../../src/contexts/MovieProvider';
import { AuthenticateContext } from '../../src/contexts/AuthenticateContext';
import axios from 'axios';

jest.mock('axios');

const TestComponent = () => {
    const movieContext = useContext(MovieContext);

    return (
        <div>
            <button onClick={() => movieContext.search('Inception', 'Action')}>Search Movies</button>
        </div>
    );
};

test('MovieProvider provides movie-related functions', async () => {
    const mockSetMovies = jest.fn();
    const mockCreateComment = jest.fn();
    const mockGetComments = jest.fn();
    const mockSearchById = jest.fn();

    axios.get.mockResolvedValueOnce({ data: ['Action', 'Drama'] });

    axios.get.mockResolvedValueOnce({ data: [{ id: 1, title: 'Inception', genres: ['Action', 'Sci-Fi'] }] });

    render(
        <AuthenticateContext.Provider value={{ savedUser: { token: 'mockedToken' } }}>
            <MovieProvider>
                <TestComponent />
            </MovieProvider>
        </AuthenticateContext.Provider>
    );

    const searchButton = screen.getByText('Search Movies');
    expect(searchButton).toBeInTheDocument();

    fireEvent.click(searchButton);

    await waitFor(() => {
        expect(mockSetMovies).toHaveBeenCalledWith([{ id: 1, title: 'Inception', genres: ['Action', 'Sci-Fi'] }]);
        expect(mockCreateComment).not.toHaveBeenCalled();
        expect(mockGetComments).not.toHaveBeenCalled();
        expect(mockSearchById).not.toHaveBeenCalled();
    });
});
