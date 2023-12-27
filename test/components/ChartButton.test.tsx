import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ChartButton } from '../../src/components/ChartButton';

describe('ChartButton', () => {
  it('renders the button with children', () => {
    const buttonText = 'Test Button';
    render(<ChartButton>{buttonText}</ChartButton>);

    const button = screen.getByRole('button', { name: buttonText });
    expect(button).not.toBeUndefined();
  });

  it('applies the highlighted class when selected', () => {
    const buttonText = 'Highlighted Button';
    render(<ChartButton isSelected>{buttonText}</ChartButton>);

    const button = screen.getByRole('button', { name: buttonText });
    expect(button).not.toBeUndefined();
  });

  it('applies the non-highlighted class when not selected', () => {
    const buttonText = 'Non-Highlighted Button';
    render(<ChartButton>{buttonText}</ChartButton>);

    const button = screen.getByRole('button', { name: buttonText });
    expect(button).not.toBeUndefined();
  });

  it('calls onClick handler when clicked', () => {
    const buttonText = 'Clickable Button';
    const handleClick = jest.fn();
    render(<ChartButton onClick={handleClick}>{buttonText}</ChartButton>);

    const button = screen.getByRole('button', { name: buttonText });
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalled();
    expect(handleClick).toHaveBeenCalledWith(expect.anything(), buttonText);
  });

  it('uses default parameter for onClick handler when children is not provided', () => {
    const handleClick = jest.fn();
    render(<ChartButton onClick={handleClick} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledWith(expect.anything(), '1 month');
  });
});
