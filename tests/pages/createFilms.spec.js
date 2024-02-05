import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { CreateFilms } from '../../src/pages/createFilms/index';
import { AuthenticateContext } from '../../src/contexts/AuthenticateContext';
import { api } from '../../src/server/api';

jest.mock('../../src/server/api');

const mockContextValue = {
    savedUser: {
        token: 'mockToken',
    },
};

const mockApiResponse = {
    data: 'Mock response data',
};

beforeEach(() => {
    api.post.mockReset();
});

test('renders CreateFilms component', () => {
    render(
        <AuthenticateContext.Provider value={mockContextValue}>
            <CreateFilms />
        </AuthenticateContext.Provider>
    );

    expect(screen.getByText('Register movie')).toBeInTheDocument();
});

test('adds films successfully', async () => {
    api.post.mockResolvedValue(mockApiResponse);

    render(
        <AuthenticateContext.Provider value={mockContextValue}>
            <CreateFilms />
        </AuthenticateContext.Provider>
    );

    fireEvent.change(screen.getByPlaceholderText('up to 30 characters'), { target: { value: 'Test Film' } });
    fireEvent.change(screen.getByPlaceholderText('up to 200 characters'), { target: { value: 'Test description' } });
    fireEvent.change(screen.getByPlaceholderText('Year'), { target: { value: '2022' } });
    fireEvent.change(screen.getByPlaceholderText('Genres'), { target: { value: 'Action' } });
    fireEvent.change(screen.getByPlaceholderText('Banner URL'), { target: { value: 'http://example.com/banner.jpg' } });
    fireEvent.change(screen.getByPlaceholderText('Video URL'), { target: { value: 'http://example.com/video.mp4' } });

    fireEvent.click(screen.getByText('Resgister'));

    await waitFor(() => {
        expect(api.post).toHaveBeenCalledWith(
            '/movies',
            {
                title: 'Test Film',
                description: 'Test description',
                year: '2022',
                genres: 'Action',
                image: 'http://example.com/banner.jpg',
                video: 'http://example.com/video.mp4',
            },
            { headers: { 'Authorization': 'Bearer mockToken' } }
        );
    });
    await waitFor(() => {
        expect(screen.getByText('Movie created successfully')).toBeInTheDocument();
    });
});

test('handles missing fields during film addition', async () => {
    render(
        <AuthenticateContext.Provider value={mockContextValue}>
            <CreateFilms />
        </AuthenticateContext.Provider>
    );

    fireEvent.click(screen.getByText('Register'));

    expect(api.post).not.toHaveBeenCalled();
    expect(screen.getByText('Fill in all the fields')).toBeInTheDocument();
});
