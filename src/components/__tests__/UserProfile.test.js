import React from "react";
import {BrowserRouter as Router} from 'react-router-dom';
import { waitFor,screen, fireEvent,act} from "@testing-library/react";
import {AuthContext,AuthProvider} from "../../AuthProvider.js";
import ReactDOM from 'react-dom/client';
import UserProfile from "../userprofile/UserProfile.js";
import axios from "axios";
import { async } from "@firebase/util";


const POSTS_URL = "https://sdpwits-social-default-rtdb.firebaseio.com/posts.json"
const USER_POST_URL = `https://sdpwits-social-default-rtdb.firebaseio.com/users/dSLFBHzO1ub2y08A6QJuwGmFHki2.json`;
const LikeUrl = `https://sdpwits-social-default-rtdb.firebaseio.com/userLikes/dSLFBHzO1ub2y08A6QJuwGmFHki2/posts.json`
const followers_url = `https://sdpwits-social-default-rtdb.firebaseio.com/follow/dSLFBHzO1ub2y08A6QJuwGmFHki2.json`
const SinglePOST_URL = "https://sdpwits-social-default-rtdb.firebaseio.com/posts/post1.json"

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


jest.mock('react-router-dom', () => ({
        __esModule: true,
    ...jest.requireActual("react-router-dom"),
       useLocation: () => ({ pathname:"/dSLFBHzO1ub2y08A6QJuwGmFHki2", state:{clickedpost:'dSLFBHzO1ub2y08A6QJuwGmFHki2',}}),
    }));

