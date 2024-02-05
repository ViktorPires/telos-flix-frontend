import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import LoginButton from '../../src/components/loginButton/index';
test('renders LoginButton component with "Log in" text', () => {
    render(<LoginButton />);
    expect(screen.getByText('Log in')).toBeInTheDocument();
});

test('renders LoginButton component with PersonOutline icon', () => {
    render(<LoginButton />);
    expect(screen.getByTestId('person-outline-icon')).toBeInTheDocument();
});

test('calls onClick prop when LoginButton is clicked', () => {
    const mockOnClick = jest.fn();
    render(<LoginButton onClick={mockOnClick} />);

    const loginButton = screen.getByText('Log in');
    fireEvent.click(loginButton);

    expect(mockOnClick).toHaveBeenCalled();
});
