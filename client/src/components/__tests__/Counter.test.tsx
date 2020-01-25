import React from 'react';
import { render, fireEvent } from '../../../../test-utils/src';
import { Counter } from '../Counter';

describe('<Counter />', () => {
  it('renders without exploding', async () => {
    render(<Counter />);
  });

  it('displays the correct count', () => {
    const { getByText, getByRole } = render(<Counter />);

    expect(getByText('0')).toBeInTheDocument();
    fireEvent.click(getByRole('button'));
    expect(getByText('1')).toBeInTheDocument();
  });
});
