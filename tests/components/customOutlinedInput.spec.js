import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CustomOutlinedInput from '../../src/components/customOutlinedInput/index';

test('renders CustomOutlinedInput component', () => {
    render(<CustomOutlinedInput placeholder="Enter text" type="text" setValue={() => { }} />);
    const inputElement = screen.getByPlaceholderText('Enter text');

    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute('type', 'text');
});

test('handles input change', () => {
    const setValueMock = jest.fn();
    render(<CustomOutlinedInput placeholder="Enter text" type="text" setValue={setValueMock} />);
    const inputElement = screen.getByPlaceholderText('Enter text');
    
    fireEvent.change(inputElement, { target: { value: 'Test input' } });

    expect(setValueMock).toHaveBeenCalledWith('Test input');
});

test('renders with start and end adornments', () => {
    render(
        <CustomOutlinedInput
            placeholder="Enter text"
            type="text"
            setValue={() => { }}
            startAdornment={<span>Start</span>}
            endAdornment={<span>End</span>}
        />
    );

    const startAdornment = screen.getByText('Start');
    const endAdornment = screen.getByText('End');

    expect(startAdornment).toBeInTheDocument();
    expect(endAdornment).toBeInTheDocument();
});

test('renders with default value', () => {
    render(
        <CustomOutlinedInput
            placeholder="Enter text"
            type="text"
            setValue={() => { }}
            defaultValue="Default Value"
        />
    );

    const inputElement = screen.getByDisplayValue('Default Value');
    expect(inputElement).toBeInTheDocument();
});
