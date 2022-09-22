import React from "react";
import {BrowserRouter as Router} from 'react-router-dom';
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Newsfeed from "../newsfeed/Newsfeed";
import {AuthProvider} from '../../AuthProvider'


describe("Newsfeed", ()=>{
    beforeEach(() =>{
        render(
            <AuthProvider>
                <Router>
                    <Newsfeed />
                </Router>
            </AuthProvider>
            
        );
    });

    //should click the logout button
    it("Should click button and change screens", () =>{
        fireEvent.submit(screen.getByRole("button", {name: /logout/i}));
        waitFor(() => expect(screen.getByRole("button", {name: /sign in/i})).toBeInTheDocument());

    });
    
});