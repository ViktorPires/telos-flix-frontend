import React, { useContext } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axiosMock from 'axios-mock-adapter';
import { AuthenticateContext } from '../../src/contexts/AuthenticateContext';
import { AuthenticateProvider } from '../../src/contexts/AuthenticateProvider';

const axios = new axiosMock();

const TestComponent = () => {
    const { login } = useContext(AuthenticateContext);

    const handleLogin = async () => {
        await login({ email: 'test@example.com', password: 'password' });
    };

    return (
        <div>
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

test('context provides login function and handles authentication', async () => {
    axios.onPost('http://localhost:3333/authenticate').reply(200, { token: 'test-token' });
    render(
        <AuthenticateProvider>
            <TestComponent />
        </AuthenticateProvider>
    );

    const loginButton = screen.getByText('Login');
    expect(loginButton).toBeInTheDocument();

    fireEvent.click(loginButton);

    expect(screen.getByText('Logged in successfully')).toBeInTheDocument();
});

