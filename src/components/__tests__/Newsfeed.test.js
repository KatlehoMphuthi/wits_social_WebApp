import React from "react";
import {BrowserRouter as Router} from 'react-router-dom';
import { render, waitFor} from "@testing-library/react";
import { AuthProvider} from "../../AuthProvider";
import {  Provider as AlertProvider } from 'react-alert';
import AlertTemplate from "react-alert-template-mui";
import Topbar from "../common/Topbar";
import userEvent from "@testing-library/user-event";

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
  const{container} = userRender(<Topbar />, {providerProps});
  const searchBox = container.querySelector('#search_input');
  waitFor(() =>{expect(searchBox).toBeInTheDocument()});
});

test('Should show nothing if typed nothing in search bar', () => {
  const providerProps = {
  login: {email: "test01@mail.com", password: "Password123"}
  }
  const {container} = userRender(<Topbar />, {providerProps});
  
  const text = container.querySelector("#searchbar");
  userEvent.type(text,"");

  waitFor(()=>{
     expect(text).toBe("");
  });
});

test('Should show when no users with that letter in their names', () => {
  const providerProps = {
  login: {email: "test01@mail.com", password: "Password123"}
  }
  const {container} = userRender(<Topbar />, {providerProps});
 
  const text = container.querySelector("#searchbar");
  userEvent.type(text,"j");

  const result = container.querySelector('#result');
  expect(result).not.toBeInTheDocument();
});

 test('Should show when users available', () => {
  const providerProps = {
  login: {email: "test01@mail.com", password: "Password123"}
  }
  const {container} = userRender(<Topbar />, {providerProps});

  const text = container.querySelector("#searchbar");
  userEvent.type(text,"k");
  const result = container.querySelector("#result")
  waitFor(() => {
    expect(result).toBeInTheDocument()
  });
});

test('Should show when users with that letter in their names', () => {
  const providerProps = {
  login: {email: "test01@mail.com", password: "Password123"}
  }
  const {container} = userRender(<Topbar />, {providerProps});

  const text = container.querySelector("#searchbar");
  userEvent.type(text,"k");
  const result = container.querySelector("#result")
  waitFor(() => {
    expect(result).toHaveDisplayValue(/k/i);
  });
});