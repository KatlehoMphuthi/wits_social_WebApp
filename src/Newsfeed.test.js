import React from "react";
import {BrowserRouter as Router} from 'react-router-dom';
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Newsfeed from "./Newsfeed";


describe("Newsfeed", ()=>{
    beforeEach(() =>{
        render(<Router>
                <Newsfeed />
            </Router>
        );
    });

    // should show the header
    it("Should show the header", () =>{
        expect(screen.getByText(/wits social/i)).toBeInTheDocument();
    });

    //should click the logout button
    it("Should click button and change screens", () =>{
        fireEvent.submit(screen.getByRole("button", {name: /logout/i}));
        waitFor(() => expect(screen.getByRole("button", {name: /sign in/i})).toBeInTheDocument());

    });
    
});