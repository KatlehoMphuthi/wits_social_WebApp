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
    
});