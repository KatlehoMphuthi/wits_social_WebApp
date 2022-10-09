import "../common/topbar.css";
import { database, readData } from "../../firebase"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { useContext, useEffect, useState, } from 'react';
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { AuthContext } from "../../AuthProvider";
import { onValue, ref, set } from "firebase/database";
import styled from "styled-components";
import Posts from '../newsfeed/Posts'
import Post from '../newsfeed/Posts'
import CreatePost from '../post/CreatePost'
import '../newsfeed//Newsfeed.css'
import Topbar from '../common/Topbar'
import RightSideBar from '../common/RightSideBar'
import SidebarMenu from '../common/SidebarMenu'


const FetchCurrentUserPosts = () => {
    const [posts, setPosts] = useState([]);

    const userRef = ref(database, 'posts/')
    const arr = [];
    //ref = ref(database, 'users/')
    onValue(userRef, (snapshot) => {
        
        snapshot.forEach((childSnapshot) => {
            // const childKey = childSnapshot.key; (childSnapshot.val()) 
            console.log("snapshots: ",childSnapshot);
            const user_data = {
                // get the post object
                caption: childSnapshot.val().caption,
                imageUrl: childSnapshot.val().imageUrl,
                postid: childSnapshot.val().postid,
                text: childSnapshot.val().text,
                time: childSnapshot.val().time,
                userId: childSnapshot.val().userId,
                username: childSnapshot.val().username,
            }
            if (user_data.postid == user_data.userId) {
                arr.push(user_data);
            }
        });
        setPosts(arr);
    }

    
    )
    useEffect(() => {
        FetchCurrentUserPosts()
     }, [posts])

    return (
        <div className='app-container'>
            <Topbar className='navbar' />

            <div className='layout'>
                <SidebarMenu />
                <div className='layout__main'>
                    <CreatePost />
                    {posts.map(post => (
                        <Post
                            key={post.id}
                            username={post.username}
                            name={post.name}
                            caption={post.caption}
                            imgUrl={post.imgUrl}
                            time={post.time}
                            postid={post.id}
                        />
                    ))}
                </div>
                <RightSideBar />
            </div>
        </div>
    )

}


export default FetchCurrentUserPosts

const Gallery = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-column-gap: 20px;

  > img {
    width: 100%;
  }
`;