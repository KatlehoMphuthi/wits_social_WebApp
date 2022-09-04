import { render, screen } from '@testing-library/react';
import App from './App';

test('renders home page', () => {
  render(<App />);
  const linkElement = screen.getByRole('button', {
    name: /sign in/i
  });
  expect(linkElement).toBeInTheDocument();
});

