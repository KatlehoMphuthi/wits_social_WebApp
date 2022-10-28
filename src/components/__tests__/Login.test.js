import React from "react";
import {BrowserRouter as Router} from 'react-router-dom';
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Login from "../authentication/Login.js";
import { AuthProvider} from "../../AuthProvider";
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from "react-alert-template-mui";

const mockLogin = jest.fn((email,password ) =>{
    return Promise.resolve(email,password);
});

describe("Login", ()=>{
    beforeEach(() =>{
        render(
          <AlertProvider template={AlertTemplate}>
            <AuthProvider>
            <Router>
                <Login login ={ mockLogin}/>
            </Router>
          </AuthProvider>
          </AlertProvider>
          
              
        );
    });


    it("should display the required error when value is invalid", () =>{
        fireEvent.submit(screen.getAllByRole('button', {
            name: /sign in/i
          })[0]);

        expect(mockLogin).not.toBeCalled();
    });

    it("it should not display an error when value is present" , () => {
        fireEvent.input(screen.getByRole("textbox"),{
            target: {
                value: "test"
            }
        });

        fireEvent.input(screen.getAllByPlaceholderText(/password/i)[0], {
            target: {
              value: "password"
            }
          });

        fireEvent.submit(screen.getAllByRole("button", {name: /sign in/i})[0]);
        expect(mockLogin).not.toBeCalled();
        expect(screen.getByRole("textbox").value).toBe("test");
        expect(screen.getAllByPlaceholderText(/password/i)[0].value).toBe("password");

    });
    //Test alert error messages
    it("should say that user does not exist", () => {
      const alertMock = jest.spyOn(window,'alert').mockImplementation(); 
      fireEvent.input(screen.getByPlaceholderText(/email/i), {
        target: {
          value: "test1000@mail.com"
        }
      });
  
      fireEvent.input(screen.getAllByPlaceholderText(/password/i)[0], {
        target: {
          value: "Password123"
        }
      });
  
      fireEvent.submit(screen.getAllByRole("button", {name: /sign in/i})[0]);
  
      waitFor(() => expect(alertMock).toBeCalled());
      expect(mockLogin).not.toBeCalled();
    });

    //test alert error: wrong password
    it("should say that user does not exist", () => {
      const alertMock = jest.spyOn(window,'alert').mockImplementation(); 
      fireEvent.input(screen.getByPlaceholderText(/email/i), {
        target: {
          value: "test01@mail.com"
        }
      });
  
      fireEvent.input(screen.getAllByPlaceholderText(/password/i)[0], {
        target: {
          value: "Password"
        }
      });
  
      fireEvent.submit(screen.getAllByRole("button", {name: /sign in/i})[0]);
  
       waitFor(() => expect(alertMock).toBeCalledWith("The password you have entered is incorrect"));
      //expect(mockLogin).toBeCalled();
    });



    it("should not display error when value is valid", () => {
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
    
        waitFor(() => expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument());
        //expect(mockLogin).toBeCalled();
      });
    
});


