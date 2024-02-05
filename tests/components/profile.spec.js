import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import { Profile } from '../../src/components/Profile/index';
import { AuthenticateContext } from '../../src/contexts/AuthenticateContext';
import userEvent from '@testing-library/user-event';

const mockUser = {
    _id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    cellphone: '123456789',
};

const mockContextValue = {
    savedUser: mockUser,
    updateProfile: jest.fn(),
    updateProfilePassword: jest.fn(),
};

test('renders Profile component with user data', () => {
    render(
        <MemoryRouter>
            <AuthenticateContext.Provider value={mockContextValue}>
                <Profile />
            </AuthenticateContext.Provider>
        </MemoryRouter>
    );

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Personal data')).toBeInTheDocument();
    expect(screen.getByLabelText('Name')).toHaveValue('John Doe');
    expect(screen.getByLabelText('Email')).toHaveValue('john@example.com');
    expect(screen.getByLabelText('Cellphone')).toHaveValue('123456789');
    expect(screen.getByLabelText('New password')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm password')).toBeInTheDocument();
    expect(screen.getByText('Please see our privacy statement')).toBeInTheDocument();
    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Change password')).toBeInTheDocument();
});

test('handles profile update', async () => {
    render(
        <MemoryRouter>
            <AuthenticateContext.Provider value={mockContextValue}>
                <Profile />
            </AuthenticateContext.Provider>
        </MemoryRouter>
    );

    const editButton = screen.getByText('Edit');
    userEvent.click(editButton);

    const nameInput = screen.getByLabelText('Name');
    const emailInput = screen.getByLabelText('Email');
    const cellphoneInput = screen.getByLabelText('Cellphone');

    fireEvent.change(nameInput, { target: { value: 'Updated Name' } });
    fireEvent.change(emailInput, { target: { value: 'updated@example.com' } });
    fireEvent.change(cellphoneInput, { target: { value: '987654321' } });

    const updateButton = screen.getByText('Edit');
    userEvent.click(updateButton);

    await waitFor(() => {
        expect(mockContextValue.updateProfile).toHaveBeenCalledWith({
            id: '1',
            name: 'Updated Name',
            email: 'updated@example.com',
            cellphone: '987654321',
        });
    });
});

test('handles password change', async () => {
    render(
        <MemoryRouter>
            <AuthenticateContext.Provider value={mockContextValue}>
                <Profile />
            </AuthenticateContext.Provider>
        </MemoryRouter>
    );

    const changePasswordButton = screen.getByText('Change password');
    userEvent.click(changePasswordButton);

    const newPasswordInput = screen.getByLabelText('New password');
    const confirmPasswordInput = screen.getByLabelText('Confirm password');

    fireEvent.change(newPasswordInput, { target: { value: 'newpassword' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'newpassword' } });

    const updatePasswordButton = screen.getByText('Change password');
    userEvent.click(updatePasswordButton);

    await waitFor(() => {
        expect(mockContextValue.updateProfilePassword).toHaveBeenCalledWith({
            id: '1',
            password: 'newpassword',
            confirmPassword: 'newpassword',
        });
    });
});
