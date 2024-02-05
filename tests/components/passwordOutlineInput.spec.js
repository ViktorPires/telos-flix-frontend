/* eslint-disable testing-library/no-node-access */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PasswordOutlinedInput from '../../src/components/passwordOutlinedInput/index';

test('renders PasswordOutlinedInput component with default placeholder', () => {
    render(<PasswordOutlinedInput setValue={() => { }} />);

    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Toggle password visibility')).toBeInTheDocument();
    expect(screen.getByLabelText('Toggle password visibility').querySelector('svg')).toBeInTheDocument();
});

test('renders PasswordOutlinedInput component with custom placeholder', () => {
    render(<PasswordOutlinedInput setValue={() => { }} placeholder="Custom Placeholder" />);

    expect(screen.getByPlaceholderText('Custom Placeholder')).toBeInTheDocument();
});

test('toggles password visibility when IconButton is clicked', () => {
    render(<PasswordOutlinedInput setValue={() => { }} />);

    const visibilityIconButton = screen.getByLabelText('Toggle password visibility');
    const passwordInput = screen.getByPlaceholderText('Password');

    expect(passwordInput).toHaveAttribute('type', 'password');

    fireEvent.click(visibilityIconButton);

    expect(passwordInput).toHaveAttribute('type', 'text');

    fireEvent.click(visibilityIconButton);

    expect(passwordInput).toHaveAttribute('type', 'password');
});

test('calls setValue prop with the correct value when input changes', () => {
    const mockSetValue = jest.fn();
    render(<PasswordOutlinedInput setValue={mockSetValue} />);

    const passwordInput = screen.getByPlaceholderText('Password');

    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });

    expect(mockSetValue).toHaveBeenCalledWith('testpassword');
});
