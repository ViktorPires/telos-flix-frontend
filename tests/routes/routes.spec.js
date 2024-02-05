import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from '../../src/routes/index';

test('renders Home component for the "/" route', () => {
    render(
        <BrowserRouter>
            <AppRoutes />
        </BrowserRouter>
    );

    expect(screen.getByTestId('home-component')).toBeInTheDocument();
});

test('renders Films component for the "/films/:id" route', () => {
    render(
        <BrowserRouter>
            <AppRoutes />
        </BrowserRouter>
    );

    expect(screen.getByTestId('films-component')).toBeInTheDocument();
});

test('renders Person component for the "/person" route', () => {
    render(
        <BrowserRouter>
            <AppRoutes />
        </BrowserRouter>
    );

    expect(screen.getByTestId('person-component')).toBeInTheDocument();
});

test('renders CardsFilms component for the "/cardsFilms/:genre?" route', () => {
    render(
        <BrowserRouter>
            <AppRoutes />
        </BrowserRouter>
    );

    expect(screen.getByTestId('cards-films-component')).toBeInTheDocument();
});

test('renders Video component for the "/video/:id" route', () => {
    render(
        <BrowserRouter>
            <AppRoutes />
        </BrowserRouter>
    );

    expect(screen.getByTestId('video-component')).toBeInTheDocument();
});
