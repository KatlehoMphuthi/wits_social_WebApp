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


const Props = {
    currentUser:{
      "uid": "dSLFBHzO1ub2y08A6QJuwGmFHki2",
      "email": "test01@mail.com",
      "emailVerified": false,
      "isAnonymous": false,
      "providerData": [
          {
              "providerId": "password",
              "uid": "test01@mail.com",
              "displayName": null,
              "email": "test01@mail.com",
              "phoneNumber": null,
              "photoURL": null
          }
      ],
      "stsTokenManager": {
          "refreshToken": "AOEOulbWf_5VwH69GNWON5DoLbBHj2sHEv2JbtXCpNzCWHIIGq_0CJEZiBdFnrhZ8DPVudt2r13vvkLsWYCpE7DlYc07gkJJsMvxv20j2niYNf4RtdfPgAGreW4eK4InEBFnu6RzZLas7n3D0SmR4apUh0E3E3KVKnEYoVGLgqG8tyATtsI11YB5CqUz7A33im22Pj_edEqRccVmeAIA4y-CeIyTl_FMvg",
          "accessToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6Ijk5NjJmMDRmZWVkOTU0NWNlMjEzNGFiNTRjZWVmNTgxYWYyNGJhZmYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc2Rwd2l0cy1zb2NpYWwiLCJhdWQiOiJzZHB3aXRzLXNvY2lhbCIsImF1dGhfdGltZSI6MTY2NTQ3OTQ2NiwidXNlcl9pZCI6ImRTTEZCSHpPMXViMnkwOEE2UUp1d0dtRkhraTIiLCJzdWIiOiJkU0xGQkh6TzF1YjJ5MDhBNlFKdXdHbUZIa2kyIiwiaWF0IjoxNjY1NDc5NDY2LCJleHAiOjE2NjU0ODMwNjYsImVtYWlsIjoidGVzdDAxQG1haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbInRlc3QwMUBtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.O71uIXu3yQTKfVcSe1AV5YUGYnVIAGnG9Ewv7ZWALRnvLeadDd8HpOyG05bZYRBZFqqLu3F5Q2FH8rwHBeIgKD7NTdnwMWyPsAQEOYoU87LgJmxCUsInYnMGykdqJP5d_d62_u___3gCDS7ZCtjGTWKD_LIDY8lWVD2T-1btJ4yQMoEJuDSwhM4d9ZCEmFB8xvxzABxbhu1-IJOBN8y8tr7B7xNLLGXN9Q3neE-3MNFyaVjFVI2GZTLuvzXc4Bf7f2RhwpZ7DRD8NvAvwMQknrqFcw0GzP1dHoIxxZcrl0SF_F3Jii9kov58ns4Yy_UdrIbCTi2z2SlM5SvsQFks_Q",
          "expirationTime": 1665483067198
      },
      "createdAt": "1662423261927",
      "lastLoginAt": "1665479466701",
      "apiKey": "AIzaSyD-2UqL8da9mbNb0UUziNXc0vBekUq7L-o",
      "appName": "[DEFAULT]"
  },
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
                                <CreatePost />
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
        //Post
        it("Show post button", () =>{
        
            expect(screen.getByRole('button')).toBeInTheDocument();
        
        });
        it("Should raise errors when submitting empty", async() => {
            const alertMock = jest.spyOn(Alert,'useAlert').mockImplementation(); 
            fireEvent.click(screen.getByRole('button'));
            waitFor(() => expect(alertMock).toBeCalled());
        });
        
        
         it("Should submit a text only post", async() =>{
            const mock = jest.fn();
            const alertMock = jest.spyOn(window,"alert") 
            const element = container.querySelector('#pInput');
            expect(element).toHaveTextContent("");
            fireEvent.input(element,{target:{value: "Hi I am test"}});
            screen.debug();
            waitFor(() =>expect(element.textContent).toBe("Hi I am test"));
            userEvent.click(screen.getByRole('button', {name:/post/i}));
            const alert = container.querySelector('#__react-alert__')
            await waitFor (() =>expect(alertMock).toBeCalled());
         
        
         });
        });