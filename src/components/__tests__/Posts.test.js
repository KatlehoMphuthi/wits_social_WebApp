import React from "react";
import {BrowserRouter as Router} from 'react-router-dom';
import { waitFor,screen, fireEvent,act} from "@testing-library/react";
import {AuthContext,AuthProvider} from "../../AuthProvider";
import { Provider as AlertProvider } from 'react-alert';
import * as Alert from 'react-alert';
import ReactDOM from 'react-dom/client';
import CreatePost from '../post/CreatePost'
import AlertTemplate from "react-alert-template-mui";
import userEvent from "@testing-library/user-event"
import Posts from "../newsfeed/Posts";


const Props = {
    currentUser:{
        "uid": "fjMB4DrpZRPN008Ul6Z5m38ITzr1",
        "email": "katli.mphuthi@gmail.com",
        "emailVerified": false,
        "isAnonymous": false,
        "providerData": [
            {
                "providerId": "password",
                "uid": "katli.mphuthi@gmail.com",
                "displayName": null,
                "email": "katli.mphuthi@gmail.com",
                "phoneNumber": null,
                "photoURL": null
            }
        ],
        "stsTokenManager": {
            "refreshToken": "AOEOulYrWgi3iIQLPWu0Gjon3xRPq4QnUa_J5FwZEsIfLFq8uCHBOna9IY3wjxh6msbkASqzR8xh280cV15gv6uQH_3D6X5FMyJvgIbfWMSTkkuNxj2hdyrpooROIkW-9NlfSGod9JcWdG4BxoOeZkNYf0ffnZaz6G3hp_xQqhlI6lyanhfqwqJN8pjLS0bTLj7C4yk8f8gKX9NIuN2Uj2AsksUkPMhCCQ",
            "accessToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6Ijk5NjJmMDRmZWVkOTU0NWNlMjEzNGFiNTRjZWVmNTgxYWYyNGJhZmYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc2Rwd2l0cy1zb2NpYWwiLCJhdWQiOiJzZHB3aXRzLXNvY2lhbCIsImF1dGhfdGltZSI6MTY2NTY1ODI0MiwidXNlcl9pZCI6ImZqTUI0RHJwWlJQTjAwOFVsNlo1bTM4SVR6cjEiLCJzdWIiOiJmak1CNERycFpSUE4wMDhVbDZaNW0zOElUenIxIiwiaWF0IjoxNjY1NjU4MjQyLCJleHAiOjE2NjU2NjE4NDIsImVtYWlsIjoia2F0bGkubXBodXRoaUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsia2F0bGkubXBodXRoaUBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.ZCm_Jc3fuXIciHuyxIeQd3qsGcgq69gQ8vBosp8ZY3SOqpscV6yNYvFZ7CPAFSrbgFC6HpYT3hqpzS-PnJGLsHEkmeulxLpEpEFyJB2AFnYfS24DZaFXNV_D5GiH1YZZfZ1Wu3jD_Lk6VmyCKauoMfxqGMuY3RhDPW0yEdOHXYcF11FEITMUlDUEEz7CLXAyVxhp31llrPQ2nt8uCl0n6vHYtSEvwHNsEO1zRXs_LTOt3PR5QwyPUJmOhqQ4HBl4pMGJjWtiMIP75N-RwF2t0r7inRT7XRg7drKWdGZl78hMCbNUtTCKv_FH2u5aE48e3Yue681ch02D4slWwfGalA",
            "expirationTime": 1665661842304
        },
        "createdAt": "1661978432659",
        "lastLoginAt": "1665658242282",
        "apiKey": "AIzaSyD-2UqL8da9mbNb0UUziNXc0vBekUq7L-o",
        "appName": "[DEFAULT]"
    },
    };

    const PostData  = {
        caption:"Hi I am test",
        imgUrl:"",
        postid:"-NEFbmvnG1Eqr1F4rR_q",
        time:1665652437831,
        name:"test01",
        username:"",
    };


    describe("create post",() =>{

        let container;
        beforeEach(() =>{
            container = document.createElement('div');
            document.body.appendChild(container);
        
            act(() =>{
                ReactDOM.createRoot(container).render(
                    <AlertProvider template={AlertTemplate}>
                        <AuthContext.Provider value={{...Props}}>
                            <Router>
                                <Posts {...PostData}/>
                            </Router>
                        </AuthContext.Provider>
                    </AlertProvider>
                    
                );
            });
        });
        
        afterEach(() =>{
            document.body.removeChild(container);
            container = null;
        });

        it("should show whole post", () => {
            expect(screen.getByTestId("post")).toBeInTheDocument();
        });

        //comment
        it("should show comment button", () =>{
            expect(screen.getByText(/comments/i)).toBeInTheDocument();
        });

        it("should show comment box", () =>{
            fireEvent.click(screen.getByText(/comments/i));
            expect(screen.getByTestId("commentBox")).toBeInTheDocument();

        });
        //like
        it("should show like button", () =>{
            expect(screen.getByText(/like/i)).toBeInTheDocument();
        });

        // it("should show like count increase", () =>{
        //     //jest.spyOn(React,"useRef").mockReturnThis(1);
        //     fireEvent.click(screen.getByText(/like/i));
        //     //expect(screen.getByText(/like/i)).toBeInTheDocument();

        // });

        //share
        it("should show share button", () =>{
            expect(screen.getByText(/share/i)).toBeInTheDocument();
        });

        //Should show share box
        it("should show share box", () =>{
            fireEvent.click(screen.getByText(/share/i));
            expect(screen.getByTestId("shareBox")).toBeInTheDocument()});

        //Should show profile page
        it("should go to profile page", async() =>{
            fireEvent.click(screen.getByText(/test01/i));
            waitFor(() => expect(screen.getByText(/test01/i)).toBeInTheDocument())
        })
    
    });