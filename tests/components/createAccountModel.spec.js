import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { CreateAccountModalContent } from '../../src/components/createAccountModalContent/index';
import { AuthenticateContext } from '../../src/contexts/AuthenticateContext';

const mockContextValue = {
    createUser: jest.fn(),
};

test('renders CreateAccountModalContent component', () => {
    render(
        <AuthenticateContext.Provider value={mockContextValue}>
            <CreateAccountModalContent />
        </AuthenticateContext.Provider>
    );

    expect(screen.getByText('Create your account')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('E-mail')).toBeInTheDocument();
    expect(screen.getByText('Cellphone')).toBeInTheDocument();
    expect(screen.getByText('Password')).toBeInTheDocument();
    expect(screen.getByText('Confirm password')).toBeInTheDocument();
    expect(screen.getByLabelText('I agree with terms and service of the platform')).toBeInTheDocument();
    expect(screen.getByText('Register')).toBeInTheDocument();
});

test('handles user input and registration process', async () => {
    render(
        <AuthenticateContext.Provider value={mockContextValue}>
            <CreateAccountModalContent />
        </AuthenticateContext.Provider>
    );

    fireEvent.change(screen.getByPlaceholderText('Name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByPlaceholderText('E-mail'), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Cellphone'), { target: { value: '123456789' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByPlaceholderText('Confirm password'), { target: { value: 'password123' } });

    expect(screen.getByPlaceholderText('Name')).toHaveValue('John Doe');
    expect(screen.getByPlaceholderText('E-mail')).toHaveValue('john.doe@example.com');
    expect(screen.getByPlaceholderText('Cellphone')).toHaveValue('123456789');
    expect(screen.getByPlaceholderText('Password')).toHaveValue('password123');
    expect(screen.getByPlaceholderText('Confirm password')).toHaveValue('password123');

    fireEvent.click(screen.getByText('Register'));
    await waitFor(() => expect(mockContextValue.createUser).toHaveBeenCalled());
});
