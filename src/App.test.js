import { render, screen } from '@testing-library/react';
import App from './App';

test('renders home page', () => {
  render(<App />);
  const linkElement = screen.getAllByRole('button', {
    name: /sign in/i
  })[0];
  expect(linkElement).toBeInTheDocument();
});

