import React from "react";
import {BrowserRouter as Router} from 'react-router-dom';
import { render, waitFor,screen, fireEvent} from "@testing-library/react";
import { AuthProvider} from "../../AuthProvider";
import {  Provider as AlertProvider } from 'react-alert';
import AlertTemplate from "react-alert-template-mui";
import Topbar from "../common/Topbar";
import userEvent from "@testing-library/user-event";

const userRender = (ui, {providerProps, ...renderOptions}) => {
  return render(<AlertProvider template={AlertTemplate}>
                  <AuthProvider {...providerProps}><Router>{ui}</Router></AuthProvider>
          </AlertProvider>,
    renderOptions,
  )
}

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
}
  }

test('Should show  search bar', () => {
  userRender(<Topbar />, {...Props,});
  const searchBox = waitFor(()=>{screen.getByRole('textbox')});
  waitFor(() =>{expect(searchBox).toBeInTheDocument()});
});

test('Should show nothing if typed nothing in search bar', () => {

  userRender(<Topbar />, {...Props,});
  
  const text =  waitFor(()=>{screen.getByRole('textbox')});
  userEvent.type(text,"");

  waitFor(()=>{
     expect(text).toBe("");
  });
});

test('Should show when no users with that letter in their names', () => {
  const {container} = userRender(<Topbar />, {... Props});
 
  const text = container.querySelector("#searchbar");
  userEvent.type(text,"j");

  const result = container.querySelector('#result');
  expect(result).not.toBeInTheDocument();
});

 test('Should show when users available', () => {
  const {container} = userRender(<Topbar />, {...Props,});

  const text = waitFor(()=>{screen.getByRole('textbox')});
  userEvent.type(text,"k");
  const result = container.querySelector("#result")
  waitFor(() => {
    expect(result).toBeInTheDocument()
  });
});

test('Should show when users with that letter in their names', () => {
  
  const {container} = userRender(<Topbar />, {...Props});

  const text = waitFor(()=>{screen.getByTestId('sInput')});;
  userEvent.type(text, {target: {value: 'k'}});
  const result = container.querySelector("#result")
  waitFor(() => {
    expect(result).toHaveDisplayValue(/k/i);
  });
});

