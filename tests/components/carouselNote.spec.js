import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { CarouselNote } from '../../src/components/carouselNote/index';
import { AuthenticateContext } from '../../src/context/AuthenticateContext';

const mockContextValue = {
    savedUser: true,
};

const mockComments = [
    { user_id: { name: 'User1' }, content: 'Comment 1', rating: 4 },
    { user_id: { name: 'User2' }, content: 'Comment 2', rating: 5 },
];

test('renders CarouselNote component with comments', () => {
    render(
        <AuthenticateContext.Provider value={mockContextValue}>
            <CarouselNote comments={mockComments} movieId={1} />
        </AuthenticateContext.Provider>
    );

    expect(screen.getByText('Rating')).toBeInTheDocument();
    expect(screen.getByText('Review')).toBeInTheDocument();
    expect(screen.getByText('4.5')).toBeInTheDocument();
    expect(screen.getByText('2 Reviews')).toBeInTheDocument();
    expect(screen.getByText('User1')).toBeInTheDocument();
    expect(screen.getByText('User2')).toBeInTheDocument();
    expect(screen.getByText('Comment 1')).toBeInTheDocument();
    expect(screen.getByText('Comment 2')).toBeInTheDocument();
});

test('renders CarouselNote component without comments', () => {
    render(
        <AuthenticateContext.Provider value={mockContextValue}>
            <CarouselNote comments={[]} movieId={1} />
        </AuthenticateContext.Provider>
    );

    expect(screen.getByText('Rating')).toBeInTheDocument();
    expect(screen.getByText('Review')).toBeInTheDocument();
    expect(screen.getByText('0.0')).toBeInTheDocument();
    expect(screen.getByText('0 Reviews')).toBeInTheDocument();
});

test('handles "Review" button click when user is authenticated', () => {
    render(
        <AuthenticateContext.Provider value={mockContextValue}>
            <CarouselNote comments={mockComments} movieId={1} />
        </AuthenticateContext.Provider>
    );

    const reviewButton = screen.getByText('Review');
    fireEvent.click(reviewButton);

    expect(screen.getByText('What did you think of the movie?')).toBeInTheDocument();
});

test('does not render "Review" button when user is not authenticated', () => {
    const mockContextValueNotAuthenticated = {
        savedUser: false,
    };

    render(
        <AuthenticateContext.Provider value={mockContextValueNotAuthenticated}>
            <CarouselNote comments={mockComments} movieId={1} />
        </AuthenticateContext.Provider>
    );

    expect(screen.queryByText('Review')).not.toBeInTheDocument();
});

