import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { SecondaryGradientButton } from '../../src/components/secondaryGrandientButton/index';

test('renders SecondaryGradientButton component with text', () => {
    render(<SecondaryGradientButton text="Click me" />);
    expect(screen.getByText('Click me')).toBeInTheDocument();
});

test('renders SecondaryGradientButton component with icon and text', () => {
    const mockIcon = <span data-testid="mock-icon">🚀</span>;
    render(<SecondaryGradientButton icon={mockIcon} text="Click me" />);

    expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
    expect(screen.getByText('Click me')).toBeInTheDocument();
});

test('calls onClick handler when button is clicked', () => {
    const mockOnClick = jest.fn();
    render(<SecondaryGradientButton text="Click me" onClick={mockOnClick} />);

    const button = screen.getByText('Click me');
    fireEvent.click(button);

    expect(mockOnClick).toHaveBeenCalled();
});
