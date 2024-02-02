/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import RatingModal from '../../src/components/avaliation/index';

describe('RatingModal', () => {
    it('should render without errors', () => {
        const { container } = render(<RatingModal movieId={1} />);

        expect(container).toBeInTheDocument();
    });

    it('should show the modal when `show` prop is true', () => {
        const { getByText } = render(<RatingModal movieId={1} show={true} />);

        expect(getByText('What did you think of the movie?')).toBeInTheDocument();
        expect(getByText('Give five stars if you recommend it to your friends and one if you can even speak ill of the')).toBeInTheDocument();
    });

    it('should not show the modal when `show` prop is false', () => {
        const { queryByText } = render(<RatingModal movieId={1} show={false} />);

        expect(queryByText('What did you think of the movie?')).not.toBeInTheDocument();
        expect(queryByText('Give five stars if you recommend it to your friends and one if you can even speak ill of the')).not.toBeInTheDocument();
    });

    it('should close the modal when "Close" button is clicked', () => {
        const { getByText, queryByText } = render(<RatingModal movieId={1} show={true} />);
        fireEvent.click(getByText('Close'));
        
        expect(queryByText('What did you think of the movie?')).not.toBeInTheDocument();
        expect(queryByText('Give five stars if you recommend it to your friends and one if you can even speak ill of the')).not.toBeInTheDocument();
    });

    it('should call `createComment` when "Send" button is clicked', () => {
        const createCommentMock = jest.fn();
        const { getByText, getByPlaceholderText } = render(
            <RatingModal movieId={1} createComment={createCommentMock} show={true} />
        );

        fireEvent.change(getByPlaceholderText('inform evaluation'), { target: { value: 'Great movie!' } });
        fireEvent.click(getByText('Send'));

        expect(createCommentMock).toHaveBeenCalledWith('Great movie!', 0, 1); // Adjust the expected parameters as needed.
    });

    it('should handle rating change', () => {
        const { getByLabelText } = render(<RatingModal movieId={1} show={true} />);
        const ratingInput = getByLabelText('size-large');

        fireEvent.change(ratingInput, { target: { value: 4 } });

        expect(ratingInput.value).toBe('4');
    });
});
