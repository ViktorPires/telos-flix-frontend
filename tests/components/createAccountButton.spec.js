/* eslint-disable testing-library/no-node-access */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CreateAccountButton from '../../src/components/createAccountButton/index';

test('renders CreateAccountButton component', () => {
    render(<CreateAccountButton />);
    expect(screen.getByText('Create account')).toBeInTheDocument();
    expect(screen.getByTestId('create-account-button')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
});

test('calls onClick when button is clicked', () => {
    const mockOnClick = jest.fn();
    render(<CreateAccountButton onClick={mockOnClick} />);

    const createAccountButton = screen.getByText('Create account');
    fireEvent.click(createAccountButton);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
});

test('renders button with AddBoxOutlinedIcon', () => {
    render(<CreateAccountButton />);
    expect(screen.getByTestId('create-account-button').querySelector('AddBoxOutlinedIcon')).toBeInTheDocument();
});
