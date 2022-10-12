import React from "react";
import {BrowserRouter as Router} from 'react-router-dom';
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Newsfeed from "../newsfeed/Newsfeed";
import { AuthContext, AuthProvider} from "../../AuthProvider";
import Login from "../authentication/Login";
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from "react-alert-template-mui";
import { act } from "react-dom/test-utils";
import App from "../../App";
import Topbar from "../common/Topbar";

const userRender = (ui, {providerProps, ...renderOptions}) => {
  return render(<AlertProvider template={AlertTemplate}>
                  <AuthProvider {...providerProps}><Router>{ui}</Router></AuthProvider>
          </AlertProvider>,
    renderOptions,
  )
}

test('Should show  search bar', () => {
  const providerProps = {
  login: {email: "test01@mail.com", password: "Password123"}
  }
  userRender(<Topbar />, {providerProps})
  expect(screen.getByRole('textbox',{hidden:true})).toBeInTheDocument();
});

test('Should show nothing if typed nothing in search bar', () => {
  const providerProps = {
  login: {email: "test01@mail.com", password: "Password123"}
  }
  userRender(<Topbar />, {providerProps});
  fireEvent.input(screen.getByRole('textbox',{hidden:true}),{
    target: {
    value: ""}
  });

  expect(screen.getByRole('textbox',{hidden:true})).toBeInTheDocument();
});

test('Should show when no users with that letter in their names', () => {
  const providerProps = {
  login: {email: "test01@mail.com", password: "Password123"}
  }
  userRender(<Topbar />, {providerProps});
  fireEvent.input(screen.getByRole('textbox',{hidden:true}),{
    target: {
    value: "j"}
  });

  expect(screen.getByRole('textbox',{hidden:true})).toBeInTheDocument();
});

/* test('Should show when users with that letter in their names', () => {
  const providerProps = {
  login: {email: "test01@mail.com", password: "Password123"}
  }
  userRender(<Topbar />, {providerProps});
  fireEvent.input(screen.getByRole('textbox',{hidden:true}),{
    target: {
    value: "k"}
  });

  const container = document.querySelector('#app')
  const inputNode2 = getByText(container, 'Username')

  expect(screen.getByTestId('result')).toBeInTheDocument();
}); */