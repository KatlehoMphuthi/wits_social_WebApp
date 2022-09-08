import React from "react";
import {BrowserRouter as Router} from 'react-router-dom';
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Register from "./Registration";

const mockSignUp = jest.fn((firstName,lastName,email,password,confirm_password ) =>{
    return Promise.resolve(firstName,lastName,email,password,password,confirm_password);
});

describe("Register", ()=>{
    beforeEach(() =>{
        render(<Router>
                <Register signup ={ mockSignUp}/>
            </Router>
        );
    });


    it("Should errors in the form fields", () =>{
        fireEvent.submit(screen.getAllByRole('button', {
            name: /sign up/i
          })[0]);

        expect(screen.getByRole('heading', {
            name: /sign up/i
          })).toBeInTheDocument();
        expect(mockSignUp).not.toBeCalled();
    });

    //Testing the first name form field 
    it("Should display error when omitted" , () => {
        fireEvent.input(screen.getByPlaceholderText(/first name/i),{
            target: {
                value: "test"
            }
        });

        fireEvent.submit(screen.getAllByRole("button", {name: /sign up/i})[0]);
        expect(mockSignUp).not.toBeCalled();
        expect(screen.getByPlaceholderText(/first name/i).value).toBe("test");

    });

    //test the last name field 
    it("Should display errors when omitted other fields" , () => {
        fireEvent.input(screen.getByPlaceholderText(/last name/i),{
            target: {
                value: "test"
            }
        });

        fireEvent.submit(screen.getAllByRole("button", {name: /sign up/i})[0]);
        expect(mockSignUp).not.toBeCalled();
        expect(screen.getByPlaceholderText(/last name/i).value).toBe("test");

    });

    it("should not display error when value is valid", () => {
        fireEvent.input(screen.getByPlaceholderText(/first name/i),{
            target: {
                value: "test02"
            }
        });

        fireEvent.input(screen.getByPlaceholderText(/last name/i),{
            target: {
                value: "testuser02"
            }
        });

        fireEvent.input(screen.getByPlaceholderText(/email/i), {
          target: {
            value: "test02@mail.com"
          }
        });
    
        userEvent.type(screen.getAllByPlaceholderText(/password/i)[0],"Password123");

        fireEvent.input(screen.getAllByPlaceholderText(/confirm password/i)[0], {
            target: {
              value: "Password123"
            }
          });
    
        fireEvent.submit(screen.getAllByRole("button", {name: /sign up/i})[0]);
    
        waitFor(() => expect(window.alert).toBeInTheDocument());
        //expect(mockLogin).toBeCalled();
      });
    
      it("test firebase response", () => {
        fireEvent.input(screen.getByPlaceholderText(/first name/i),{
            target: {
                value: "test02"
            }
        });

        fireEvent.input(screen.getByPlaceholderText(/last name/i),{
            target: {
                value: "testuser02"
            }
        });

        const min = 1;
        const max = 100;
        const rand = min + Math.random() * (max - min);

        fireEvent.input(screen.getByPlaceholderText(/email/i), {
          target: { 
            value: "test000"+rand.toString()+"@mail.com"
          }
        });
    
        userEvent.type(screen.getAllByPlaceholderText(/password/i)[0],"Password123");

        fireEvent.input(screen.getAllByPlaceholderText(/confirm password/i)[0], {
            target: {
              value: "Password123"
            }
          });
    
        fireEvent.submit(screen.getAllByRole("button", {name: /sign up/i})[0]);
    
        waitFor(() => expect(window.alert).toBeCalledWith("success"));
        //expect(mockLogin).toBeCalled();
      });
});