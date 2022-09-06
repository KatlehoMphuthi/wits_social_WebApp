import React from "react";
import {BrowserRouter as Router} from 'react-router-dom';
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Login from "./Login";

const mockLogin = jest.fn((email,password ) =>{
    return Promise.resolve(email,password);
});

describe("Login", ()=>{
    beforeEach(() =>{
        render(<Router>
                <Login login ={ mockLogin}/>
            </Router>
        );
    });


    it("should display the required error when value is invalid", () =>{
        fireEvent.submit(screen.getByRole('button', {
            name: /sign in/i
          }));

        expect(mockLogin).not.toBeCalled();
    });

    it("it should not display an error when value is present" , () => {
        fireEvent.input(screen.getByRole("textbox"),{
            target: {
                value: "test"
            }
        });

        fireEvent.input(screen.getByPlaceholderText(/password/i), {
            target: {
              value: "password"
            }
          });

        fireEvent.submit(screen.getByRole("button", {name: /sign in/i}));
        expect(mockLogin).not.toBeCalled();
        expect(screen.getByRole("textbox").value).toBe("test");
        expect(screen.getByPlaceholderText(/password/i).value).toBe("password");

    });



    it("should not display error when value is valid", () => {
        fireEvent.input(screen.getByPlaceholderText(/email/i), {
          target: {
            value: "test01@mail.com"
          }
        });
    
        fireEvent.input(screen.getByPlaceholderText(/password/i), {
          target: {
            value: "Password123"
          }
        });
    
        fireEvent.submit(screen.getByRole("button", {name: /sign in/i}));
    
        waitFor(() => expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument());
        //expect(mockLogin).toBeCalled();
      });
    
});


