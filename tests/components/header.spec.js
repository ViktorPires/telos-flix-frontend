import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Header } from '../../src/components/header/index';
import { AuthenticateContext } from '../../src/context/AuthenticateContext';

const mockContextValueAuthenticated = {
    savedUser: {
        name: 'John Doe',
        role: 'customer'
    },
};

const mockContextValueNotAuthenticated = {
    savedUser: null,
};

test('renders Header component when user is authenticated', () => {
    render(
        <AuthenticateContext.Provider value={mockContextValueAuthenticated}>
            <Header />
        </AuthenticateContext.Provider>
    );

    expect(screen.getByAltText('logo')).toBeInTheDocument();
    expect(screen.getByText('Télos')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Perfil')).toBeInTheDocument();
    expect(screen.getByText('Sair')).toBeInTheDocument();
});

test('renders Header component when user is not authenticated', () => {
    render(
        <AuthenticateContext.Provider value={mockContextValueNotAuthenticated}>
            <Header />
        </AuthenticateContext.Provider>
    );

    expect(screen.getByAltText('logo')).toBeInTheDocument();
    expect(screen.getByText('Télos')).toBeInTheDocument();
    expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
    expect(screen.queryByText('Perfil')).not.toBeInTheDocument();
    expect(screen.queryByText('Sair')).not.toBeInTheDocument();
    expect(screen.getByText('Criar conta')).toBeInTheDocument();
    expect(screen.getByText('Entrar')).toBeInTheDocument();
});

test('handles "Review" button click when user is authenticated', () => {
    render(
        <AuthenticateContext.Provider value={mockContextValueAuthenticated}>
            <Header />
        </AuthenticateContext.Provider>
    );

    const reviewButton = screen.getByText('Review');
    fireEvent.click(reviewButton);

    expect(screen.getByText('What did you think of the movie?')).toBeInTheDocument();
});

test('does not render "Review" button when user is not authenticated', () => {
    render(
        <AuthenticateContext.Provider value={mockContextValueNotAuthenticated}>
            <Header />
        </AuthenticateContext.Provider>
    );

    expect(screen.queryByText('Review')).not.toBeInTheDocument();
});
