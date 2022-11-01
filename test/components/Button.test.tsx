import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { Button } from '../../src/components/Button';

describe('Button', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    const root = createRoot(div);
    root.render(<Button />);
    root.unmount();
  });
  it('renders full data without crashing', () => {
    const div = document.createElement('div');
    const root = createRoot(div);
    root.render(
      <Button className="is-a-test" onClick={() => null}>
        Test
      </Button>
    );
    root.unmount();
  });
});
