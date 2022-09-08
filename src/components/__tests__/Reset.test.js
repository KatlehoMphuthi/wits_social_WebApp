import React from "react";
import {BrowserRouter as Router} from 'react-router-dom';
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Reset from "../authentication/Reset";

const mock = jest.fn((email ) =>{
    return Promise.resolve(email);
});

describe("Reset", ()=>{
    beforeEach(() =>{
        render(<Router>
                <Reset reset ={ mock}/>
            </Router>);
    });


    it("should display the required error when value is invalid", () =>{
        fireEvent.submit(screen.getByRole("button",{name: /send email/i}));

        expect(mock).not.toBeCalled();
    });

    it("should display an error when invalid email" , async() => {
        fireEvent.input(screen.getByPlaceholderText(/email/i),{
            target: {
                value: "Kate"
            }
        });

        fireEvent.submit(screen.getByRole("button", {name: /send email/i}));
        waitFor(() => expect(window.alert).toBeInTheDocument());
        expect(screen.getByRole("textbox").value).toBe( "Kate");

    });

    it("should not display an error", async() => {
        fireEvent.input(screen.getByPlaceholderText(/email/i),{
            target: {
                value: "test01@mail.com"
            }
        });
        fireEvent.submit(screen.getByRole("button", {name: /send email/i}));
        waitFor(() => expect(screen.getByRole("button", {name: /sign in/i})).toBeInTheDocument());
        

    });
});