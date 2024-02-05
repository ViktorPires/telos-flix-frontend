/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CustomModal from '../../src/components/customModal/index';

test('renders CustomModal component with provided content', () => {
    const mockContent = <div>Mock Modal Content</div>;
    const { getByText } = render(<CustomModal open={true} setOpen={() => { }} content={mockContent} />);

    expect(getByText('Mock Modal Content')).toBeInTheDocument();
});

test('does not render CustomModal component when closed', () => {
    const mockContent = <div>Mock Modal Content</div>;
    render(<CustomModal open={false} setOpen={() => { }} content={mockContent} />);

    expect(screen.queryByText('Mock Modal Content')).not.toBeInTheDocument();
});

test('calls setOpen(false) when modal is closed', () => {
    const mockContent = <div>Mock Modal Content</div>;
    const mockSetOpen = jest.fn();
    render(<CustomModal open={true} setOpen={mockSetOpen} content={mockContent} />);

    const closeButton = screen.getByLabelText('Close');
    fireEvent.click(closeButton);

    expect(mockSetOpen).toHaveBeenCalledWith(false);
});
