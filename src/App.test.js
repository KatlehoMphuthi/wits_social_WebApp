import { render, screen } from '@testing-library/react';
import App from './App';
import { AuthProvider} from "./AuthProvider";
import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from "react-alert-template-mui";
import {BrowserRouter as Router} from 'react-router-dom';

test('renders home page', () => {
  render(
    <AlertProvider template={AlertTemplate}>
    <AuthProvider>
    
        <App />
   
  </AuthProvider>
  </AlertProvider>);

  const linkElement = screen.getAllByRole('button', {
    name: /sign in/i
  })[0];
  expect(linkElement).toBeInTheDocument();
});

