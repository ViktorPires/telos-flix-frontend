/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import RatingModal from '../../src/components/avaliation/index';
import { MovieContext } from '../../src/contexts/MovieContext';

const mockContextValue = {
    createComment: jest.fn(),
};

test('renders RatingModal component', () => {
    render(<RatingModal movieId={1} />);

    expect(screen.getByText('What did you think of the movie?')).toBeInTheDocument();
});

test('handles comment input', () => {
    render(<RatingModal movieId={1} />);
    const commentInput = screen.getByPlaceholderText('inform evaluation');
    fireEvent.change(commentInput, { target: { value: 'This is a test comment' } });

    expect(commentInput).toHaveValue('This is a test comment');
});

test('handles Close button click', () => {
    const { getByText } = render(
        <MovieContext.Provider value={mockContextValue}>
            <RatingModal movieId={1} />
        </MovieContext.Provider>
    );
    fireEvent.click(getByText('Close'));

    expect(screen.queryByText('What did you think of the movie?')).not.toBeInTheDocument();
});

test('handles Send button click', () => {
    const { getByText } = render(
        <MovieContext.Provider value={mockContextValue}>
            <RatingModal movieId={1} />
        </MovieContext.Provider>
    );
    fireEvent.click(getByText('Send'));

    expect(screen.queryByText('What did you think of the movie?')).not.toBeInTheDocument();
});