describe("UserProfile",() =>{

    let container;
    beforeEach(() =>{
        
    });
    
    afterEach(() =>{
        document.body.removeChild(container);
        container = null;
        jest.restoreAllMocks()
    });

    //testing the Profile picture 
    it("Should show profile picture",async()=>{
        const mockResponse = {
            data:{bio:"",firstName:"test01",lastName:"",profilePictureUrl:undefined, userid:"dSLFBHzO1ub2y08A6QJuwGmFHki2", userId:"dSLFBHzO1ub2y08A6QJuwGmFHki2",}
        }
        const mockPosts = {
            data:{post1:{caption:"",imageUrl:"",postid:"-p001",text:"Hi, I am test",time:"1664529829923",userId:"dSLFBHzO1ub2y08A6QJuwGmFHki2",username:"test01"}}
        }

        const mockFollow = {
            data:{ followers:{personA:true},following:{personA:true}}
        }

        const mockLikes = {data:{post1:true}}
        jest.spyOn(axios,'get').mockImplementation(async (url) =>{
            if (url === USER_POST_URL) {
                return Promise.resolve(mockResponse)
              } else if (url === POSTS_URL) {
                return Promise.resolve(mockPosts)
              }else if (url === LikeUrl){
                return Promise.resolve(null)
              }else if( url === followers_url){
                return Promise.resolve(mockFollow)
              }else if(url === SinglePOST_URL){
                return Promise.resolve(mockPosts.data.post1)
              } else{
                return Promise.resolve(mockResponse.data)
              }
        });

        axios.get.mockResolvedValue(mockResponse)
        axios.get.mockResolvedValue(mockPosts)
        axios.get.mockResolvedValue(mockLikes)
        axios.get.mockResolvedValue(mockFollow)
    
        container = document.createElement('div');
        document.body.appendChild(container);
    
        act(() =>{
            ReactDOM.createRoot(container).render(
                <AuthContext.Provider value={{...Props}}>
                    <Router>
                        <UserProfile/>
                    </Router>
                </AuthContext.Provider>
            );
        });

        await waitFor(() => {
            expect(screen.getByTestId(/proPic/i)).toBeInTheDocument();
            screen.debug();
        })

       
    })

    //update profile picture
    it("should edit profile picture",async ()=>{
        const mockResponse = {
            data:{bio:"",firstName:"test01",lastName:"",profilePictureUrl:undefined, userid:"dSLFBHzO1ub2y08A6QJuwGmFHki2", userId:"dSLFBHzO1ub2y08A6QJuwGmFHki2",}
        }
        const mockPosts = {
            data:{post1:{caption:"",imageUrl:"",postid:"-p001",text:"Hi, I am test",time:"1664529829923",userId:"dSLFBHzO1ub2y08A6QJuwGmFHki2",username:"test01"}}
        }

        const mockFollow = {
            data:{ followers:{personA:true},following:{personA:true}}
        }

        const mockLikes = {data:{post1:true}}
        jest.spyOn(axios,'get').mockImplementation(async (url) =>{
            if (url === USER_POST_URL) {
                return Promise.resolve(mockResponse)
              } else if (url === POSTS_URL) {
                return Promise.resolve(mockPosts)
              }else if (url === LikeUrl){
                return Promise.resolve(null)
              }else if( url === followers_url){
                return Promise.resolve(mockFollow)
              }else if(url === SinglePOST_URL){
                return Promise.resolve(mockPosts.data.post1)
              } else{
                return Promise.resolve(mockResponse.data)
              }
        });

        axios.get.mockResolvedValue(mockResponse)
        axios.get.mockResolvedValue(mockPosts)
        axios.get.mockResolvedValue(mockLikes)
        axios.get.mockResolvedValue(mockFollow)
        container = document.createElement('div');
        document.body.appendChild(container);
    
        act(() =>{
            ReactDOM.createRoot(container).render(
                <AuthContext.Provider value={{...Props}}>
                    <Router>
                        <UserProfile/>
                    </Router>
                </AuthContext.Provider>
            );
        })
        const edit = container.querySelector('#editButton')
        
        await waitFor(() => {
                fireEvent.click(edit);
                expect(container.querySelector('#editprofile'))}
            )
    })

   //show the liked posts , followers and following 
   it('should show the likes,follow,following tabs', async () =>{
    const mockResponse = {
        data:{bio:"",firstName:"test01",lastName:"",profilePictureUrl:undefined, userid:"dSLFBHzO1ub2y08A6QJuwGmFHki2", userId:"dSLFBHzO1ub2y08A6QJuwGmFHki2",}
    }
    const mockPosts = {
        data:{post1:{caption:"",imageUrl:"",postid:"-p001",text:"Hi, I am test",time:"1664529829923",userId:"dSLFBHzO1ub2y08A6QJuwGmFHki2",username:"test01"}}
    }

    const mockFollow = {
        data:{ followers:{personA:true},following:{personA:true}}
    }

    const mockLikes = {data:{post1:true}}
    jest.spyOn(axios,'get').mockImplementation(async (url) =>{
        if (url === USER_POST_URL) {
            return Promise.resolve(mockResponse)
          } else if (url === POSTS_URL) {
            return Promise.resolve(mockPosts)
          }else if (url === LikeUrl){
            return Promise.resolve(null)
          }else if( url === followers_url){
            return Promise.resolve(mockFollow)
          }else if(url === SinglePOST_URL){
            return Promise.resolve(mockPosts.data.post1)
          } else{
            return Promise.resolve(mockResponse.data)
          }
    });

    axios.get.mockResolvedValue(mockResponse)
    axios.get.mockResolvedValue(mockPosts)
    axios.get.mockResolvedValue(mockLikes)
    axios.get.mockResolvedValue(mockFollow)
    container = document.createElement('div');
    document.body.appendChild(container);

    act(() =>{
        ReactDOM.createRoot(container).render(
            <AuthContext.Provider value={{...Props}}>
                <Router>
                    <UserProfile/>
                </Router>
            </AuthContext.Provider>
        );
    });

    const Likestab = screen.getByRole('tab',{name:'Likes'})
    const follower = screen.getByRole('tab',{name: 'Followers'})
    const following = screen.getByRole('tab',{name: 'Following'})
    await waitFor(()=>{
        expect(Likestab).toBeInTheDocument()
        expect(follower).toBeInTheDocument()
        expect(following).toBeInTheDocument()
    });

   })

   it("should show liked posts", async  () =>{
    const mockResponse = {
        data:{bio:"",firstName:"test01",lastName:"",profilePictureUrl:undefined, userid:"dSLFBHzO1ub2y08A6QJuwGmFHki2", userId:"dSLFBHzO1ub2y08A6QJuwGmFHki2",}
    }
    const mockPosts = {
        data:{post1:{caption:"",imageUrl:"",postid:"-p001",text:"Hi, I am test",time:"1664529829923",userId:"dSLFBHzO1ub2y08A6QJuwGmFHki2",username:"test01"}}
    }

    const mockFollow = {
        data:{ followers:{personA:true},following:{personA:true}}
    }

    const mockLikes = {data:{post1:true}}
    jest.spyOn(axios,'get').mockImplementation(async (url) =>{
        if (url === USER_POST_URL) {
            return Promise.resolve(mockResponse)
          } else if (url === POSTS_URL) {
            return Promise.resolve(mockPosts)
          }else if (url === LikeUrl){
            return Promise.resolve(null)
          }else if( url === followers_url){
            return Promise.resolve(mockFollow)
          }else if(url === SinglePOST_URL){
            return Promise.resolve(mockPosts.data.post1)
          } else{
            return Promise.resolve(mockResponse.data)
          }
    });

    axios.get.mockResolvedValue(mockResponse)
    axios.get.mockResolvedValue(mockPosts)
    axios.get.mockResolvedValue(mockLikes)
    axios.get.mockResolvedValue(mockFollow)
    container = document.createElement('div');
    document.body.appendChild(container);

    act(() =>{
        ReactDOM.createRoot(container).render(
            <AuthContext.Provider value={{...Props}}>
                <Router>
                    <UserProfile/>
                </Router>
            </AuthContext.Provider>
        );
    });

    const Likestab = screen.getByRole('tab',{name:'Likes'})

    fireEvent.click(Likestab)
    waitFor(() =>{
        expect(screen.getByTestId(/user/i)).toBeInTheDocument();
    })
   });


   it("should show liked posts", async  () =>{
    const mockResponse = {
        data:{bio:"",firstName:"test01",lastName:"",profilePictureUrl:undefined, userid:"dSLFBHzO1ub2y08A6QJuwGmFHki2", userId:"dSLFBHzO1ub2y08A6QJuwGmFHki2",}
    }
    const mockPosts = {
        data:{post1:{caption:"",imageUrl:"",postid:"-p001",text:"Hi, I am test",time:"1664529829923",userId:"dSLFBHzO1ub2y08A6QJuwGmFHki2",username:"test01"}}
    }

    const mockFollow = {
        data:{ followers:{personA:true},following:{personA:true}}
    }

    const mockLikes = {data:{post1:true}}
    jest.spyOn(axios,'get').mockImplementation(async (url) =>{
        if (url === USER_POST_URL) {
            return Promise.resolve(mockResponse)
          } else if (url === POSTS_URL) {
            return Promise.resolve(mockPosts)
          }else if (url === LikeUrl){
            return Promise.resolve(null)
          }else if( url === followers_url){
            return Promise.resolve(mockFollow)
          }else if(url === SinglePOST_URL){
            return Promise.resolve(mockPosts.data.post1)
          } else{
            return Promise.resolve(mockResponse.data)
          }
    });

    axios.get.mockResolvedValue(mockResponse)
    axios.get.mockResolvedValue(mockPosts)
    axios.get.mockResolvedValue(mockLikes)
    axios.get.mockResolvedValue(mockFollow)
    container = document.createElement('div');
    document.body.appendChild(container);

    act(() =>{
        ReactDOM.createRoot(container).render(
            <AuthContext.Provider value={{...Props}}>
                <Router>
                    <UserProfile/>
                </Router>
            </AuthContext.Provider>
        );
    });

    const followers = screen.getByRole('tab',{name:'Followers'})

    fireEvent.click(followers)
    await waitFor(() =>{
        expect(screen.getByTestId(/user/i)).toBeInTheDocument();
    })
   });

   it("should show liked posts", async  () =>{
    const mockResponse = {
        data:{bio:"",firstName:"test01",lastName:"",profilePictureUrl:undefined, userid:"dSLFBHzO1ub2y08A6QJuwGmFHki2", userId:"dSLFBHzO1ub2y08A6QJuwGmFHki2",}
    }
    const mockPosts = {
        data:{post1:{caption:"",imageUrl:"",postid:"-p001",text:"Hi, I am test",time:"1664529829923",userId:"dSLFBHzO1ub2y08A6QJuwGmFHki2",username:"test01"}}
    }

    const mockFollow = {
        data:{ followers:{personA:true},following:{personA:true}}
    }

    const mockLikes = {data:{post1:true}}
    jest.spyOn(axios,'get').mockImplementation(async (url) =>{
        if (url === USER_POST_URL) {
            return Promise.resolve(mockResponse)
          } else if (url === POSTS_URL) {
            return Promise.resolve(mockPosts)
          }else if (url === LikeUrl){
            return Promise.resolve(null)
          }else if( url === followers_url){
            return Promise.resolve(mockFollow)
          }else if(url === SinglePOST_URL){
            return Promise.resolve(mockPosts.data.post1)
          } else{
            return Promise.resolve(mockResponse.data)
          }
    });

    axios.get.mockResolvedValue(mockResponse)
    axios.get.mockResolvedValue(mockPosts)
    axios.get.mockResolvedValue(mockLikes)
    axios.get.mockResolvedValue(mockFollow)
    container = document.createElement('div');
    document.body.appendChild(container);

    act(() =>{
        ReactDOM.createRoot(container).render(
            <AuthContext.Provider value={{...Props}}>
                <Router>
                    <UserProfile/>
                </Router>
            </AuthContext.Provider>
        );
    });

    const following = screen.getByRole('tab',{name:'Following'})

    fireEvent.click(following)
    await waitFor(() =>{
            expect(screen.getByTestId(/user/i)).toBeInTheDocument();
        })
   });



    


})