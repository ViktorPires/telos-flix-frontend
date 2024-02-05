import React, { useContext } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { AuthenticateContext } from '../../src/contexts/AuthenticateContext';

const TestComponent = () => {
    const { login } = useContext(AuthenticateContext);

    return (
        <div>
            <button onClick={login}>Login</button>
        </div>
    );
};

test('context provides login function', () => {
    const mockLogin = jest.fn();
    render(
        <AuthenticateContext.Provider value={{ login: mockLogin }}>
            <TestComponent />
        </AuthenticateContext.Provider>
    );

    const loginButton = screen.getByText('Login');
    expect(loginButton).toBeInTheDocument();

    fireEvent.click(loginButton);

    expect(mockLogin).toHaveBeenCalled();
});
