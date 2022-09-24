import React from "react";
import {BrowserRouter as Router} from 'react-router-dom';
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Newsfeed from "../newsfeed/Newsfeed";
import { AuthProvider} from "../../AuthProvider";
import Login from "../authentication/Login";
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from "react-alert-template-mui";
import { act } from "react-dom/test-utils";
import App from "../../App";


const mockLogin = jest.fn((email,password ) =>{
    return Promise.resolve(email,password);
});

describe("Newsfeed", ()=>{

    //should click the logout button
    it("Should click Logout button and change screens", () =>{
            render(<AlertProvider template={AlertTemplate}>
                <AuthProvider>
                    <App/>
              </AuthProvider>
              </AlertProvider>);
          fireEvent.input(screen.getByPlaceholderText(/email/i), {
            target: {
              value: "test01@mail.com"
            }
          });

          fireEvent.input(screen.getAllByPlaceholderText(/password/i)[0], {
            target: {
              value: "Password123"
            }
          });

          fireEvent.submit(screen.getAllByRole("button", {name: /sign in/i})[0]);

        waitFor(() => expect(screen.getByRole("button", {name: /logout/i})).toBeInTheDocument());
        //fireEvent.submit(screen.getByRole("button", {name: /logout/i}));
    });
    
    it("Should show Post in the newsfeed", ()=>
    {
        render(<AlertProvider template={AlertTemplate}>
            <AuthProvider>
                <App/>
          </AuthProvider>
          </AlertProvider>);
      fireEvent.input(screen.getByPlaceholderText(/email/i), {
        target: {
          value: "test01@mail.com"
        }
      });

      fireEvent.input(screen.getAllByPlaceholderText(/password/i)[0], {
        target: {
          value: "Password123"
        }
      });

      fireEvent.submit(screen.getAllByRole("button", {name: /sign in/i})[0]);
      waitFor(() => expect(screen.getByRole("button", {name: /post/i})).toBeInTheDocument());
    });

    it("Should show search bar in the newsfeed", ()=>
    {
        render(<AlertProvider template={AlertTemplate}>
            <AuthProvider>
                <App/>
          </AuthProvider>
          </AlertProvider>);
      fireEvent.input(screen.getByPlaceholderText(/email/i), {
        target: {
          value: "test01@mail.com"
        }
      });

      fireEvent.input(screen.getAllByPlaceholderText(/password/i)[0], {
        target: {
          value: "Password123"
        }
      });

      fireEvent.submit(screen.getAllByRole("button", {name: /sign in/i})[0]);
      waitFor(() => expect(screen.getByRole('img', {
        hidden: true
      })).toBeInTheDocument());
    });

    it("Should show like button in the newsfeed", ()=>
    {
        render(<AlertProvider template={AlertTemplate}>
            <AuthProvider>
                <App/>
          </AuthProvider>
          </AlertProvider>);
      fireEvent.input(screen.getByPlaceholderText(/email/i), {
        target: {
          value: "test01@mail.com"
        }
      });

      fireEvent.input(screen.getAllByPlaceholderText(/password/i)[0], {
        target: {
          value: "Password123"
        }
      });

      fireEvent.submit(screen.getAllByRole("button", {name: /sign in/i})[0]);
      waitFor(() => expect(screen.getByRole('button', {
        name: /liked/i
      })).toBeInTheDocument());
    });

    it("Should show comment button in the newsfeed", ()=>
    {
        render(<AlertProvider template={AlertTemplate}>
            <AuthProvider>
                <App/>
          </AuthProvider>
          </AlertProvider>);
      fireEvent.input(screen.getByPlaceholderText(/email/i), {
        target: {
          value: "test01@mail.com"
        }
      });

      fireEvent.input(screen.getAllByPlaceholderText(/password/i)[0], {
        target: {
          value: "Password123"
        }
      });

      fireEvent.submit(screen.getAllByRole("button", {name: /sign in/i})[0]);
      waitFor(() => expect(screen.getByRole('button', {
        name: /comment/i
      })).toBeInTheDocument());
    });

    it("Should show follow button in the newsfeed", ()=>
    {
        render(<AlertProvider template={AlertTemplate}>
            <AuthProvider>
                <App/>
          </AuthProvider>
          </AlertProvider>);
      fireEvent.input(screen.getByPlaceholderText(/email/i), {
        target: {
          value: "test01@mail.com"
        }
      });

      fireEvent.input(screen.getAllByPlaceholderText(/password/i)[0], {
        target: {
          value: "Password123"
        }
      });

      fireEvent.submit(screen.getAllByRole("button", {name: /sign in/i})[0]);
      waitFor(() => expect(screen.getByRole('button', {
        name: /follow/i
      })).toBeInTheDocument());
    });

});