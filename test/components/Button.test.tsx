import React from 'react';
import { screen, fireEvent, render } from '@testing-library/react';
import { Button } from '../../src/components/Button';

describe('Button', () => {
  it('renders without crashing', () => {
    render(<Button />);
    const button = screen.getByRole('button');
    expect(button).toBeDefined();
    fireEvent.click(button);
    expect(button).toBeDefined();
  });
  it('renders onClick and children without crashing', () => {
    let testFlag: boolean = false;
    render(
      <Button className="is-a-test" onClick={() => (testFlag = true)}>
        Test
      </Button>
    );

    const button = screen.getByRole('button');
    expect(button).toBeDefined();
    expect(testFlag).toBeFalsy();
    fireEvent.click(button);
    expect(testFlag).toBeTruthy();
  });
});
