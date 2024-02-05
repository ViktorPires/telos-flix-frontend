import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { AuthenticateContext } from '../../src/contexts/AuthenticateContext';
import LoginModalContent from '../../src/components/loginModalContent/index';

const mockContextValue = {
    login: jest.fn(),
};

test('renders LoginModalContent component', () => {
    render(
        <AuthenticateContext.Provider value={mockContextValue}>
            <LoginModalContent setCreateAccountContent={() => { }} />
        </AuthenticateContext.Provider>
    );

    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Create account')).toBeInTheDocument();
});

test('handles user login with valid credentials', async () => {
    render(
        <AuthenticateContext.Provider value={mockContextValue}>
            <LoginModalContent setCreateAccountContent={() => { }} />
        </AuthenticateContext.Provider>
    );

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const loginButton = screen.getByText('Login');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    fireEvent.click(loginButton);

    await waitFor(() => {
        expect(mockContextValue.login).toHaveBeenCalledWith({
            email: 'test@example.com',
            password: 'password123',
        });
    });
});

test('displays error message on login failure', async () => {
    const errorResponse = { status: 400 };
    mockContextValue.login.mockResolvedValue({ response: errorResponse });

    render(
        <AuthenticateContext.Provider value={mockContextValue}>
            <LoginModalContent setCreateAccountContent={() => { }} />
        </AuthenticateContext.Provider>
    );

    const loginButton = screen.getByText('Login');

    fireEvent.click(loginButton);

    await waitFor(() => {
        expect(mockContextValue.login).toHaveBeenCalled();
    });
    await waitFor(() => {
        expect(screen.getByText('Email or password invalid')).toBeInTheDocument();
    });
});
