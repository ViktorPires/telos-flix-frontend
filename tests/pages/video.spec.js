import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter, Route } from 'react-router-dom';
import { MovieContext } from '../../src/contexts/MovieContext';
import { AuthenticateContext } from '../../src/contexts/AuthenticateContext';
import Video from '../../src/pages/video/index';

jest.mock('../../src/contexts/MovieContext', () => ({
    ...jest.requireActual('../../src/contexts/MovieContext'),
    searchById: jest.fn(),
}));

const mockContextValue = {
    savedUser: true,
};

const mockMovieData = {
    data: {
        video: 'abcd1234',
    },
};

test('renders Video component with video for authenticated user', async () => {
    const searchByIdMock = jest.fn().mockResolvedValue(mockMovieData);
    render(
        <MemoryRouter initialEntries={['/video/123']}>
            <AuthenticateContext.Provider value={mockContextValue}>
                <MovieContext.Provider value={{ searchById: searchByIdMock }}>
                    <Route path="/video/:id" component={Video} />
                </MovieContext.Provider>
            </AuthenticateContext.Provider>
        </MemoryRouter>
    );

    const videoComponent = await screen.findByTestId('video-component');
    expect(videoComponent).toBeInTheDocument();
});

test('renders "You need to be logged in" message for non-authenticated user', async () => {
    render(
        <MemoryRouter initialEntries={['/video/123']}>
            <AuthenticateContext.Provider value={{ savedUser: false }}>
                <Route path="/video/:id" component={Video} />
            </AuthenticateContext.Provider>
        </MemoryRouter>
    );

    const messageElement = await screen.findByText('You need to be logged in to watch the movie');
    expect(messageElement).toBeInTheDocument();
});
