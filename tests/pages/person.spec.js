import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Person from '../../src/pages/Person/index';

test('renders Person page with Header and Profile components', () => {
    render(<Person />);

    expect(screen.getByTestId('header-component')).toBeInTheDocument();
    expect(screen.getByTestId('profile-component')).toBeInTheDocument();
});
